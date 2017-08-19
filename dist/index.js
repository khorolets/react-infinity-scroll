(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var defaultBottomOffset = 0;

  var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.handleScroll = function (e) {
        console.log(window.pageYOffset + window.innerHeight >= document.body.offsetHeight - _this.state.bottomOffset);
        if (window.pageYOffset + window.innerHeight >= document.body.offsetHeight - _this.state.bottomOffset && _this.props.hasMore && !_this.state.blocking) {
          _this.setState({ blocking: true });
          _this.setState({ page: _this.state.page + 1 });
          _this.props.loadMore(_this.state.page, function () {
            _this.setState({ blocking: false });
          });
        }
      };

      _this.state = {
        'page': _this.props.pageStart,
        'loader': _this.props.loader,
        'bottomOffset': _this.props.bottomOffset ? _this.props.bottomOffset : defaultBottomOffset,
        'blocking': false
      };
      return _this;
    }
    /*
    This is the component for infnity scroll.
    */


    _createClass(_class, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.props.children,
          this.state.blocking ? this.props.loader : ''
        );
      }
    }]);

    return _class;
  }(_react2.default.Component);

  _class.propTypes = {
    pageStart: _propTypes2.default.number.isRequired,
    loadMore: _propTypes2.default.func.isRequired,
    hasMore: _propTypes2.default.bool.isRequired,
    loader: _propTypes2.default.element,
    bottomOffset: _propTypes2.default.number
  };
  exports.default = _class;
});