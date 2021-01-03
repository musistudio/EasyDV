<template>
  <div class="toolbar">
    <div class="logo">EasyDV</div>
    <div class="components">
      <el-popover
        placement="bottom"
        width="400"
        trigger="hover">
        <div>
          <div @click="clickHandler">
            <img src="https://sugar.bce.baidu.com/static/sugar/static/img/tool-items/map/map-layer/map-layer_64d11a7.png" alt="">
            <div>多层地图</div>
          </div>
        </div>
        <div class="items" slot="reference">
          <i class="iconfont iconditu"></i>
          <div>地图</div>
        </div>
      </el-popover>
      <div class="items">
        <i class="iconfont icontable"></i>
        <div>表格</div>
      </div>
      <div class="items">
        <i class="iconfont icontubiao"></i>
        <div>图表</div>
      </div>
      <div class="items">
        <i class="iconfont iconzhibiao"></i>
        <div>指标</div>
      </div>
      <div class="items">
        <i class="iconfont iconM_wenzi"></i>
        <div>文字</div>
      </div>

      <div class="items">
        <i class="iconfont iconduomeiti"></i>
        <div>媒体</div>
      </div>
      <div class="items">
        <i class="iconfont iconsucai-outline"></i>
        <div>素材</div>
      </div>
    </div>
    <div class="tools">
      <div class="items">
        <i class="el-icon-full-screen"></i>
        <div>保存并预览</div>
      </div>
      <div class="items">
        <i class="iconfont iconsave"></i>
        <div>保存</div>
      </div>
      <div class="items">
        <i class="el-icon-close"></i>
        <div>退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {
      w: 1000
    };
  },
  methods: {
    clickHandler() {
      this.$emit('add-component', {
        component: "dv-water-level-pond",
        label: "水位图",
        attribute: {
          style: {
            width: "150px",
            height: "200px",
            position: "absolute",
            top: "10px",
            left: "10px",
            deep: {
              width: "100%",
              height: "100%"
            }
          },
          'class': [],
          props: {
            config: {
              data: [66, 45],
              shape: "roundRect"
            }
          }
        },
        children: []
      });
    }
  }
};
</script>

<style scoped lang="less">
.toolbar{
  width: 100%;
  height: 60px;
  background: #3a3f51;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo{
    width: 100px;
    text-align: center;
    font-weight: bolder;
    font-size: 18px;
  }
  .components{
    display: flex;
  }
  .tools{
    display: flex;
  }
  .items{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 6px 6px 8px 6px;
    transform: translateY(4px);
    margin-right: 4px;
    cursor: pointer;
    i{
      font-size: 16px;
      font-weight: bolder;
      margin-bottom: 2px;
    }
    div{
      font-size: 10px;
      font-weight: normal;
    }
    &:hover{
      background: #000;
    }
  }
}
</style>
