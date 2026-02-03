//<script>
/* ballnavigation01.js
 * June 2002
 * Andreas Ipp
 * andreas.ipp@gmx.at
 * http://strange.itp.tuwien.ac.at/~ipp/
 *
 * physical balls navigation framework
 */

/* Tested under:
 *  Windows XP:
 *    - Microsoft Internet Explorer 6.0.26
 *    - Netscape Navigator 6.2.3
 *    - Netscape Navigator 4.08
 *    - Opera 6.03
 *    - Mozilla 1.0
 *
 *  Windows 2000:
 *    - Microsoft Internet Explorer
 *
 *  Linux:
 *    - Netscape Communicator 4.77
 *    - Mozilla 0.9.9 (very slow with vopacity != 100)
 *    - Opera 6.0 Technology Preview 3
 *    - Lynx v2.8.4
 *
 */

// Global variables:
var OldWinx = 0; // Old Window size
var OldWiny = 0;

// Globale Variablen / Global variables
var BallMax = 0; // Maximum number of balls
var BallNumber = 0; // Currently visible number of balls
var TestBounce = 1; // Test bouncing
var TestMouse = 1; // Test mouse interaction
var Damping = 0.999; // General Damping
var GravityConst = 1; // Constant Gravity on
var Gravityx = 0;
var Gravityy = 0.04;
var GravityCentral = 0; // Central Gravity on
var GravityG = 0;

var MenuForce = 0; // Force to simulate Menu
var MenuTime = 0; // Timing for Menu
var CollapseMenu = 0; // Collapsed menu?
var MenuX = 3; // Menu Position identifiers
var MenuY = 30;
var MenuDX = 0;
var MenuDY = 150;
var MenuStallX = 60;
var MenuStallY = 30;
var MenuBoundBottom = 1000;

var TraceMax = 15; // Number of Trace Points
var TraceOn = 0; // Trace On
var TraceBall = 0; // Trace which ball
var TraceLoopMax = BallMax + 2; // Duration of 1 Loop

var Balls = new Array();

var ClipLeft = 0; // Range of movement
var ClipTop = 0;
var ClipRight = 10;
var ClipBottom = 10;

var SettingMenuState = -1; //-1 not initialized, 0 closed, 1 open

var Running = 1;

var ResizeAgain = 0;

var startsetting = settingrandom;

// Small Trace Point
function TracePoint(vlaytr) {
  this.vlaytr = vlaytr;
  this.x = 0;
  this.y = 0;
  this.visible = 0;
}

// Neue Klasse Ball / new class ball
function ball(
  vlayobj,
  vlayobjtext,
  // vMenuType,
  vlayobjmenu,
  tracekind,
  vlayobjstop
) {
  this.vlayobj = vlayobj; // pointer to vlay.objectid
  this.vlayobjtext = vlayobjtext; // text description
  // this.vMenuType = vMenuType; // is this a menu type or just anchor on itself
  this.vlayobjmenu = vlayobjmenu; // menu
  this.vlayobjstop = vlayobjstop; // stop for inactive
  this.x = 0; //position
  this.y = 0;
  this.vx = 0; //velocity
  this.vy = 0;
  this.ax = 0; //acceleration
  this.ay = 0;

  this.hintstate = 1; // hintstate: 0 off, 1 on
  this.menustate = -1; // menustate: 0 off, 1 on, -1 initialize
  this.stopstate = 0; // no stopping

  this.hasgravityconst = 1; // exclude some particles from forces
  this.hasgravitycentral = 1;

  this.Trace = new Array(); // Array of Tracepoints
  this.TraceNow = 0; // current active Tracepoint

  for (var i = 0; i < TraceMax; i++) {
    this.Trace[i] = new TracePoint(vlay[tracekind + i]);
    // this.Trace[i].vlaytr.vpos(10 * i, 10 * i);
  }
}

function animationinit() {
  // initialize balls
  BallMax = BallInitMax;
  for (var i = 0; i < BallMax; i++) {
    with (BallInit[i]) {
      Balls[i] = new ball(
        vlay[ballid],
        vlay[balltextid],
        vlay[ballmenuid],
        balltraceid,
        vlay[ballstopid]
      );
    }
  }

  BallNumber = BallMax;
  TraceLoopMax = BallMax + 2;

  startsetting();

  vlay.settingmenu.vopacity(100);
  hide(vlay.settingmenu);
  SettingMenuState = 0;
  closeAllMenus();
  clearalltraces();
}

function stopallballs() {
  for (i = 0; i < BallMax; i++) {
    with (Balls[i]) {
      //	x = 200 + 130*i;
      //	y = 200;
      vx = 0;
      vy = 0;
      ax = 0;
      ay = 0;
    }
  }
}

function settingreset() {
  for (i = 0; i < BallMax; i++) {
    with (Balls[i]) {
      //	x = 200 + 130*i;
      //	y = 200;
      //	vx = 0;
      //	vy = 0;
      //	ax = 0;
      //	ay = 0;
      //	vlayobj.vpos(x,y);
      hintstate = 1;
      menustate = -1;
      hasgravityconst = 1;
      hasgravitycentral = 1;
      show(vlayobj);
    }
  }
  BallNumber = BallMax;

  // BallNumber = 3; // Currently visible number of balls
  TestBounce = 1;
  TestMouse = 1;
  Damping = 0.999; // General Damping
  GravityConst = 0; // Constant Gravity off
  Gravityx = 0;
  Gravityy = 0;
  GravityCentral = 0; // Central Gravity on
  GravityG = 0;

  MenuForce = 0;
  MenuTime = 0;
  CollapseMenu = 0;
  MenuX = 3; // Menu Position identifiers
  MenuY = 30;
  MenuDX = 0;
  MenuDY = 150;
  MenuStallX = 60;
  MenuStallY = 30;

  //	TraceOn = 0; // Trace On
  TraceBall = 0; // Trace which ball
  TraceLoopMax = BallMax + 2; // Duration of 1 Loop

  vlay.settingmenu.vopacity(100);
  hide(vlay.settingmenu);
  SettingMenuState = 0;

  clearalltraces();
  activateAllBalls();
}

function startanimation() {
  Running = 1;
}

function stopanimation() {
  Running = 0;
}

function toggleanimation() {
  if (Running != 0) {
    Running = 0;
  } else {
    Running = 1;
    //animation();
  }
}

function starttrace() {
  TraceOn = 1;
  showalltraces();
}

function stoptrace() {
  TraceOn = 0;
  clearalltraces();
}

function toggletrace() {
  if (TraceOn != 0) {
    TraceOn = 0;
    clearalltraces();
  } else {
    TraceOn = 1;
    showalltraces();
  }
}

function animation() {
  getWinSize();
  if (Winx != OldWinx || Winy != OldWiny || ResizeAgain > 0) windowresized();
  ClipLeft = 0;
  ClipTop = 0;
  ClipRight = Winx - 102;
  ClipBottom = Winy - 102;

  if (Running == 1) {
    if (TestMouse == 1) mouseinteraction();
    if (TestBounce == 1) ballbounce();
    forces();
    if (MenuForce == 1) menuforces();
    moveobjects();

    if (TraceOn == 1) showtraces();
    setTimeout('animation()', 20);
  } else {
    // Reduced functionality
    if (TestMouse == 1) mouseinteraction();
    setTimeout('animation()', 100);
  }
}

function windowresized() {
  //alert("res");
  // Things we have to do after resizing window
  // Extra for Opera 6.0 Technology Preview 3
  // After change of Window Size or Zoom makes invisible objects visible

  // After Resize finished, we refresh 5 times.
  if (Winx != OldWinx || Winy != OldWiny) ResizeAgain = 5;
  if (ResizeAgain > 0) ResizeAgain--;

  if (SettingMenuState == 0) {
    hide(vlay.settingmenu);
    vlay.settingmenu.vpos(0, 0);
  }

  for (i = 0; i < BallMax; i++) {
    with (Balls[i]) {
      if (hintstate == 0) {
        hide(vlayobjtext);
        vlayobjtext.vpos(0, 0);
      }
      if (menustate == 0) {
        hide(vlayobjmenu);
        vlayobjmenu.vpos(0, 0);
      }
      show(vlayobj);
      if (stopstate == 0) {
        hide(vlayobjstop);
        vlayobjstop.vpos(0, 0);
      } else {
        show(vlayobjstop);
      }

      // Check if balls are now outside
      if (x + 102 > Winx) x = Winx - 102;
      if (y + 102 > Winy) y = Winy - 102;
      if (x < 0) x = 0;
      if (y < 0) y = 0;
    }
  }
  BallNumber = BallMax;
  closeAllMenus();

  MenuBoundBottom = Winy; //ideally should be Window-Size...
  setmenulayout();

  OldWinx = Winx;
  OldWiny = Winy;
}

function mouseinteraction() {
  // Test for interaction with mouse
  if (SettingMenuState == 1) {
    // Menu open
    // Check if we stay within new menu
    var divsize = new Object();
    getObjSize(vlay.settingmenu, divsize);

    if (
      mousex < divsize.left - 15 ||
      mousex > divsize.right + 15 ||
      mousey < divsize.top - 15 ||
      mousey > divsize.bottom + 15
    ) {
      vlay.settingmenu.vopacity(100);
      hide(vlay.settingmenu);
      SettingMenuState = 0;
    }
    return;
  }
  for (i = 0; i < BallNumber; i++) {
    with (Balls[i]) {
      dx = mousex - x - 50;
      dy = mousey - y - 50;
      distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 50 || menustate == 1) {
        if (Running == 1) {
          //damping:
          vx *= 0.9;
          vy *= 0.9;

          //Sog zur Mitte / drag to center:
          // constant + spring
          var pot = 1 / distance + 0.02;
          ax += dx * pot;
          ay += dy * pot;
        }

        // Expand Menu if collapsed
        MenuTime = 0;

        // Change position of hint:
        if (x < 100) {
          // Position right
          vlayobjtext.vpos(x + 110, y + 20);
        } else if (y < Winy / 2) {
          // Position below
          vlayobjtext.vpos(x, y + 110);
        } else {
          // Position above
          vlayobjtext.vpos(x, y - 50);
        }

        //display text
        if (hintstate == 0) {
          show(vlayobjtext);
          hintstate = 1;
          if (SettingMenuState != 0) {
            vlay.settingmenu.vopacity(100);
            hide(vlay.settingmenu);
            SettingMenuState = 0;
          }

          // also, as soon as we touch it, we activate behaviour:
          hasgravityconst = 1;
          hasgravitycentral = 1;
          if (stopstate != 0) {
            stopstate = 0;
            hide(vlayobjstop);
          }
        }

        if (menustate != 0) {
          // Check if we stay within new menu
          var divsize = new Object();
          getObjSize(vlayobjmenu, divsize);

          if (
            mousex < divsize.left - 15 ||
            mousex > divsize.right + 15 ||
            mousey < divsize.top - 15 ||
            mousey > divsize.bottom + 15
          ) {
            vlayobjmenu.vopacity(100);
            hide(vlayobjmenu);
            menustate = 0;
          }
        }
      } else {
        if (hintstate != 0) {
          hide(vlayobjtext);
          hintstate = 0;
        }
        if (menustate != 0) {
          vlayobjmenu.vopacity(100);
          hide(vlayobjmenu);
          menustate = 0;
        }
      }
    }
  }
}

function ballbounce() {
  // 2 balls bounce off each other

  for (i = 0; i < BallNumber; i++) {
    var b1 = Balls[i];
    for (j = i + 1; j < BallNumber; j++) {
      var b2 = Balls[j];
      dx = b2.x - b1.x;
      dy = b2.y - b1.y;
      distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        if (distance > 0) {
          dxu = dx / distance; // unit vectors
          dyu = dy / distance;

          //bounce velocities
          pn1 = b1.vx * dxu + b1.vy * dyu; //scalar product
          pn2 = b2.vx * dxu + b2.vy * dyu;
          pnd = pn2 - pn1;

          //tangential components stay the same, but normal components are exchanged
          b1.vx += +pnd * dxu;
          b1.vy += +pnd * dyu;

          b2.vx += -pnd * dxu;
          b2.vy += -pnd * dyu;

          // displace the balls
          df = (distance - 100) / 2;
          b1.x += df * dxu;
          b1.y += df * dyu;
          b2.x += -df * dxu;
          b2.y += -df * dyu;

          if (GravityCentral && b1.hasgravitycentral && b2.hasgravitycentral) {
            // displacement breaks conservation of energy..
            // balls get faster and faster.
            // so here we subtract Energy-gain from displacement
            var pncm = (pn1 + pn2) / 2; // include m1, m2; center of mass velocity of normal vectors
            var pn1cm = pn1 - pncm; // velocity tangential component in center of mass
            var pn2cm = pn2 - pncm;

            var E1old = pn1cm * pn1cm; // * m1  // kinetic Energy
            var E2old = pn2cm * pn2cm; // * m2

            //var cmvx = (b1.vx + b2.vx)/2; // include m1, m2 for center of mass velocity
            //var cmvy = (b1.vy + b2.vy)/2;
            //var b1cmvx = b1.vx-cmvx; // velocity in center of mass
            //var b1cmvy = b1.vy-cmvy;
            //var b2cmvx = b2.vx-cmvx;
            //var b2cmvy = b2.vy-cmvy;

            //var E1old = b1cmvx * b1cmvx + b1cmvy * b1cmvy; // * m1  //kinetic Energy before displacement
            //var E2old = b2cmvx * b2cmvx + b2cmvy * b2cmvy; // * m2

            var EnergyGain =
              -GravityG * (1 / distance - 1 / (distance + 2 * df)); // * m1 * m2

            var E1new = E1old - EnergyGain;
            var E2new = E2old - EnergyGain;
            if (E1new < 0) E1new = 0; // oh, we could have never come here.. mei shir =)
            if (E2new < 0) E2new = 0;

            //E1new = 0; E2new = 0;
            if (E1old < 0.00001) E1old = 1; // to avoid division by zero below
            if (E2old < 0.00001) E2old = 1;

            var fact1 = Math.sqrt(E1new / E1old); // / m1
            var fact2 = Math.sqrt(E2new / E2old); // / m2

            //b1.vx = b1cmvx * fact1 + cmvx;
            //b1.vy = b1cmvy * fact1 + cmvy;
            //b2.vx = b2cmvx * fact2 + cmvx;
            //b2.vy = b2cmvy * fact2 + cmvy;

            //alert(b1.vx+","+b1.vy+","+b2.vx+","+b2.vy);
            b1.vx += -(1 - fact1) * pn2cm * dxu; // remember that pn2(cm) and pn1(cm) are already swapped
            b1.vy += -(1 - fact1) * pn2cm * dyu;
            b2.vx += -(1 - fact2) * pn1cm * dxu;
            b2.vy += -(1 - fact2) * pn1cm * dyu;
            //alert(b1.vx+","+b1.vy+","+b2.vx+","+b2.vy);
          }

          // also, as soon as the balls interact, we activate behaviour:
          b1.hasgravityconst = 1;
          b1.hasgravitycentral = 1;
          if (b1.stopstate != 0) {
            b1.stopstate = 0;
            hide(b1.vlayobjstop);
          }

          b2.hasgravityconst = 1;
          b2.hasgravitycentral = 1;
          if (b2.stopstate != 0) {
            b2.stopstate = 0;
            hide(b2.vlayobjstop);
          }
        }
      } //distance > 100
      else {
        // Let's check other forces:

        // Central Gravity like between planets
        if (GravityCentral) {
          if (b1.hasgravitycentral && b2.hasgravitycentral) {
            dxu = dx / distance; // unit vectors
            dyu = dy / distance;

            grav = GravityG / (distance * distance);
            b1.ax += grav * dxu;
            b1.ay += grav * dyu;

            b2.ax += -grav * dxu;
            b2.ay += -grav * dyu;
          }
        }
      }
    }
  }
}

function forces() {
  // Constant Gravity like on Earth
  if (GravityConst) {
    for (i = 0; i < BallNumber; i++) {
      with (Balls[i]) {
        ax += Gravityx;
        ay += Gravityy;
      }
    }
  } // if GravityConst

  // PairwiseForces are in ballbounce()
}

// Simulate forces for menu:
function menuforces() {
  var i;
  MenuTime++;
  if (MenuTime > 500) {
    // Hide other balls to save resources
    // and set initial velocities
    if (BallNumber > 1) {
      for (i = 1; i < BallNumber; i++) {
        hide(Balls[i].vlayobj);
        Balls[i].vy = 5;
        Balls[i].vx = Math.random(4) - 2;
      }
      BallNumber = 1;
    }
  } else if (MenuTime > 300) {
    // CollapseMenu
    CollapseMenu = 1;
    TestBounce = 0;
  } else if (MenuTime > 25 && TestBounce == 0) {
    // full action
    TestBounce = 1;
    TestMouse = 1;
  } else {
    if (CollapseMenu == 1) {
      // uncollapse but at first don't listen to mouse
      CollapseMenu = 0;
      TestMouse = 0;
      // show other balls
      for (i = BallNumber; i < BallMax; i++) {
        Balls[i].x = Balls[0].x;
        Balls[i].y = Balls[0].y;
        Balls[i].vlayobj.vpos(Balls[0].x, Balls[0].y);
        show(Balls[i].vlayobj);
      }
      BallNumber = BallMax;
    }
  }

  for (i = 0; i < BallNumber; i++) {
    with (Balls[i]) {
      if (CollapseMenu == 0) {
        dx = x - (MenuX + MenuDX * i + ScrollLeft);
        dy = y - (MenuY + MenuDY * i + ScrollTop);
      } else {
        dx = x - (MenuStallX + ScrollLeft);
        dy = y - (MenuStallY + ScrollTop);
      }
      distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        // like spring

        ax += -0.004 * dx;
        ay += -0.004 * dy;
      }
    }
  }
}

function moveobjects() {
  for (i = 0; i < BallNumber; i++) {
    with (Balls[i]) {
      vx += ax;
      vy += ay;
      vx *= Damping;
      vy *= Damping;
      x += vx;
      y += vy;
      ax = 0; //set zero after used
      ay = 0;

      // Check for borders:
      if (x < ClipLeft) {
        x = 2 * ClipLeft - x;
        vx = Math.abs(vx);
      }
      if (x > ClipRight) {
        x = 2 * ClipRight - x;
        vx = -Math.abs(vx);
      }
      if (y < ClipTop) {
        y = 2 * ClipTop - y;
        vy = Math.abs(vy);
      }
      if (y > ClipBottom) {
        y = 2 * ClipBottom - y;
        vy = -Math.abs(vy);
      }

      // Move
      vlayobj.vpos(x, y);
    }
  } //for i
}

function showtraces() {
  TraceBall++;
  if (TraceBall >= TraceLoopMax) {
    TraceBall = 0;
  }
  if (TraceBall < BallNumber) {
    // Show trace
    with (Balls[TraceBall]) {
      Trace[TraceNow].vlaytr.vpos(x + 45, y + 45);
      if (Trace[TraceNow].visible == 0) {
        show(Trace[TraceNow].vlaytr);
        Trace[TraceNow].visible = 1;
      }
      TraceNow++;
      if (TraceNow >= TraceMax) TraceNow = 0;
    }
  }
}

function clearalltraces() {
  for (var i = 0; i < BallMax; i++) {
    with (Balls[i]) {
      for (var j = 0; j < TraceMax; j++) {
        hide(Trace[j].vlaytr);
        Trace[j].vlaytr.vpos(0, 0);
        Trace[j].visible = 0;
      }
    }
  }
}

function showalltraces() {
  for (var i = 0; i < BallMax; i++) {
    with (Balls[i]) {
      for (var j = 0; j < TraceMax; j++) {
        Trace[j].vlaytr.vpos(x + 45, y + 45);
        show(Trace[j].vlaytr);
        Trace[j].visible = 1;
      }
    }
  }
}

function showballmenu(thisball) {
  var menuleft = mousex;
  var menutop = mousey;

  // Check size of new menu
  var divsize = new Object();
  getObjSize(thisball.vlayobjmenu, divsize);
  if (mousex + divsize.right - divsize.left > Winx)
    menuleft = mousex - (divsize.right - divsize.left);
  if (mousey + divsize.bottom - divsize.top > Winy)
    menutop = mousey - (divsize.bottom - divsize.top);
  if (mousey + divsize.bottom - divsize.top > ScrollTop + MenuBoundBottom)
    menutop = mousey - (divsize.bottom - divsize.top);
  if (menutop < ScrollTop) menutop = ScrollTop;
  if (menuleft < 0) menuleft = 0;
  if (menutop < 0) menutop = 0;

  thisball.vlayobjmenu.vpos(menuleft, menutop);
  show(thisball.vlayobjmenu);
  // hide(thisball.vlayobjmenu);
  thisball.vlayobjmenu.vopacity(90);

  thisball.menustate = 1;
}

function showSettingMenu() {
  var menuleft = mousex;
  var menutop = mousey;

  // Check size of new menu
  var divsize = new Object();
  getObjSize(vlay.settingmenu, divsize);
  if (mousex + divsize.right - divsize.left > Winx)
    menuleft = mousex - (divsize.right - divsize.left);
  if (mousey + divsize.bottom - divsize.top > Winy)
    menutop = mousey - (divsize.bottom - divsize.top);
  if (mousey + divsize.bottom - divsize.top > ScrollTop + MenuBoundBottom)
    menutop = mousey - (divsize.bottom - divsize.top);
  if (menutop < ScrollTop) menutop = ScrollTop;
  if (menuleft < 0) menuleft = 0;
  if (menutop < 0) menutop = 0;

  vlay.settingmenu.vpos(menuleft, menutop);
  show(vlay.settingmenu);
  vlay.settingmenu.vopacity(90);
  SettingMenuState = 1;
}

function hideSettingMenu() {
  // set back vopacity to accelerate Mozilla??
  vlay.settingmenu.vopacity(100);
  hide(vlay.settingmenu);
  SettingMenuState = 0;
}

function putBall(i, x, y) {
  Balls[i].x = x;
  Balls[i].y = y;
}

function putBallv(i, vx, vy) {
  Balls[i].vx = vx;
  Balls[i].vy = vy;
}

// i..startball, inum..# of balls
function putBallChain(i, inum, x1, y1, x2, y2, style) {
  var k;
  var dx;
  var dy;
  var sx;
  var sy;
  if (inum <= 1) {
    Balls[i].x = x1;
    Balls[i].y = y1;
    return;
  }
  switch (style) {
    case 1:
      // place equally from (x1,y1) to (x2,y2)
      sx = x1;
      sy = y1;
      dx = (x2 - x1) / (inum - 1);
      dy = (y2 - y1) / (inum - 1);
      break;
    case 2:
      // place symetrically around (x1,y1) with distance (x2,y2) between 2 balls
      sx = x1 - (x2 * (inum - 1)) / 2;
      sy = y1 - (y2 * (inum - 1)) / 2;
      dx = x2;
      dy = y2;
      break;
    case 3:
      // place with distance (x2,y2) starting at (x1,y2)
      sx = x1;
      sy = x1;
      dx = x2;
      dy = y2;
  }
  for (k = 0; k < inum; k++) {
    Balls[i + k].x = sx + dx * k;
    Balls[i + k].y = sy + dy * k;
  }
}

// deactivate Balls with number>=i
function deactivateBalls(i) {
  for (var k = i; k < BallNumber; k++) {
    with (Balls[k]) {
      x = 3 + 110 * (k - i);
      y = 3; //110 * (k-i);
      hasgravitycentral = 0;
      stopstate = 1; // Stop
      vlayobjstop.vpos(x, y);
      show(vlayobjstop);
    }
  }
}

function activateAllBalls() {
  for (var i = 0; i < BallNumber; i++) {
    with (Balls[i]) {
      stopstate = 0;
      hide(vlayobjstop);
    }
  }
}

function rnd(i) {
  return Math.floor(Math.random() * i);
}

// Completely random
function settingrandom() {
  var r = rnd(3);

  switch (r) {
    case 0:
      settingnoforce();
      break;
    case 1:
      settingnewtonpendulum();
      break;
    case 2:
      settinggravitydown();
      break;
    default:
      settingnoforce();
  }
}

stylenoforce = rnd(2) + 1;
function settingnoforce() {
  //var style = rnd(2)+1;
  stylenoforce++;
  if (stylenoforce > 2) stylenoforce = 1;

  settingreset();
  stopallballs();

  Damping = 0.995;

  getWinSize();

  switch (stylenoforce) {
    case 1:
      // all in a chain
      py = Winy / 2 - 50 + rnd(30);
      py2 = py; //+100*(rnd(3)-1);
      putBallChain(0, BallNumber, 50, py, Winx - 150, py2, 1);
      break;
    case 2:
      // Billard table
      var xb = (Winx - 100) * 0.7 + rnd(31) - 15;
      var yb = Winy / 2 - 50 + rnd(11) - 5;
      //putBallChain(0,BallNumber,50,Winy/2,Winx-50,Win/2,1);
      putBall(0, Winx * 0.1, yb);
      putBall(1, xb, yb);
      putBall(2, xb + 87, yb - 50); //sin60°
      putBall(3, xb + 87, yb + 50);
      putBall(4, xb + 174, yb);
      break;
  }
}

var stylenewtonpendulum = rnd(3) + 1;
function settingnewtonpendulum() {
  stylenewtonpendulum++;
  if (stylenewtonpendulum > 3) stylenewtonpendulum = 1;

  var moveballs = rnd(BallNumber - 1) + 1;
  var startdir = 2 * rnd(2) - 1;
  settingreset();
  stopallballs();

  Damping = 0.9999;

  getWinSize();
  switch (stylenewtonpendulum) {
    case 1:
    case 2:
      // horizontally
      px = Winx / 2 - 50;
      py = Winy / 2 - 50 + (Math.random() - 0.5) * Winy * 0.4;
      putBallChain(0, BallNumber, px, py, 100, 0, 2);

      for (i = 0; i < moveballs; i++) {
        Balls[i].vx = -5 * startdir;
      }
      break;
    case 3:
      // hor+vert
      putBall(0, 100, 220);
      putBall(1, 220, 100);
      putBall(2, 320, 100);
      putBall(3, 100, 320);
      putBall(4, 100, 420);

      Balls[2].vx = 5;
      Balls[4].vy = -5 * ((Winy - 100 - 200) / (Winx - 100 - 100));
      break;
  }
}

stylegravitydown = rnd(4) + 1;
function settinggravitydown() {
  stylegravitydown++;
  if (stylegravitydown > 4) stylegravitydown = 1;

  settingreset();
  stopallballs();

  GravityConst = 1; // Constant Gravity On
  Gravityx = 0;
  Gravityy = 0.04;

  getWinSize();
  px = (Winx - 100) / 2;
  py = (Winy - 100) / 2;

  if (stylegravitydown == 2 && (BallNumber + 1) * 100 > Winy)
    stylegravitydown = 3; // not enough space

  switch (stylegravitydown) {
    case 1:
      //Random
      putBallChain(0, BallNumber, px - 30, py * 0.2, px + 30, py * 0.2, 1);

      for (i = 0; i < BallNumber; i++) {
        Balls[i].vx = Math.random() * 3 + (i - BallNumber / 2) * 2;
        Balls[i].vy = Math.random();
      }
      break;
    case 2:
      // in order vertically
      putBallChain(0, BallNumber, px, py, 0, 110, 2);
      break;
    case 3:
      // in order horizontally
      putBallChain(0, BallNumber, 0, 0, 100, 0, 3);
      for (i = 0; i < BallNumber; i++) {
        Balls[i].vx = i;
      }
      break;
    case 4:
      // horizontally wave
      putBallChain(0, BallNumber, 50, 50, Winx - 150, 50, 1);
      fd = 1000;
      fv = 32;
      for (i = 0; i < BallNumber; i++) {
        Balls[i].y = Balls[i].y + ((fd * Gravityy) / 2) * i * i;
        Balls[i].vy = -fv * Gravityy * i;
      }
      break;
  }
}

function settingsolarsystem() {
  settingreset();
  stopallballs();

  GravityCentral = 1;
  GravityG = 5000;
  Damping = 0.99999;

  getWinSize();

  Balls[0].x = Winx / 2 - 100;
  Balls[0].y = Winy / 2 - 50;
  Balls[1].x = Winx / 2 + 100;
  Balls[1].y = Winy / 2 - 50;

  Balls[0].vy = 4;
  Balls[1].vy = -4;

  // deactivate other balls
  deactivateBalls(2);
}

var stylethreebody = rnd(2) + 1;
function settingthreebody() {
  //var style = rnd(2) + 1;
  stylethreebody++;
  if (stylethreebody > 2) stylethreebody = 1;
  settingreset();
  stopallballs();

  GravityCentral = 1;
  GravityG = 5000;
  Damping = 0.99999;

  getWinSize();

  switch (stylethreebody) {
    case 1:
      px = Winx / 2 - 50;
      py = Winy / 2 - 50;
      putBall(0, px - 250, py - 50);
      putBall(1, px + 250, py + 50);
      putBall(2, px, py);
      vel = 2;
      veld = 0.1 * (Math.random() - 0.5); // small disturbance
      putBallv(0, vel, -vel);
      putBallv(1, vel, -vel + veld);
      putBallv(2, -2 * vel, 2 * vel);

      // deactivate other balls
      deactivateBalls(3);
      break;
    case 2:
      px = Winx / 2 - 50;
      py = Winy / 2 - 50;
      r = 160;
      b = 3;
      vel = 3.5 + Math.random() * 1;
      for (i = 0; i < b; i++) {
        phi = (i * 2 * Math.PI) / b;
        putBall(i, px + r * Math.cos(phi), py + r * Math.sin(phi));
        putBallv(i, -vel * Math.sin(phi), vel * Math.cos(phi));
      }
      //GravityG=0;
      deactivateBalls(b);
      break;
  }
}

// Setting fuer Menu:
function settingmenustyle(mainball) {
  settingreset();
  Damping = 0.94;

  MenuForce = 1;
  MenuCollapse = 0;

  getWinSize();
  setmenulayout();

  if (Balls[0].vx == 0) {
    // not in movement
    putBallChain(
      0,
      BallNumber,
      MenuX + rnd(21) - 10,
      MenuY + rnd(31) - 15,
      MenuDX + rnd(11) - 5,
      MenuDY + rnd(5) - 2,
      3
    );
  }
}

// after each Window-Resize:
function setmenulayout() {
  MenuStallX = 5;
  MenuStallY = 10;

  MenuX = 10; // Menu Position identifiers
  MenuY = 30;

  if (Winy > 100 * BallNumber) {
    MenuDX = 0;
    MenuDY = 110;
    MenuBoundBottom = MenuY + BallNumber * MenuDY;
  } else {
    MenuDX = (Winx - 150) / (BallNumber - 1);
    MenuDY = 0;
  }
  //	if (Winy > 100 * BallNumber) {
  //		if (100 * BallNumber + MenuY > Winy) MenuY = Winy - 100*BallNumber;
  //		MenuDX = 0;
  //		MenuDY = (Winy - 2 * MenuY) / (BallNumber);
  //	}
  //	else {
  //		MenuDX = (Winx - 150) / (BallNumber-1);
  //		MenuDY = 0;
  //	}
}

//</script>
