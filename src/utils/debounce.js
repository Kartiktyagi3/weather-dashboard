function debounce(func, delay = 166, immediate = false) {
  let timeout;

  function debounce(...args) {
    const later = () => {
      func.apply(this, args);
    };

    clearTimeout(timeout);

    const shouldCallImmidiately = timeout == null && immediate;

    if (shouldCallImmidiately) later();

    timeout = setTimeout(() => {
      if (!immediate) later();
      timeout = null;
    }, delay);
  }

  debounce.clear = () => {
    clearTimeout(timeout);
  };

  return debounce;
}

export { debounce };
