// Prototype button component
import { createElement } from './create-component.js';

let componentCount = 0;

export function buttonComponent(props) {
  const componentId = (componentCount++).toString();

  const _this = () => {
    return document.querySelector(`[data-btn-component-id="${componentId}"]`);
  };

  const onclick = () => {
    if (typeof props.onclick === 'function') props.onclick.bind(_this())();
  };

  return createElement(
    'button',
    { 'data-btn-component-id': componentId, onclick: onclick },
    props.text || 'Button'
  );
}
