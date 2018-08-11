"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      running: false,
      time: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      },
      results: []
    };
    _this.start = _this.start.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.results = _this.results.bind(_this);
    _this.clear = _this.clear.bind(_this);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({ running: true });
        this.watch = setInterval(function () {
          return _this2.calculate();
        }, 10);
      }
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var minutes = this.state.time.minutes;
      var seconds = this.state.time.seconds;
      var miliseconds = this.state.time.miliseconds;
      miliseconds++;
      if (miliseconds >= 100) {
        seconds++;
        miliseconds = 0;
      }
      if (seconds >= 60) {
        minutes++;
        seconds = 0;
      }
      this.setState({
        time: { minutes: minutes, seconds: seconds, miliseconds: miliseconds }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({ running: false });
      clearInterval(this.watch);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        time: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: "format",
    value: function format() {
      return this.pad0(this.state.time.minutes) + ":" + this.pad0(this.state.time.seconds) + ":" + this.pad0(Math.floor(this.state.time.miliseconds));
    }
  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = "0" + result;
      }
      return result;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.setState({ results: [] });
    }
  }, {
    key: "results",
    value: function results() {
      this.setState({ results: [].concat(_toConsumableArray(this.state.results), [this.format()]) });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "button",
            { className: "button", onClick: this.start },
            "Start"
          ),
          React.createElement(
            "button",
            { className: "button", onClick: this.stop },
            "Stop"
          ),
          React.createElement(
            "button",
            { className: "button", onClick: this.reset },
            "Reset"
          )
        ),
        React.createElement(
          "p",
          null,
          this.format()
        ),
        React.createElement(
          "button",
          { className: "button", onClick: this.clear },
          "Clear"
        ),
        React.createElement(
          "button",
          { className: "button", onClick: this.results },
          "Results"
        ),
        React.createElement(
          "ul",
          null,
          this.state.results.map(function (result) {
            return React.createElement(
              "li",
              null,
              result
            );
          })
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

var app = React.createElement(Stopwatch, null);
ReactDOM.render(app, document.getElementById("app"));
