export function _el (tag, attributes) {
  const el = document.createElement(tag);

  for (const entry of Object.entries(attributes)) {
      const [key, value] = entry;
      el[key] = value;
  }
  return el;
}