<template>
  <div class="sidebar">
    <div class="title">图层管理</div>
    <div class="sidebar-main">
      <el-tree :data="[layer]" :props="defaultProps" @node-click="handleNodeClick" node-key="id" :default-expanded-keys="['root']"></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  props: {
    layer: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(obj) {
      this.$emit('select-component', obj.id === 'root' ? '' : obj.id);
    }
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 150px;
  height: calc(100vh - 60px);
  border-right: 2px solid #c5c5c5;

  .title {
    background: #f0f3f4;
    color: #58666e;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #c5c5c5;
  }
}
</style>
