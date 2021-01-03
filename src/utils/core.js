export function createComponent(h, component) {
  if (typeof component === "string") return component;
  if (component.id === "root") {
    return h(
      component.component,
      component.attribute || {},
      component.children.map(comp => createComponent(h, comp))
    );
  }
  const wrap_style = component.attribute.style || {};
  const component_style = wrap_style.deep || {};
  delete wrap_style.deep;
  component.attribute.style = component_style;
  delete wrap_style.style;
  return h(
    'CompContainer',
    {
      style: wrap_style,
      attrs: {
        id: component.id
      },
      'class': {
        'active-component': component.active
      }
    },
    [
      h(
        component.component,
        component.attribute || {},
        component.children.map(comp => createComponent(h, comp))
      )
    ]
  );
}
