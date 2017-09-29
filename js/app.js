(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterConfig = require('react-router-config');

var _Header = require('./header/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Sidebar = require('./sidebar/Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          route = _props.route,
          location = _props.location;

      return _react2.default.createElement(
        'div',
        { id: 'content-wrapper' },
        _react2.default.createElement(_Header2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'container-fluid' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(_Sidebar2.default, { location: location.pathname }),
            (0, _reactRouterConfig.renderRoutes)(route.routes)
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

exports.default = App;

});

require.register("components/Counter.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseCounter = function BaseCounter(_ref) {
  var count = _ref.count,
      onPlusClick = _ref.onPlusClick,
      onMinusClick = _ref.onMinusClick;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h5',
      null,
      _react2.default.createElement(
        'a',
        { href: 'https://redux.js.org/' },
        'Redux'
      ),
      ' & ',
      _react2.default.createElement(
        'a',
        { href: 'https://facebook.github.io/react/' },
        'React'
      ),
      ' Counter'
    ),
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement(
        'button',
        { onClick: onMinusClick },
        '-'
      ),
      count,
      _react2.default.createElement(
        'button',
        { onClick: onPlusClick },
        '+'
      )
    )
  );
};

BaseCounter.propTypes = {
  count: _react.PropTypes.number.isRequired,
  onPlusClick: _react.PropTypes.func.isRequired,
  onMinusClick: _react.PropTypes.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    count: state
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onPlusClick: function onPlusClick() {
      return dispatch({ type: 'INCREMENT' });
    },
    onMinusClick: function onMinusClick() {
      return dispatch({ type: 'DECREMENT' });
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(BaseCounter);

});

require.register("components/components/Components.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Components = function (_Component) {
  _inherits(Components, _Component);

  function Components() {
    _classCallCheck(this, Components);

    return _possibleConstructorReturn(this, (Components.__proto__ || Object.getPrototypeOf(Components)).apply(this, arguments));
  }

  _createClass(Components, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Components Header"
        ),
        _react2.default.createElement(
          "section",
          null,
          "Content goes here..."
        )
      );
    }
  }]);

  return Components;
}(_react.Component);

exports.default = Components;

});

require.register("components/header/Header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'nav',
        { className: 'navbar navbar-expand-md navbar-dark fixed-top bg-dark' },
        _react2.default.createElement(
          _reactRouterDom.Link,
          { className: 'navbar-brand', to: '/app' },
          _react2.default.createElement('img', { src: './images/logo.png', alt: 'logo' })
        ),
        _react2.default.createElement(
          'button',
          { className: 'navbar-toggler d-lg-none', type: 'button', 'data-toggle': 'collapse', 'data-target': '#navbarsExampleDefault', 'aria-controls': 'navbarsExampleDefault', 'aria-expanded': 'false', 'aria-label': 'Toggle navigation' },
          _react2.default.createElement('span', { className: 'navbar-toggler-icon' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'collapse navbar-collapse', id: 'navbarsExampleDefault' },
          _react2.default.createElement(
            'ul',
            { className: 'navbar-nav mr-auto' },
            _react2.default.createElement(
              'li',
              { className: 'nav-item active' },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { className: 'nav-link', to: '/app' },
                'Home ',
                _react2.default.createElement(
                  'span',
                  { className: 'sr-only' },
                  '(current)'
                )
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'nav-item' },
              _react2.default.createElement(
                'a',
                { className: 'nav-link', href: '#' },
                'Settings'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'nav-item' },
              _react2.default.createElement(
                'a',
                { className: 'nav-link', href: '#' },
                'Profile'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'nav-item' },
              _react2.default.createElement(
                'a',
                { className: 'nav-link', href: '#' },
                'Help'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-inline mt-2 mt-md-0' },
            _react2.default.createElement(
              'span',
              { className: 'username' },
              'Paul Miller'
            ),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-outline-success my-2 my-sm-0', type: 'submit' },
              'Logout'
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

exports.default = Header;

});

require.register("components/home/Home.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = function (_Component) {
  _inherits(Content, _Component);

  function Content() {
    _classCallCheck(this, Content);

    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).apply(this, arguments));
  }

  _createClass(Content, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Mashdish"
        ),
        _react2.default.createElement(
          "section",
          null,
          _react2.default.createElement(
            "p",
            null,
            "Welcome to our new manager panel!"
          ),
          _react2.default.createElement(
            "p",
            null,
            "Try sidebar links."
          )
        )
      );
    }
  }]);

  return Content;
}(_react.Component);

exports.default = Content;

});

require.register("components/recipes/Recipes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recipes = function (_Component) {
  _inherits(Recipes, _Component);

  function Recipes() {
    _classCallCheck(this, Recipes);

    return _possibleConstructorReturn(this, (Recipes.__proto__ || Object.getPrototypeOf(Recipes)).apply(this, arguments));
  }

  _createClass(Recipes, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Recipes"
        ),
        _react2.default.createElement(
          "section",
          null,
          "Content goes here..."
        )
      );
    }
  }]);

  return Recipes;
}(_react.Component);

exports.default = Recipes;

});

require.register("components/reels/Reels.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reels = function (_Component) {
  _inherits(Reels, _Component);

  function Reels() {
    _classCallCheck(this, Reels);

    return _possibleConstructorReturn(this, (Reels.__proto__ || Object.getPrototypeOf(Reels)).apply(this, arguments));
  }

  _createClass(Reels, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Reels"
        ),
        _react2.default.createElement(
          "section",
          null,
          "Content goes here..."
        )
      );
    }
  }]);

  return Reels;
}(_react.Component);

exports.default = Reels;

});

require.register("components/sidebar/Sidebar.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _reactRouterConfig = require('react-router-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_Component) {
  _inherits(Sidebar, _Component);

  function Sidebar() {
    _classCallCheck(this, Sidebar);

    return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
  }

  _createClass(Sidebar, [{
    key: 'render',
    value: function render() {
      var location = this.props.location.slice(1);
      return _react2.default.createElement(
        'nav',
        { className: 'col-sm-4 col-md-2 d-none d-sm-block bg-light sidebar' },
        _react2.default.createElement(
          'ul',
          { className: 'nav nav-pills flex-column' },
          _react2.default.createElement(
            'li',
            { className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'nav-link ' + (location === 'spins' ? 'active' : ''), to: '/spins' },
              'Spins'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'nav-link ' + (location === 'components' ? 'active' : ''), to: '/components' },
              'Components'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'nav-link ' + (location === 'reels' ? 'active' : ''), to: '/reels' },
              'Reels'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'nav-link ' + (location === 'recipes' ? 'active' : ''), to: '/recipes' },
              'Recipes'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'nav-item' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'nav-link ' + (location === 'weightings' ? 'active' : ''), to: '/weightings' },
              'Weightings'
            )
          )
        )
      );
    }
  }]);

  return Sidebar;
}(_react.Component);

exports.default = Sidebar;

});

require.register("components/spins/Spins.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Spins = function (_Component) {
  _inherits(Spins, _Component);

  function Spins() {
    _classCallCheck(this, Spins);

    return _possibleConstructorReturn(this, (Spins.__proto__ || Object.getPrototypeOf(Spins)).apply(this, arguments));
  }

  _createClass(Spins, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Spins"
        ),
        _react2.default.createElement(
          "section",
          null,
          "Content goes here..."
        )
      );
    }
  }]);

  return Spins;
}(_react.Component);

exports.default = Spins;

});

require.register("components/weightings/Weightings.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weightings = function (_Component) {
  _inherits(Weightings, _Component);

  function Weightings() {
    _classCallCheck(this, Weightings);

    return _possibleConstructorReturn(this, (Weightings.__proto__ || Object.getPrototypeOf(Weightings)).apply(this, arguments));
  }

  _createClass(Weightings, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "main",
        { className: "col-sm-9 ml-sm-auto col-md-10 pt-3 content", role: "main" },
        _react2.default.createElement(
          "h1",
          { className: "section-header" },
          "Weightings"
        ),
        _react2.default.createElement(
          "section",
          null,
          "Content goes here..."
        )
      );
    }
  }]);

  return Weightings;
}(_react.Component);

exports.default = Weightings;

});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _reactRouterConfig = require('react-router-config');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRouterDom.BrowserRouter,
  null,
  (0, _reactRouterConfig.renderRoutes)(_routes2.default)
), document.getElementById('app'));

});

require.register("reducers.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

});

require.register("routes.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/home/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Spins = require('./components/spins/Spins');

var _Spins2 = _interopRequireDefault(_Spins);

var _Components = require('./components/components/Components');

var _Components2 = _interopRequireDefault(_Components);

var _Reels = require('./components/reels/Reels');

var _Reels2 = _interopRequireDefault(_Reels);

var _Recipes = require('./components/recipes/Recipes');

var _Recipes2 = _interopRequireDefault(_Recipes);

var _Weightings = require('./components/weightings/Weightings');

var _Weightings2 = _interopRequireDefault(_Weightings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [{
  component: _App2.default,
  routes: [{
    path: '/app',
    component: _Home2.default
  }, {
    path: '/spins',
    component: _Spins2.default
  }, {
    path: '/components',
    component: _Components2.default
  }, {
    path: '/reels',
    component: _Reels2.default
  }, {
    path: '/recipes',
    component: _Recipes2.default
  }, {
    path: '/weightings',
    component: _Weightings2.default
  }, {
    path: '/',
    component: _Home2.default
  }]
}];

exports.default = routes;

});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map