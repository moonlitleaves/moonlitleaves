//<script>
/*
 * browserspecific.js
 * Andreas Ipp, June 2002
 * andreas.ipp@gmx.at
 * http://strange.itp.tuwien.ac.at/~ipp/
 *
 * Make browser-dependent code transparant
 */

// Global variables

var mousex = 0; // current position of mouse
var mousey = 0;

var Winx = 0; // current Window size
var Winy = 0;

var ScrollLeft; // current scroll positions
var ScrollTop;

function start() {
  if (ns4) doc.captureEvents(Event.MOUSEMOVE);
  //if (ns4) doc.captureEvents(Event.MOUSEDOWN);

  document.addEventListener('mousemove', posquick);
  //doc.onmousedown=mdown
}

//--------------------------------------------
// Select the right mouse trapping function
function posquick(e) {
  var isOpera = navigator.userAgent.indexOf('Opera') != -1;
  var isIE = !isOpera && navigator.userAgent.indexOf('MSIE') != -1;
  var posx = 0;
  var posy = 0;
  if (!e) var e = window.event;
  if (e.pageX || e.pageY) {
    document.addEventListener('mousemove', pq1);
  } else if (e.clientX || e.clientY) {
    document.addEventListener('mousemove', pq2);

    if (isIE) {
      document.addEventListener('mousemove', pq3);
    }
  }
  // alert(""+doc.onmousemove);
}

// epage for Netscape
function pq1(e) {
  mousex = e.pageX;
  mousey = e.pageY;
}

// eclient for Opera
function pq2(e) {
  var e = window.event;
  mousex = e.clientX;
  mousey = e.clientY;
}

// eclient for IE
function pq3(e) {
  var e = window.event;
  mousex = e.clientX + document.body.scrollLeft;
  mousey = e.clientY + document.body.scrollTop;
}

//--------------------------------------------
//Show object
function show(obj) {
  // general function
  if (ie) {
    // Internet explorer ONLY understands "visible"
    // IE will halt on anything else...
    show = showq1;
  } else {
    // Netscape understands "show"
    // Mozilla 0.9.9 wants "visible";
    // both browsers don't care about each other's setting
    show = showq2;
  }
  show(obj);
}

function showq1(obj) {
  obj.style.visibility = 'visible';
}

function showq2(obj) {
  obj.style.visibility = 'show';
  obj.style.visibility = 'visible';
}

//--------------------------------------------
function hide(obj) {
  // general function
  if (ie) {
    // Internet explorer ONLY understands "hidden"
    // IE will halt on anything else...
    hide = hideq1;
  } else {
    // Netscape understands "hide"
    // Mozilla 0.9.9 wants "hidden";
    //both browsers don't care about each other's setting
    hide = hideq2;
  }
  hide(obj);
}

function hideq1(obj) {
  obj.style.visibility = 'hidden';
}

function hideq2(obj) {
  obj.style.visibility = 'hide';
  obj.style.visibility = 'hidden';
}

//--------------------------------------------
// does nothing
// but Opera will give an "Internal communication error" upon calling void()
function myvoid() {}

//--------------------------------------------
function WinSizeNotSupported() {
  alert(
    'This script does not support your browser. Please contact andreas.ipp@gmx.at'
  );
}

//--------------------------------------------
//gets size of available document or Windowsize,
//whichever is bigger.
function getWinSize() {
  getWinSize = WinSizeNotSupported;

  if (document.all) {
    // Internet Explorer
    getWinSize = wsq1;

    if (!document.body.scrollWidth) {
      //Operaspecific: Opera in the Internet mode
      // doesn't understand scrollWidth/scrollHeight,
      // but clientWidth gives the scrollWidth...
      getWinSize = wsq2;
    }
  } else if (document.layers) {
    // Netscape??
    getWinSize = wsq3;
  } else if (document.getElementById) {
    if (document.height) {
      // Netscape 6 & Mozilla 1
      getWinSize = wsq3;
    }

    // For Opera & Opera in Mozilla mode:
    else if (document.body.offsetWidth) {
      getWinSize = wsq5;
    }
  }
  //alert(getWinSize);
  getWinSize();
}

// For IE 6:
function wsq1() {
  with (document.body) {
    Winx = scrollWidth;
    Winy = scrollHeight;
    if (clientWidth > Winx) Winx = clientWidth;
    if (clientHeight > Winy) Winy = clientHeight;
    ScrollLeft = scrollLeft;
    ScrollTop = scrollTop;
  }
}

// For Opera in the IE mode
function wsq2() {
  Winx = document.body.clientWidth;
  Winy = document.body.clientHeight;
  ScrollLeft = document.body.scrollLeft;
  ScrollTop = document.body.scrollTop;
}

// For Netscape 6 & Mozilla 1
// Netscape 4.08 (Win)
function wsq3() {
  Winx = document.width;
  Winy = document.height;
  if (window.innerWidth > Winx) Winx = window.innerWidth;
  if (window.innerHeight > Winy) Winy = window.innerHeight;
  ScrollLeft = window.pageXOffset;
  ScrollTop = window.pageYOffset;
}

// Opera as Opera & Opera 6 in Mozilla mode
function wsq5() {
  Winx = document.body.offsetWidth;
  Winy = document.body.offsetHeight;
  if (window.innerWidth > Winx) Winx = window.innerWidth;
  if (window.innerHeight > Winy) Winy = window.innerHeight;
  ScrollLeft = document.body.scrollLeft;
  ScrollTop = document.body.scrollTop;
}

//--------------------------------------------
// returns size of "div" element in divsize.
// divsize must be "= new Object();"
function getObjSize(obj, divsize) {
  if (document.getElementById || document.all) {
    // IE
    // Opera as Opera, IE, Mozilla
    // Netscape 6, Mozilla
    getObjSize = gosq1;
  } else {
    if (document.layers) {
      // Netscape 4.08
      getObjSize = gosq2;
    } else {
      alert('getObjSize not defined.');
    }
  }
  //alert(getObjSize);
  getObjSize(obj, divsize);
}

function gosq1(obj, ds) {
  ds.top = parseInt(obj.style.top);
  ds.left = parseInt(obj.style.left);
  ds.right = ds.left + parseInt(obj.offsetWidth);
  ds.bottom = ds.top + parseInt(obj.offsetHeight);
}

function gosq2(obj, ds) {
  ds.top = parseInt(obj.style.top);
  ds.left = parseInt(obj.style.left);
  ds.right = ds.left + parseInt(obj.clip.width);
  ds.bottom = ds.top + parseInt(obj.clip.height);
}

//--------------------------------------------
//</script>
