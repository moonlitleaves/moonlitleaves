//<SCRIPT>
/* andimenu
 * June 2002
 * Andreas Ipp
 * andreas.ipp@gmx.at
 * http://strange.itp.tuwien.ac.at/~ipp/
 *
 * special menu for my site
 */

//common URLs
FLUSHBORN_URL = 'https://flushborn.github.io/';
UNLOST_URL = 'https://unlostscrews.github.io/';
SNOWBLOOM_URL = 'https://moltensnowbloom.github.io/';
SEQUAK_URL = 'https://sacredsequak.github.io/';
LUMAEN_URL = 'https://lumaenmohair.github.io/';
BREATHES_URL = 'https://moonlitbreathes.github.io/';
LEAVES_URL = 'https://mooonlitleaves.github.io/';

ORACLE_URL = 'oracle.html';
GUESTBOOK_URL = 'guestbook.html';

function andimenuinit(category) {
  TraceMax = 0;

  dirgif = './images/balls/';
  SHOWMENU = true;
  HIDEMENU = false;

  startsetting = settingmenustyle;

  TraceMax = 15;
  startsetting = settingrandom;

  addBallName();

  // order of menuitems is important
  // switch (category) {
  //   case 'homepage':
  //     TraceMax = 15;
  //     startsetting = settingrandom;
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, SHOWMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'flushborn':
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, SHOWMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'lumaen':
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, SHOWMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'snowbloom':
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, SHOWMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'sequak':
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, SHOWMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'unlost':
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, SHOWMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'breathes':
  //     AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, SHOWMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  //   case 'leaves':
  //     AddBall('leaves', 'Moonlit Leaves', UNLOST_URL, SHOWMENU);
  //     AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  //     AddBall('breathes', 'Moonlit Breathes', UNLOST_URL, HIDEMENU);
  //     AddBall('flushborn', 'Flushborn', FLUSHBORN_URL, HIDEMENU);
  //     AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  //     AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
  //     AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, HIDEMENU);
  //     break;
  // }

  addstandardmenus(category);
  addsettingmenu();

  // now document.write
  preparedocument();
}

function addBallName() {
  AddBall('lumaen', 'Lumaen Mohair', LUMAEN_URL, SHOWMENU);
  AddBall('flushborn', 'Flushbornsssssss', FLUSHBORN_URL, HIDEMENU);
  AddBall('unlost', 'Unlost Screws', UNLOST_URL, HIDEMENU);
  AddBall('leaves', 'Moonlit Leaves', LEAVES_URL, HIDEMENU);
  AddBall('breathes', 'Moonlit Breathes', BREATHES_URL, HIDEMENU);
  AddBall('snowbloom', 'Molten Snowbloom', SNOWBLOOM_URL, HIDEMENU);
  AddBall('sequak', 'Sacred Sequak', SEQUAK_URL, HIDEMENU);
}

function addstandardmenus(category) {
  AddMenu('flushborn');
  AddMenuItem('<CENTER><EM><B>Flushborn</B></EM></CENTER>', '', 'TITLE');
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', FLUSHBORN_URL, '');
  AddMenuItem('Flushborn&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);

  AddMenu('lumaen');
  AddMenuItem('<CENTER><EM><B>Lumaen Mohair</B></EM></CENTER>', '', 'TITLE');
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', LUMAEN_URL, '');
  AddMenuItem('Lumaen Mohair&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);

  AddMenu('snowbloom');
  AddMenuItem('<CENTER><EM><B>Molten Snowbloom</B></EM></CENTER>', '', 'TITLE');
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', SNOWBLOOM_URL, '');
  AddMenuItem('Molten Snowbloom&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);

  AddMenu('unlost');
  AddMenuItem('<CENTER><EM><B>Unlost Screws</B></EM></CENTER>', '', 'TITLE');

  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Unlost Screwns', UNLOST_URL, '');
  AddMenuItem('Unlost Screws&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);

  AddMenu('sequak');
  AddMenuItem('<CENTER><EM><B>Sacred Sequak</B></EM></CENTER>', '', 'TITLE');
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', SEQUAK_URL, '');
  AddMenuItem('Sacred Sequak&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);

  AddMenu('leaves');
  AddMenuItem(
    '<CENTER><EM><B>Moonlit Leaves Library</B></EM></CENTER>',
    '',
    'TITLE'
  );
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', LEAVES_URL, '');
  AddMenuItem(
    'Moonlit Leaves Library&nbsp;Settings...',
    '',
    'showSettingMenu()'
  );
  addhome(category);

  AddMenu('breathes');
  AddMenuItem('<CENTER><EM><B>Moonlit Breathes</B></EM></CENTER>', '', 'TITLE');
  AddMenuItem('Oracle', ORACLE_URL, '');
  AddMenuItem('GuestBook', GUESTBOOK_URL, '');
  AddMenuItem('Home', BREATHES_URL, '');
  AddMenuItem('Moonlit Breathes&nbsp;Settings...', '', 'showSettingMenu()');
  addhome(category);
}

function addhome(category) {
  if (category != 'homepage') {
    AddMenuItem('<HR>', '', '');
    AddMenuItem('<CENTER>Main&nbsp;Page</CENTER>', FLUSHBORN_URL, '');
    AddMenuItem('<CENTER>Guestbook</CENTER>', GUESTBOOK_URL, '');
  }
}

function addsettingmenu() {
  AddMenu('setting');
  AddMenuItem(
    '-&nbsp;Start&nbsp;with&nbsp;new&nbsp;settings&nbsp;-',
    '',
    'TITLE'
  );
  AddMenuItem(
    'Billiard&nbsp;table&nbsp;(no&nbsp;force,&nbsp;damping)',
    '',
    'settingnoforce()'
  );
  AddMenuItem(
    'Newtons&nbsp;pendulum&nbsp;(no&nbsp;force)',
    '',
    'settingnewtonpendulum()'
  );
  AddMenuItem(
    'Earth&nbsp;(Gravity&nbsp;downwards)',
    '',
    'settinggravitydown()'
  );
  AddMenuItem(
    'Binary&nbsp;Stars&nbsp;(Planetary&nbsp;Gravity)',
    '',
    'settingsolarsystem()'
  );
  AddMenuItem(
    'Three&nbsp;body&nbsp;system&nbsp;(Planetary&nbsp;Gravity)',
    '',
    'settingthreebody()'
  );
  AddMenuItem(
    'Menu&nbsp;Style&nbsp;(Invisible&nbsp;Springs,&nbsp;damping)',
    '',
    'settingmenustyle(0)'
  );
  //AddMenuItem("more...",""aboutballmenu.html","");
  AddMenuItem('<HR>', '', '');
  AddMenuItem('How&nbsp;does&nbsp;this&nbsp;work?', 'aboutballmenu.html', '');
  AddMenuItem('Start/Stop&nbsp;animation', '', 'toggleanimation()');
  if (TraceMax > 0) AddMenuItem('Start/Stop&nbsp;trace', '', 'toggletrace()');
}

//</SCRIPT>
