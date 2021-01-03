<template>
  <div class="editor-dashboard">
    <toolbar @add-component="addComponent"></toolbar>
    <div class="main">
      <sidebar :layer="components" @select-component="selectComponent"></sidebar>
      <dashboard
        :scale="scale"
        :components="components"
        :current="CURRENT_COMPONENT"
        @set-scale="setScale"
        @select-component="selectComponent"
      ></dashboard>
      <panel :components="components" :current="CURRENT_COMPONENT"></panel>
    </div>
  </div>
</template>

<script>
import dashboard from "./dashboard";
import toolbar from "./toolbar";
import sidebar from "./sidebar";
import panel from "./panel";
export default {
  name: "index",
  components: {
    dashboard,
    toolbar,
    sidebar,
    panel
  },
  data() {
    return {
      CURRENT_ID: 1,
      CURRENT_COMPONENT: {},
      scale: 60,
      components: {
        id: "root",
        component: "div",
        label: "画板",
        attribute: {
          style: {
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "#000"
          }
        },
        children: []
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('keyup', e => {
        const { code } = e;
        if(code === 'Backspace' && this.CURRENT_COMPONENT.id) {
          const index = this.components.children.findIndex(component => component.id === this.CURRENT_COMPONENT.id);
          this.delComponent(index);
        }
      });
    });
  },
  methods: {
    addComponent(component) {
      component.id = `${component.component}_${this.CURRENT_ID++}`;
      this.components.children.push(component);
    },
    delComponent(index) {
      this.components.children.splice(index, 1);
      this.CURRENT_COMPONENT = {};
    },
    setScale(scale) {
      this.scale = scale;
    },
    selectComponent(id) {
      if(!id) {
        delete this.CURRENT_COMPONENT.active;
        this.CURRENT_COMPONENT.attribute && (this.CURRENT_COMPONENT.attribute.class = []);
        this.CURRENT_COMPONENT = {};
        return;
      }
      const index = this.components.children.findIndex(component => component.id === id);
      this.CURRENT_COMPONENT = this.components.children[index];
      this.CURRENT_COMPONENT.active = true;
      this.CURRENT_COMPONENT.attribute.class = [];
    }
  }
};
</script>

<style scoped lang="less">
.editor-dashboard {
  .main {
    width: 100%;
    display: flex;
  }
}
</style>
