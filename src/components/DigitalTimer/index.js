import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    minutes: 25,
    second: 0,
    isTimeRunning: false,
  }

  componentDidMount() {
    this.timerId = setInterval(this.time, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onClickTimeRun = () => {
    this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
  }

  onClickRest = () => {
    this.setState({minutes: 25, second: 0, isTimeRunning: false})
    clearInterval(this.timerId)
  }

  onDecrement = () => {
    this.setState(prevState => ({minutes: prevState.minutes - 1}))
  }

  onIncrement = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  time = () => {
    const {minutes, second, isTimeRunning} = this.state

    const remainSecondsCal = minutes * 60 - 1 + second
    const minutesCal = Math.floor(remainSecondsCal / 60)
    const secondsCal = Math.floor(remainSecondsCal % 60)
    const timerCompleted = secondsCal === minutesCal * 60

    if (timerCompleted) {
      this.setState({isTimeRunning: false, second: 0})

      clearInterval(this.timerId)
    }
    if (isTimeRunning === true) {
      this.setState({
        minutes: minutesCal,
        second: secondsCal,
      })
    }
  }

  render() {
    const {minutes, second, isTimeRunning} = this.state
    const playPauseImage = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const palyPauseImageAlt = isTimeRunning ? 'pause icon' : ' play icon'
    const minutesStr = minutes > 9 ? minutes : `0${minutes}`
    const secondsStr = second > 9 ? second : `0${second}`
    return (
      <div className="container">
        <h1 className="card-heading">Digital Timer</h1>
        <div className="flex-container">
          <div className="display-time-card-container">
            <div className="showtime-card-container">
              <h1 className="time-running">
                {minutesStr}:{secondsStr}
              </h1>
              <p className="time-text">
                {isTimeRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="time-control-container">
            <div className="start-rest-button-container">
              <button
                onClick={this.onClickTimeRun}
                className="start-rest-btn"
                type="button"
              >
                <img
                  src={playPauseImage}
                  className="play-pause-image"
                  alt={palyPauseImageAlt}
                />
                {isTimeRunning ? 'Pause' : 'Start'}
              </button>

              <button
                onClick={this.onClickRest}
                type="button"
                className="start-rest-btn"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-pause-image"
                />
                Reset
              </button>
            </div>
            <p className="description">Set Timer limit</p>
            <div className="inc-dec-btn-container">
              <button
                disabled={isTimeRunning}
                onClick={this.onDecrement}
                type="button"
                className="inc-dec-btn"
              >
                -
              </button>
              <p className="time-inc-dec-text">{minutes}</p>
              <button
                disabled={isTimeRunning}
                onClick={this.onIncrement}
                type="button"
                className="inc-dec-btn"
              >
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
