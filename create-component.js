// We define attributes to be objects and not Elements since those can be
// innerContent for HTML
function isAttribute(obj) {
  if (
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    obj !== null &&
    !(obj instanceof Element)
  )
    return true;
  return false;
}

function assignAttributes(htmlElement, attr) {
  attr.forEach(([key, val]) => {
    if (typeof val === 'boolean') {
      htmlElement[key] = val;
      return;
    }
    if (typeof val === 'string') {
      htmlElement.setAttribute(key, val);
    }
  });
}

function assignEventListeners(htmlElement, events) {
  events.forEach(([key, val]) => {
    htmlElement.addEventListener(key.slice(2), val);
  });
}

export function createElement(type, ...args) {
  const element = document.createElement(type);
  // Check if object, since for now we will be defining attributes as an object containing all attributes
  const attributes = args.find((arg) => isAttribute(arg));
  const innerContent = args.filter((arg) => !isAttribute(arg));

  if (attributes) {
    const attr = Object.entries(attributes).filter(
      ([key]) => !key.startsWith('on')
    );
    const events = Object.entries(attributes).filter(([key]) =>
      key.startsWith('on')
    );

    assignAttributes(element, attr);
    assignEventListeners(element, events);
  }

  if (innerContent) {
    innerContent.forEach((child) => {
      // TODO: Add if statement here to handle case for components
      element.append(child);
    });
  }

  return element;
}
