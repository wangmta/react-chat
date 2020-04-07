export default function debounce(func, delay = 500, immediate = false) {
  if (typeof func !== 'function') {
    throw new Error('Argument must be a function');
  }
  let timer = null;
  return function debounced(...args) {
    const self = this;
    const callNow = immediate && !timer;
    const callLater = () => {
      timer = null;
      if (!immediate) func.apply(self, args);
    };
    clearTimeout(timer);
    timer = setTimeout(callLater, delay);
    if (callNow) func.apply(self, args);
  };
}
