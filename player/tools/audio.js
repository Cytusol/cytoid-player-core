class Audio {
  audioBuffer;
  audioCtx = new AudioContext();
  length = 0;
  _timeAnchor = 0;
  _playSpeed = 1;
  _playStart = 0;
  _playingSource;
  _playingAuidoBuffer;
  _state = 'noAudio';
  constructor() { }
  setup(audioBlob) {
    let fileReader = new FileReader()
    fileReader.onload = (event) => {
      let arrayBuffer = event.target.result
      // this.audioCtx = new AudioContext()
      this.audioCtx.decodeAudioData(arrayBuffer, (audioBuffer) => {
        this.audioBuffer = audioBuffer
        this._state = 'loaded'

        this.length = this.audioBuffer.duration;
      })
    }
    fileReader.readAsArrayBuffer(audioBlob)
  }
  jump(time = 0, speed = 1) {
    if (this._state == 'noAudio') return null
    if (this._playingSource) this._playingSource.stop()

    this._playSpeed = speed

    this._playingSource = this.audioCtx.createBufferSource()
    this._playingSource.buffer = this.audioBuffer;
    this._playingSource.playbackRate.value = this._playSpeed;
    this._playingSource.connect(this.audioCtx.destination)
    this._state = 'playing'
    this._timeAnchor = this._playingSource.context.currentTime - time

    this._playStart = time
  }
  play(time = 0, speed = 1) {
    this.jump(time, speed)
    this._playingSource.start(this._playingSource.context.currentTime + Math.max(-time, 0), Math.max(time, 0))
    // console.log(this._playingSource.context.currentTime + Math.max(-time, 0), Math.max(time, 0))
    // console.log(time)
  }
  contiune() {
    if (this._state == 'noAudio') return null
    if (this._state != 'paused') this.play(time = 0)
    this.play(this._timeAnchor)
  }
  pause() {
    if (this._state != 'playing') return null
    this._timeAnchor = this.currentTime
    this.stop()
    this._state = 'paused'
  }
  stop() {
    if (this._playingSource) this._playingSource.stop()
    this._playingSource = null
    this._state = 'loaded'
  }
  get state() {
    return this._state;
  }
  get currentTime() {
    let runningTime = this._playingSource.context.currentTime - this._timeAnchor;
    // return (runningTime - this._playStart) * this._playSpeed + this._playStart
    return runningTime * this._playSpeed + this._playStart * (1 - this._playSpeed)
  }
}
export default Audio;