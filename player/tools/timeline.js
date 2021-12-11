class TimeLineEvent {
  time = null
  event = null
  timeout = null
  constructor(time, event, timeout) {
    this.time = time;
    this.event = event;
    this.timeout = timeout;
  }
}
class TimeLine {
  events = [{
    // id: newEventID,
    // time: eventTime,
    // event
  }]
  played = -1
  constructor() { }
  add(eventTime, event, timeout = null) {
    let newEvent = new TimeLineEvent(eventTime, event, timeout)
    if (this.events.length < 1) {
      this.events.push(newEvent)
    } else {
      let p = 0;
      while (this.events[p].time <= eventTime) {
        p++
      }
      this.events.splice(p, 0, newEvent)
    }
  }
  reset(time = 0) {
    this.played = -1
    if (this.events.length < 1) return;
    while (this.played < this.events.length) {
      if (this.events[this.played + 1] < time) this.played++
      else break
    }
  }
  doNext(time) {
    if (this.events.length < 1) return null
    if (this.played < this.events.length) {
      if (time >= this.events[this.played + 1].time) {
        this.played++
        return this.events[this.played].event
      } else if (this.events[this.played + 1].timeout) {
        this.played++
        return () => { this.events[this.played + 1].timeout(time) }
      }
    }
    return null
  }
}
export default TimeLine;