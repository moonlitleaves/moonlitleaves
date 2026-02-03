function Alladyn() {
  function V(v) {
    for (var i = 0; i < v.length; i++)
      with (v[i]) {
        A(v[i], id);
        if (ns4) V(document.layers);
      }
  }
  function A(X, v) {
    vlay[v] = X;
    if (ns4) {
      X.style = X;
      X.vol = 0;
    }
    X.vpos = P;
    X.vclip = ns4 ? c : C;
    X.vopacity = ie ? O : ns6 ? o : N;
    X.vHTML = ns4 ? h : H;
    X.vs = S;
    X.vkf = K;
    X.van = {
      group: '',
      F: 0,
      go: 0,
      d: 1,
      mode: '',
      f: [],
      a: {},
      s: {},
      purge: Q,
      reset: R,
      UDF: '',
    };
  }
  function P(x, y) {
    this.style.left = x;
    this.style.top = y;
  }
  function C(t, r, b, l) {
    this.style.clip = 'rect(' + t + ' ' + r + ' ' + b + ' ' + l + ')';
  }
  function c(t, r, b, l) {
    with (this.clip) {
      top = t;
      right = r;
      bottom = b;
      left = l;
    }
  }
  function O(v) {
    this.style.filter = 'alpha(opacity=' + v + ')';
  }
  function o(v) {
    this.style.MozOpacity = v + '%';
  }
  function N(v) {
    with (this) {
      visibility = v < (vol ? vol : STPE.vol) ? 'hid' : 'show';
    }
  }
  function H(v) {
    this.innerHTML = v;
  }
  function h(v) {
    with (this.document) {
      write(v);
      close();
    }
  }
  function R() {
    with (this) {
      go = 0;
      F = 0;
      d = 1;
      mode = '';
      UDF = '';
      f = [];
      a = {};
    }
  }
  function Q() {
    with (this) {
      f = [{}];
      a = {};
      for (F in s) {
        a[F] = f[0][F] = s[F];
      }
      F = 0;
    }
  }
  function S() {
    with (this)
      with (van) {
        var v,
          c = 0,
          l = f.length;
        for (v in f[F]) {
          s[v] = f[F][v];
          switch (v) {
            case 'vopacity':
              vopacity(s[v]);
              break;
            case ('ct', 'cr', 'cb', 'cl'):
              c++;
              break;
            default:
              style[v] = s[v];
          }
        }
        if (c) with (s) vclip(ct, cr, cb, cl);
        F += d;
        if (F < 0 || F == l)
          switch (mode) {
            case 'loop':
              F = F < 0 ? l - 1 : 0;
              break;
            case 'ping':
              d = -d;
              F += 2 * d;
              break;
            default:
              F -= d;
              go = 0;
              eval(UDF);
          }
      }
  }
  function K(v, t) {
    with (this.van) {
      var l = f.length + t - 1,
        p,
        q = {},
        j;
      for (p in v) {
        q[p] = a[p] != null ? (v[p] - a[p]) / t : 0;
        a[p] = v[p];
      }
      for (j = 0; j <= t; j++) {
        if (j != t) f[l - j] = {};
        if (l >= j) for (p in v) f[l - j][p] = Math.round(v[p] - j * q[p]);
      }
    }
  }
  function s(g) {
    clearInterval(this[g].I);
    this[g] = 0;
  }
  function g(g, t, a, u) {
    if (!this[g])
      this[g] = {
        I: setInterval('STPE.s("' + g + '")', t),
        A: a,
        U: u ? u : '',
      };
  }
  function a(g) {
    var v,
      s = 1;
    for (v in vlay) with (vlay[v]) if (van.go && van.group == g) s = vs();
    if (s) with (this[g]) if (A) eval('STPE.stop(g);' + U);
  }
  function n(v, w, p) {
    var V;
    p = p ? p : ns4 ? window : doc.body;
    if (ns4) {
      V = new Layer(w, p);
      V.visibility = 'show';
    } else {
      if (ie) {
        p.insertAdjacentHTML(
          'BeforeEnd',
          '<div id=' + v + ' style="position:absolute"></div>'
        );
        V = ie.tags('div')[v];
      } else {
        V = doc.createElement('div');
        V.style.position = 'absolute';
        p.appendChild(V);
      }
      V.style.width = w;
    }
    A(V, v);
  }
  function i() {
    var v,
      a,
      x = doc.images;
    if (ns4)
      for (v in vlay)
        with (vlay[v].document)
          for (a = 0; a < images.length; a++) x[images[a].name] = images[a];
    return x;
  }
  doc = document;
  ie = doc.all;
  ns4 = doc.layers;
  up5 = doc.getElementById ? doc.getElementsByTagName('div') : 0;
  ns6 = up5 && !ie;
  STPE = { v: 1.5, s: a, go: g, stop: s, vol: 50, N: n, I: i };
  vlay = [];
  V(up5 ? up5 : ie ? ie.tags('div') : ns4);
}
