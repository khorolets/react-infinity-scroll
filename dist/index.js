(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.index = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

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
        'bottomOffset': _this.props.bottomOffset ? _this.props.bottomOffset : defaultBottomOffset
      };
      return _this;
    }
    /*
    This is the component for infnity scroll.
    TODO implement the usage of `loader`
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
    pageStart: _react.PropTypes.number.isRequired,
    loadMore: _react.PropTypes.func.isRequired,
    hasMore: _react.PropTypes.bool.isRequired,
    loader: _react.PropTypes.element,
    bottomOffset: _react.PropTypes.number
  };
  exports.default = _class;
});