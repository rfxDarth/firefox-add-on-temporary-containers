document.body.addEventListener('mouseup', async (event) => {
  // event valid?
  if (typeof event !== 'object' || typeof event.target !== 'object') {
    return;
  }

  // don't handle right mouse button
  if (event.button === 2) {
    return;
  }

  // only handle left mouse click if ctrl or meta was clicked
  if (event.button === 0 && !event.ctrlKey && !event.metaKey) {
    return;
  }


  // check for a element with href
  const aElement = event.target.closest('a');
  if (aElement === null || typeof aElement !== 'object' || !aElement.href) {
    return;
  }

  // tell background process to handle the clicked url
  await browser.runtime.sendMessage({
    linkClicked: {
      href: aElement.href,
      event: {
        button: event.button,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey
      }
    }
  });
}, false);
