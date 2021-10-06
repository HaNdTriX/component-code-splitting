const components = document.querySelectorAll("[data-component]");

for (const component of components) {
  const componentName = component.dataset.component;
  const initComponent = (module) => module.default(component);
  import(
    /* webpackChunkName: "component-[request]" */ `./components/${componentName}.js`
  ).then(initComponent);
}
