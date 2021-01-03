<template>
  <div class="panel">
    <div class="title">控制面板</div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="基础" name="basic" v-if="current.id">
        <div class="panel-item">
          <div class="container">
            <div class="container-item">
              <div class="item-title">宽度</div>
              <el-input-number v-model="width" :min="1" label="描述文字"></el-input-number>
            </div>
            <div class="container-item">
              <div class="item-title">高度</div>
              <el-input-number v-model="height" :min="1" label="描述文字"></el-input-number>
            </div>
          </div>
<!--          <div class="container">-->
<!--            <div>固定比例缩放</div>-->
<!--            <el-switch v-model="value">-->
<!--            </el-switch>-->
<!--          </div>-->
        </div>
        <div class="panel-item">
          <div class="container">
            <div class="container-item">
              <div class="item-title">X坐标</div>
              <el-input-number v-model="left" label="X坐标"></el-input-number>
            </div>
            <div class="container-item">
              <div class="item-title">Y坐标</div>
              <el-input-number v-model="top" label="Y坐标"></el-input-number>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据" name="data" v-if="current.id">
        <div class="panel-item">
          <div class="container">
            <div class="container-item">
              <div class="item-title">数据绑定方式</div>
              <el-select v-model="getDateMethod" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </el-tab-pane>
<!--      <el-tab-pane label="代码" name="code">代码</el-tab-pane>-->
<!--      <el-tab-pane label="交互" name="interact">交互</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "panel",
  props: {
    current: {
      type: Object,
      required: true
    },
    components: {
      type: Object,
      required: true
    }
  },
  computed: {
    width: {
      get() {
        return Number(this.current.attribute.style.width.replace('px', ''));
      },
      set(value) {
        this.current.attribute.style.width = value + 'px';
      }
    },
    height: {
      get() {
        return Number(this.current.attribute.style.height.replace('px', ''));
      },
      set(value) {
        this.current.attribute.style.height = value + 'px';
      }
    },
    top: {
      get() {
        return Number(this.current.attribute.style.top.replace('px', ''));
      },
      set(value) {
        this.current.attribute.style.top = value + 'px';
      }
    },
    left: {
      get() {
        return Number(this.current.attribute.style.left.replace('px', ''));
      },
      set(value) {
        this.current.attribute.style.left = value + 'px';
      }
    },
  },
  data() {
    return {
      activeName: "basic",
      num: 100,
      value: false,
      options: [
        {
          value: "api",
          label: "API拉取"
        },
        {
          value: "json",
          label: "静态json"
        }
      ],
      getDateMethod: ""
    };
  },
  methods: {
    handleClick() {}
  }
};
</script>

<style scoped lang="less">
.panel{
  width: 380px;
  height: calc(100vh - 60px);
  border-left: 2px solid #c5c5c5;
  .title{
    background: #f0f3f4;
    color: #58666e;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #c5c5c5;
  }
  .panel-item{
    padding-bottom: 5px;
    border-bottom: 1px dashed #eee;
    .container{
      display: flex;
      padding: 10px;
      justify-content: space-between;
      .container-item{
        .item-title{
          margin-bottom: 4px;
        }
      }
    }
    .el-input-number{
      width: 160px !important;
    }
  }
}
</style>
