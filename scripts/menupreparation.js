//<SCRIPT>
/* menunavigation
 * June 2002
 * Andreas Ipp
 * andreas.ipp@gmx.at
 * http://strange.itp.tuwien.ac.at/~ipp/
 *
 * initializing balls, traces and menus with document.write
 */

var BallInit = new Array();
var BallInitMax = 0;
// var TopBall = 0;
var MenuInit = new Array(); // Array contains Array of MenuItemObjects
var MenuNameInit = new Array(); // Array contains links from names to numbers
var CurrentMenuInit; // Current active MenuName
var CurrentMenuLink; // Current active MenuLink

var dirgif = './images/balls/'; // Path of gif
var dirjs = ''; // Path of JavaScript

// Class BallInitObject
function BallInitObject(addballname, addcaption, addLink, addOpenMenu) {
  this.ballname = addballname;
  this.ballid = addballname + 'ball';
  this.balltextid = addballname + 'text';
  this.ballmenuid = addballname + 'menu';
  this.balltraceid = addballname + 'trace';
  this.ballstopid = addballname + 'stop';
  this.ballgif = dirgif + addballname + 'ball.gif';
  this.balltracegif = dirgif + addballname + 'trace.gif';
  this.ballstopgif = dirgif + 'ballstop.gif'; // all have the same ballstop.gif
  this.caption = addcaption;
  this.menuLink = addLink;
  this.showMenu = addOpenMenu;
}

function AddBall(addballname, addcaption, addLink, addOpenMenu) {
  BallInit[BallInitMax] = new BallInitObject(
    addballname,
    addcaption,
    addLink,
    addOpenMenu
  );
  BallInitMax++;
}

// Class MenuInitObject
function MenuInitObject(addmenuname, addmenulink) {
  this.menuname = addmenuname;
  this.menulink = addmenulink;
  this.menuid = addmenuname + 'menu';
  this.item = new Array(); // Array for MenuItems
}

// Class MenuItemObject
function MenuItemObject(addcaption, addhref, addonclick) {
  this.caption = addcaption;
  this.href = addhref;
  this.onclick = addonclick;
}

function AddMenu(addmenuname, addmenulink) {
  CurrentMenuInit = addmenuname; // set active MenuName
  CurrentMenuLink = addmenulink; // set active MenuName
  MenuNameInit[(addmenuname, addmenulink)] = MenuInit.length; // name -> number (link)
  MenuInit[MenuInit.length] = new MenuInitObject(addmenuname, addmenulink);
  // MenuInit.length increases automatically
}

function AddMenuItem(addcaption, addhref, addonclick) {
  var l = MenuInit.length - 1; // Currently active MenuInit
  MenuInit[l].item[MenuInit[l].item.length] = new MenuItemObject(
    addcaption,
    addhref,
    addonclick
  );
  // Add MenuItem to MenuInit Menu Array
  // MenuInit[l].item.length increases automatically
}

// write into <a..> - tag to change status text
function includeStatus(text) {
  var wd = '';
  wd += 'onMouseOver="window.status=';
  wd += "'" + text + "'";
  wd += '; return true;" onMouseOut="window.status=';
  wd += "''";
  wd += '; return true;"';
  document.write(wd);
}

// Writes into the document
// Must be called from BODY environment
function preparedocument() {
  // for Opera we have to include explicitely the
  // style="visibility:hidden", otherwise it will display
  // the generation of objects
  var includestyle = '';
  if (!document.layers) {
    // unfortunatley Netscape 4 doesn't like style inclusions
    includestyle = 'style="visibility:hidden"';
  }

  var i;
  var j;

  // draw traces
  for (i = 0; i < BallInitMax; i++) {
    with (BallInit[i]) {
      for (j = 0; j < TraceMax; j++) {
        document.write(
          '<div id="' +
            balltraceid +
            '' +
            j +
            '" class="tracestyle" ' +
            includestyle +
            '>'
        );
        document.write(
          '<img src="' +
            balltracegif +
            '" height="10" width="10" border="0"></div>'
        );
      }
    }
  }

  // draw hints
  for (i = 0; i < BallInitMax; i++) {
    with (BallInit[i]) {
      document.write(
        '<div id="' +
          balltextid +
          '" class="balltext" ' +
          includestyle +
          '>' +
          caption +
          '<BR>'
      );
      document.write('</div>');
    }
  }

  // draw Balls
  // lower number should appear on top ->
  // backward order.
  for (i = BallInitMax - 1; i >= 0; i--) {
    with (BallInit[i]) {
      document.write(
        '<div id="' + ballid + '" class="ballstyle" ' + includestyle + '>'
      );
      //   document.write('<a href="' + menuLink + '" " ');

      if (BallInit[i].showMenu) {
        document.write(
          '<a href="#" onclick="showballmenu(Balls[' + i + ']); return false;">'
        );
      } else {
        document.write('<a href="' + menuLink + '" " ');
      }

      //   includeStatus(caption + ' - Click for menu');
      !BallInit[i].showMenu && document.write('>');
      document.write(
        '<img src="' +
          ballgif +
          '" height="100" border="0" width="100"></a></div>'
      );
    }
  }

  // draw BallStops
  for (i = 0; i < BallInitMax; i++) {
    with (BallInit[i]) {
      document.write(
        '<div id="' + ballstopid + '" class="ballstyle" ' + includestyle + '>'
      );
      document.write(
        '<img src="' +
          ballstopgif +
          '" height="100" border="0" width="100"></div>'
      );
    }
  }

  // draw Menus
  for (i = 0; i < MenuInit.length; i++) {
    with (MenuInit[i]) {
      document.write(
        '<div id="' + menuid + '" class="menustyleborder" ' + includestyle + '>'
      );
      document.write(
        '<TABLE cellSpacing=1 cellPadding=1 width="15" border=0 class="menustyle">'
      );
      for (j = 0; j < item.length; j++) {
        if (item[j].onclick == 'TITLE') {
          // special: TITLE
          document.write(
            '<TR><TH><NOBR><CENTER><SPAN class="menutitle">' +
              item[j].caption +
              '</SPAN></CENTER></NOBR></TH></TR>'
          );
        } else if (item[j].href != '') {
          // href item
          document.write(
            '<TR><TD><a href="' +
              item[j].href +
              '">' +
              item[j].caption +
              '</a></TD></TR>'
          );
        } else if (item[j].onclick != '') {
          // onclick item
          document.write(
            '<TR><TD><a href="javascript:myvoid()" onclick="' +
              item[j].onclick +
              '; return true;" '
          );
          // includeStatus(item[j].caption);
          document.write('>' + item[j].caption + '</a></TD></TR>');
        } else {
          // no link
          document.write('<TR><TD>' + item[j].caption + '</TD></TR>');
        }
      }
      document.write('</TABLE></div>');
    }
  }
}

// onbody-Initialization:
function startmenu() {
  Alladyn();
  start();
  animationinit();
  animation();
}

// write Setting-Button to document:
function settingButton() {
  document.write('<span id="settingmenubutton">');
  document.write('<a href="javascript:myvoid()" onclick="showSettingMenu()" ');
  includeStatus('Change settings of this page');
  document.write('></a></span>');
}

// write Start-Again-Button to document:
function startagainButton() {
  document.write('<a href="javascript:myvoid()" onclick="settingrandom()" ');
  includeStatus('Start again with random settings');
  document.write('>Start again</a>');
}

// can only be called after Alladyn:
function closeAllMenus() {
  var i;
  for (i = 0; i < MenuInit.length; i++) {
    hide(vlay[MenuInit[i].menuid]);
  }
}

//</SCRIPT>
