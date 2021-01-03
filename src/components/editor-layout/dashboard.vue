<template>
  <div class="dashboard">
    <!-- 显示主体 -->
    <div class="main">
      <div class="dashboard-main" :style="{width: scale + 'vw', height: scale + 'vh'}">
        <div class="container" @click="clickHandler" @mouseleave="mouseLeaveHandler" @mousedown="mouseDownHandler" @mouseup="mouseLeaveHandler" @mousemove="mouseMoveHandler" :style="{transform: 'scale(' + scale / 100 + ',' + scale / 100 + ')'}">
          <div id="dashboard-app">
            <data-visual></data-visual>
          </div>
        </div>
      </div>
    </div>
    <!-- 缩放工具栏 -->
    <div class="tools">
      面板缩放百分比
      <el-slider
        v-model="calcScale"
        :min="10"
        show-input>
      </el-slider>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import DataV from "@jiaminghi/data-view";
import { createComponent } from "@/utils/core";
import CompContainer from './component-container';
Vue.use(DataV);

export default {
  name: "dashboard",
  props: {
    components: {
      type: Object,
      required: true
    },
    current: {
      type: Object,
      required: true
    },
    scale: {
      type: Number,
      default: 60
    }
  },
  computed: {
    calcScale: {
      get () {
        return this.scale;
      },
      set (value) {
        this.$emit('set-scale', value)
      }
    }
  },
  data() {
    return {
      scale_status: false, // 缩放的状态机
      move_status: false,
      init_state: null
    };
  },
  created() {
    this.renderPage();
  },
  watch: {
    components: {
      handler() {
        this.renderPage();
      },
      deep: true
    }
  },
  methods: {
    openScale(e) {
      const { x, y, target, direction } = e;
      if (!direction) return;
      const {width, height} = target.parentNode.getBoundingClientRect();
      const top = Number(target.parentNode.style.top.replace('px', ''));
      const left = Number(target.parentNode.style.left.replace('px', ''));
      this.scale_status = direction;
      this.init_state = {x, y, width, height, top, left};
    },
    openMove(e) {
      this.move_status = true;
      const { x, y, target } = e;
      const {width, height} = target.parentNode.parentNode.getBoundingClientRect();
      const top = Number(target.parentNode.parentNode.style.top.replace('px', ''));
      const left = Number(target.parentNode.parentNode.style.left.replace('px', ''));
      this.init_state = {x, y, width, height, top, left};
    },
    mouseDownHandler(e) {
      if(!Object.keys(this.current).length) return;
      const { x, y, target } = e;
      const direction = Array.from(target.classList).find(
        name => ["tr", "br", "mr"].indexOf(name) !== -1
      );
      if (direction) {
        return this.openScale({ x, y, target, direction });
      }
      if (Array.from(target.parentNode.classList).find(name => name.split('-')[0] === 'dv')) {
        return this.openMove({ x, y, target });
      }
    },
    clickHandler(e) {
      if(Array.from(e.target.parentNode.parentNode.classList).includes('dv-component')) {
        this.$emit('select-component', e.target.parentNode.parentNode.id);
      }else {
        this.$emit('select-component', null);
      }
    },
    mouseLeaveHandler() {
      this.init_state = {};
      this.scale_status = false;
      this.move_status = false;
    },
    mouseMoveHandler(e) {
      if(this.scale_status) {
        this.scaleHandler(e);
      }else if(this.move_status) {
        this.moveHandler(e);
      }
    },
    scaleHandler(e) {
      const { x, y } = e;
      const w = x - this.init_state.x + this.init_state.width;
      const scale = this.scale / 100;
      this.current.attribute.style.width = `${w / scale}px`;
      if(this.scale_status === 'tr') {
        const offset = y - this.init_state.y;
        const h = (this.init_state.height - offset) / scale;
        this.current.attribute.style.top = `${Number(this.current.attribute.style.top.replace('px', '')) - (h - this.current.attribute.style.height.replace('px', ''))}px`;
        this.current.attribute.style.height = `${h}px`;
      }else if(this.scale_status === 'br') {
        const h = y - this.init_state.y + this.init_state.height;
        this.current.attribute.style.height = `${h / (this.scale / 100)}px`;
      }
    },
    moveHandler(e) {
      const { x, y } = e;
      const scale = this.scale / 100;
      const moved_x = (x - this.init_state.x) / scale + this.init_state.left;
      const moved_y = (y - this.init_state.y) / scale + this.init_state.top;
      this.init_state.left = moved_x;
      this.init_state.top = moved_y;
      this.init_state.x = x;
      this.init_state.y = y;
      this.current.attribute.style.top = `${moved_y}px`;
      this.current.attribute.style.left = `${moved_x}px`;
    },
    renderPage() {
      const components = JSON.parse(JSON.stringify(this.components));
      const container = this.$children[0] && this.$children.find(vm => !vm.$el.classList.contains('el-slider'));
      Vue.component("data-visual", {
        components: {
          CompContainer
        },
        render(h) {
          return createComponent(h, components);
        }
      });
      if (container) {
        container.$children[0] = new Vue({
          el: '.dashboard-main > .container > #dashboard-app',
          render() {
            return (
              <div id="dashboard-app">
                <data-visual></data-visual>
              </div>
            );
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.dashboard{
  position: relative;
  width: calc(100% - 550px);
  height: calc(100vh - 80px);
  margin: 20px 10px 0 10px;
  overflow: hidden;
  .main{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    .dashboard-main{
      position: absolute;
      width: 100vw;
      height: 100vh;
      top: 0;
      left: 0;
      overflow: hidden;
      transition: all 0.5s;
      border: 1px solid #e3e3e3;
      .container{
        width: 100vw;
        height: 100vh;
        transform-origin: 0 0;
        transition: all 0.5s;
      }
    }
  }
  .tools{
    font-size: 16px;
    width: 500px;
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    align-items: center;
    .el-slider{
      flex-grow: 1;
      margin-left: 20px;
    }
  }
}
</style>
