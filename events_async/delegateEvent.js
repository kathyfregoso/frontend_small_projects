function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    return !parentElement.addEventListener(eventType, (event) => {
      let matches = parentElement.querySelectorAll(selector);
      if (matches.includes(event.target)) {
        callback(event);
      }
    });
  }
}
