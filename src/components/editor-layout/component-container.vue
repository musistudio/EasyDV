<template>
  <div class="dv-component">
    <slot></slot>
    <div class="p-btn tr"></div>
    <div class="p-btn mr"></div>
    <div class="p-btn br"></div>
  </div>
</template>

<script>
export default {
  name: "component-container",
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
.dv-component{
  position: relative;
  width: 100%;
  height: 100%;
  &.active-component{
    cursor: move;
    &::before{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      outline: 1px dashed #d6d6d6;
    }
    .p-btn{
      position: absolute;
      width: 10px;
      height: 10px;
      background: #fff;
      transform: translate(50%, -50%);
    }
    .mr{
      top: 50%;
      right: 0;
      cursor: ew-resize;
    }
    .br{
      bottom: 0;
      right: 0;
      cursor: nwse-resize;
      transform: translate(50%, 50%);
    }
    .tr{
      top: 0;
      right: 0;
      cursor: nesw-resize;
    }
  }
}
</style>
