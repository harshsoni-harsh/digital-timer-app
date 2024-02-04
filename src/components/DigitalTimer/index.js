// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      time: new Date(0, 0, 0, 0, 25),
      isRunning: false,
      defaultTime: 25,
    }
  }

  tick = () => {
    const {time} = this.state
    if (time !== new Date(0, 0, 0, 0, 0, 0)) {
      this.setState({
        time: new Date(0, 0, 0, 0, time.getMinutes(), time.getSeconds() - 1),
      })
    }
  }

  onStart = () => {
    this.timer = setInterval(this.tick, 1000)
    this.setState({isRunning: true})
  }

  onPause = () => {
    this.setState({isRunning: false})
    clearInterval(this.timer)
  }

  onReset = () => {
    this.setState({isRunning: false})
    clearInterval(this.timer)
    this.setState({time: new Date(0, 0, 0, 0, 25), defaultTime: 25})
  }

  onIncrease = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        time: new Date(0, 0, 0, 0, prevState.defaultTime + 1, 0),
        defaultTime: (prevState.defaultTime + 1) % 60,
      }))
    }
  }

  onDecrease = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        time: new Date(0, 0, 0, 0, prevState.defaultTime - 1, 0),
        defaultTime: (prevState.defaultTime - 1 + 60) % 60,
      }))
    }
  }

  render() {
    const {time, isRunning, defaultTime} = this.state
    return (
      <div className="body">
        <h1>Digital Timer</h1>
        <div className="container">
          <div className="time">
            <div>
              <h1 className="timeDisplay">
                {time.getMinutes() < 10 ? '0' : ''}
                {time.getMinutes()}:{time.getSeconds() < 10 ? '0' : ''}
                {time.getSeconds()}
              </h1>
              <p>{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div>
            <div className="pauseReset">
              {!isRunning ? (
                <button type="button" onClick={this.onStart}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                  />
                  <p>Start</p>
                </button>
              ) : (
                <button type="button" onClick={this.onPause}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                  />
                  <p>Pause</p>
                </button>
              )}

              <button type="button" onClick={this.onReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>
            <p className="setLimit">Set Timer limit</p>
            <div className="increaseDecrease">
              <button type="button" onClick={this.onDecrease}>
                -
              </button>
              <p>{defaultTime}</p>
              <button type="button" onClick={this.onIncrease}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
