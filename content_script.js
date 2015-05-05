(function() {
  // Facebook uses a proxy endpoint at /safe_image.php to render all gifs
  // as a single frame. This function finds all descendent safe images
  // that reference a gif and replace their src attribute with the target gif.
  // It also forces ssl to maintain Facebook's page security so it's possible, 
  // although rare, that some images will not load.
  var animateDescendentGifs = function(node) {
    if (node.nodeType !== 1 && node.nodeType !== 9) { // Is not an element or document node
      return;
    }

    var images = node.getElementsByTagName('img');
    for (k = 0; k < images.length; k++) { 
      var image = images[k];
      var src = image.src;
      var parser = document.createElement('a');
      parser.href = src;

      if (parser.pathname !== "/safe_image.php") {  
        continue;
      }
      
      // Validate that the safe image is protecting a gif
      var matches = /url=(.+)\.gif/.exec(parser.search);
      if (matches === null) {
        continue;
      }

      actualSRC = decodeURIComponent(matches[1]) + ".gif";
      parser.href = actualSRC;
      parser.protocol = "https:" // This might break some gifs, but it keeps the page secure
      image.src = parser.href;
    }
  }

  // Start a dom mutation observer that will actively animate any gifs added after page load
  var observer = new MutationObserver(function(mutations, observer) {
    for (i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      var nodeList = mutation.addedNodes;
      for (j = 0; j < nodeList.length; j++) { 
        animateDescendentGifs(nodeList.item(j))
      }
    }
  });

  observer.observe(document, {
      subtree: true,
      childList: true
  });

  // Make sure to animage any existing gifs right after dom load.
  animateDescendentGifs(document);
})();