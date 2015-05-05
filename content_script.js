(function() {
  var images = document.getElementsByTagName('img');
  for (i = 0; i < images.length; i++) { 
    var src = images[i].src
    if (src.indexOf("safe_image.php") > -1) {  
      var parser = document.createElement('a');
      parser.href = src
      matches = /url=(.+)\.gif/.exec(parser.search)
      if (matches !== null) {
        actualSRC = decodeURIComponent(matches[1]) + ".gif"
        parser.href = actualSRC
        // Uncomment the below to force all images to load using ssl
        // parser.protocol = "https:" // Keep references secure
        images[i].src = parser.href
      }
    }
  }
})();