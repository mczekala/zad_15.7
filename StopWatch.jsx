class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      time: {
        miliseconds: 0,
        seconds: 0,
        minutes: 0
      },
      results: []
    };
    this.calculate = this.calculate.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.format = this.format.bind(this);
    this.pad0 = this.pad0.bind(this);
    this.results = this.results.bind(this);
    this.clear = this.clear.bind(this);
  }
  start() {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.calculate(), 10);
    }
  }
  calculate() {
    this.setState({
      time: {
        minutes: this.state.time.minutes,
        seconds: this.state.time.seconds,
        miliseconds: this.state.time.miliseconds + 1
      }
    });
    if (this.state.time.miliseconds >= 100) {
      this.setState({
        time: {
          minutes: this.state.time.minutes,
          seconds: this.state.time.seconds + 1,
          miliseconds: 0
        }
      });
    }
    if (this.state.time.seconds >= 60) {
      this.setState({
        time: {
          miliseconds: this.state.time.miliseconds,
          minutes: this.state.time.minutes + 1,
          seconds: 0
        }
      });
    }
  }
  stop() {
    this.setState({ running: false });
    clearInterval(this.watch);
  }
  reset() {
    this.setState({
      time: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      }
    });
  }
  format() {
    return `${this.pad0(this.state.time.minutes)}:${this.pad0(
      this.state.time.seconds
    )}:${this.pad0(Math.floor(this.state.time.miliseconds))}`;
  }
  pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
      result = "0" + result;
    }
    return result;
  }
  clear() {
    this.setState({ results: [] });
  }
  results() {
    let results = this.state.results;
    results.push(<li>{this.format()}</li>);
    this.setState({ results });
  }
  render() {
    return (
      <div className="container">
        <nav className="controls">
          <button className="button" onClick={this.start}>
            Start
          </button>
          <button className="button" onClick={this.stop}>
            Stop
          </button>
          <button className="button" onClick={this.reset}>
            Reset
          </button>
        </nav>
        <p>{this.format()}</p>
        <button className="button" onClick={this.clear}>
          Clear
        </button>
        <button className="button" onClick={this.results}>
          Results
        </button>
        <ul>{this.state.results}</ul>
      </div>
    );
  }
}
var app = <Stopwatch />;
ReactDOM.render(app, document.getElementById("app"));
