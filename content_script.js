fbgif();

function fbgif() {
  var wrappers = document.querySelectorAll(".userContentWrapper");
  for (var i = 0; wrappers[i]; i++) {
    var wrapper = wrappers[i];
    var links = wrapper.querySelectorAll(".userContent a");
    for (var j = 0; links[j]; j++) {
      var link = links[j];
      var src = link.getAttribute('href').match(/.*\.gif/i);
      if (src) {
        var imgs = link.querySelectorAll("img");
        if (imgs[0]) {
          var img = imgs[0]
          img.setAttribute('src', src[0]);
          img.setAttribute('style', 'width:100%;height:100%')
        }
      }
    }
  }
}