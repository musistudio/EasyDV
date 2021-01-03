<template>
  <div class="home">
    <ttt></ttt>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

const data = {
  component: "dv-full-screen-container",
  attribute: {
    style: {
      background: '#000',
    }
  },
  children: [
    {
      component: "dv-border-box-11",
      attribute: {
        style: {
          position: 'relative'
        },
        props: {
          title: "可视化大屏"
        },
      },
      children: [
        {
          component: "dv-water-level-pond",
          attribute: {
            style: {
              width: '150px',
              height: '200px',
              position: 'absolute',
              left: '30px',
              top: '50px'
            },
            props: {
              config: {
                data: [66]
              }
            }
          },
          children: []
        }
      ]
    }
  ]
};

function createComponent(h, component) {
  if (typeof component === "string") return component;
  return h(
    component.component,
    component.attribute || {},
    component.children.map(comp => createComponent(h, comp))
  );
}

import Vue from "vue";
import DataV from "@jiaminghi/data-view";
Vue.use(DataV);

Vue.component("ttt", {
  components: {
    HelloWorld
  },
  render(h) {
    return createComponent(h, data);
    // return <dv-loading>Loading...</dv-loading>;
    // return h('div', {
    //   style: {
    //     width: '100%',
    //     height: '5px'
    //   }
    // }, [
    //   h('div', {
    //     style: {
    //       color: 'blue'
    //     }
    //   }, ['111'])
    // ])
  }
});

export default {
  name: "Home",
  components: {}
};
</script>
