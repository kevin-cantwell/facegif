fbgif();

function fbgif() {
  var wrappers = document.querySelectorAll(".userContentWrapper");
  for (var i = 0; wrappers[i]; i++) {
    var wrapper = wrappers[i];
    var links = wrapper.querySelectorAll("a");
    for (var j = 0; links[j]; j++) {
      var link = links[j];

      if( document.createEvent ) {
          var evObj = document.createEvent('MouseEvents');
          evObj.initEvent( 'mouseover', true, false );
          link.dispatchEvent(evObj);
      } else if( document.createEventObject ) {
          link.fireEvent('onmouseover');
      }

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