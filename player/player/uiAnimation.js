
class UIAnimation {
  _dom = null
  animate = null
  other = null
  playSpeed = 1
  constructor() { }
  setup(dom, playingData) {
    this._dom = dom
    this.playingData = playingData
    this.animate = {
      combo: {
        playing: null,
        reset: () => {
          let dom = this._dom.combo
          this.animate.combo.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * 0)',
              },
              {
                top: 'calc(var(--padding-top) * 0)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.combo.playing.onFinished = () => {
            this.animate.combo.playing = null
          }
        },
        show: () => {
          let dom = this._dom.combo
          this.animate.combo.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * -0.5)',
              },
              {
                top: 'calc(var(--padding-top) * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.combo.playing.onFinished = () => {
            this.animate.combo.playing = null
          }
        },
        hide: () => {
          let dom = this._dom.combo
          this.animate.combo.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * 0)',
              },
              {
                top: 'calc(var(--padding-top) * -0.5)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.combo.playing.onFinished = () => {
            this.animate.combo.playing = null
          }
        },
      },
      score: {
        playing: null,
        reset: () => {
          let dom = this._dom.score
          this.animate.score.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * 0)',
              },
              {
                top: 'calc(var(--padding-top) * 0)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.score.playing.onFinished = () => {
            this.animate.score.playing = null
          }
        },
        show: () => {
          let dom = this._dom.score
          this.animate.score.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * -0.5)',
              },
              {
                top: 'calc(var(--padding-top) * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.score.playing.onFinished = () => {
            this.animate.score.playing = null
          }
        },
        hide: () => {
          let dom = this._dom.score
          this.animate.score.playing = dom.animate(
            [
              {
                top: 'calc(var(--padding-top) * 0)',
              },
              {
                top: 'calc(var(--padding-top) * -0.5)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.score.playing.onFinished = () => {
            this.animate.score.playing = null
          }
        },
      },
      levelName: {
        playing: null,
        reset: () => {
          let dom = this._dom.level.levelName
          this.animate.levelName.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelName.playing.onFinished = () => {
            this.animate.levelName.playing = null
          }
        },
        show: () => {
          let dom = this._dom.level.levelName
          this.animate.levelName.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * -0.75)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelName.playing.onFinished = () => {
            this.animate.levelName.playing = null
          }
        },
        hide: () => {
          let dom = this._dom.level.levelName
          this.animate.levelName.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * -0.75)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelName.playing.onFinished = () => {
            this.animate.levelName.playing = null
          }
        },
      },
      levelDiff: {
        playing: null,
        reset: () => {
          let dom = this._dom.level.levelDiff
          this.animate.levelDiff.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelDiff.playing.onFinished = () => {
            this.animate.levelDiff.playing = null
          }
        },
        show: () => {
          let dom = this._dom.level.levelDiff
          this.animate.levelDiff.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * -0.75)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelDiff.playing.onFinished = () => {
            this.animate.levelDiff.playing = null
          }
        },
        hide: () => {
          let dom = this._dom.level.levelDiff
          this.animate.levelDiff.playing = dom.animate(
            [
              {
                bottom: 'calc(var(--padding-bottom) * 0)',
              },
              {
                bottom: 'calc(var(--padding-bottom) * -0.75)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.levelDiff.playing.onFinished = () => {
            this.animate.levelDiff.playing = null
          }
        },
      },
      scanline: {
        playing: null,
        reset: () => {
          let dom = this._dom.scanlineBody
          this.animate.scanline.playing = dom.animate(
            [
              {
                width: 'calc(var(--width) * 1)',
              },
              {
                width: 'calc(var(--width) * 1)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.scanline.playing.onFinished = () => {
            this.animate.scanline.playing = null
          }
        },
        show: () => {
          let dom = this._dom.scanlineBody
          this.animate.scanline.playing = dom.animate(
            [
              {
                width: 'calc(var(--width) * 0)',
              },
              {
                width: 'calc(var(--width) * 1)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.scanline.playing.onFinished = () => {
            this.animate.scanline.playing = null
          }
        },
        hide: () => {
          let dom = this._dom.scanlineBody
          this.animate.scanline.playing = dom.animate(
            [
              {
                width: 'calc(var(--width) * 1)',
              },
              {
                width: 'calc(var(--width) * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.scanline.playing.onFinished = () => {
            this.animate.scanline.playing = null
          }
        },
      },
      border: {
        playingTop: {},
        playingBottom: {},
        reset: () => {
          let domTop = this._dom.borders.top
          let domBottom = this._dom.borders.bottom
          this.animate.border.playingTop = domTop.animate(
            [
              {
                width: 'calc(100% * 1)',
              },
              {
                width: 'calc(100% * 1)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingBottom = domBottom.animate(
            [
              {
                width: 'calc(100% * 0)',
              },
              {
                width: 'calc(100% * 1)',
              }
            ], {
            duration: 1,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingTop.onFinished = () => {
            this.animate.border.playingTop = null
          }
          this.animate.border.playingBottom.onFinished = () => {
            this.animate.border.playingBottom = null
          }
        },
        show: () => {
          let domTop = this._dom.borders.top
          let domBottom = this._dom.borders.bottom
          this.animate.border.playingTop = domTop.animate(
            [
              {
                width: 'calc(100% * 0)',
              },
              {
                width: 'calc(100% * 1)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingBottom = domBottom.animate(
            [
              {
                width: 'calc(100% * 0)',
              },
              {
                width: 'calc(100% * 1)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingTop.onFinished = () => {
            this.animate.border.playingTop = null
          }
          this.animate.border.playingBottom.onFinished = () => {
            this.animate.border.playingBottom = null
          }
        },
        hide: () => {
          let domTop = this._dom.borders.top
          let domBottom = this._dom.borders.bottom
          this.animate.border.playingTop = domTop.animate(
            [
              {
                width: 'calc(100% * 1)',
              },
              {
                width: 'calc(100% * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingBottom = domBottom.animate(
            [
              {
                width: 'calc(100% * 1)',
              },
              {
                width: 'calc(100% * 0)',
              }
            ], {
            duration: 800 / this.playingData.playSpeed,
            iterations: 1,
            fill: 'forwards'
          }
          )
          this.animate.border.playingTop.onFinished = () => {
            this.animate.border.playingTop = null
          }
          this.animate.border.playingBottom.onFinished = () => {
            this.animate.border.playingBottom = null
          }
        },
      },
      audioWave: {
        playing: null,
        reset: () => { },
        show: () => { },
        hide: () => { },
      },
      progressBar: {
        playing: null,
        reset: () => { },
        show: () => { },
        hide: () => { },
      },
    }
    this.other = {
      combo: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.combo.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.combo.list.length == 1) {
              let dom = this._dom.combo
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.combo.list.animate = animate
              animate.onfinish = () => {
                this.other.combo.list.splice(0, 1)
                this.other.combo.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.combo.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.combo.list.length == 1) {
              let dom = this._dom.combo
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.combo.list.animate = animate
              animate.onfinish = () => {
                this.other.combo.list.splice(0, 1)
                this.other.combo.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.combo.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.combo.list.length == 1) {
              let dom = this._dom.combo
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.combo.list.animate = animate
              animate.onfinish = () => {
                this.other.combo.list.splice(0, 1)
                this.other.combo.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.combo.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.combo.list.length == 1) {
              let dom = this._dom.combo
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.combo.list.animate = animate
              animate.onfinish = () => {
                this.other.combo.list.splice(0, 1)
                this.other.combo.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.combo.list.length > 0) {
            let nextEvent = this.other.combo.list[0]
            this.other.combo[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      score: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.score.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.score.list.length == 1) {
              let dom = this._dom.score
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.score.list.animate = animate
              animate.onfinish = () => {
                this.other.score.list.splice(0, 1)
                this.other.score.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.score.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.score.list.length == 1) {
              let dom = this._dom.score
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.score.list.animate = animate
              animate.onfinish = () => {
                this.other.score.list.splice(0, 1)
                this.other.score.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.score.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.score.list.length == 1) {
              let dom = this._dom.score
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.score.list.animate = animate
              animate.onfinish = () => {
                this.other.score.list.splice(0, 1)
                this.other.score.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.score.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.score.list.length == 1) {
              let dom = this._dom.score
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.score.list.animate = animate
              animate.onfinish = () => {
                this.other.score.list.splice(0, 1)
                this.other.score.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.score.list.length > 0) {
            let nextEvent = this.other.score.list[0]
            this.other.score[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      levelName: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.levelName.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.levelName.list.length == 1) {
              let dom = this._dom.level.levelName
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelName.list.animate = animate
              animate.onfinish = () => {
                this.other.levelName.list.splice(0, 1)
                this.other.levelName.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.levelName.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.levelName.list.length == 1) {
              let dom = this._dom.level.levelName
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelName.list.animate = animate
              animate.onfinish = () => {
                this.other.levelName.list.splice(0, 1)
                this.other.levelName.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.levelName.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.levelName.list.length == 1) {
              let dom = this._dom.level.levelName
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelName.list.animate = animate
              animate.onfinish = () => {
                this.other.levelName.list.splice(0, 1)
                this.other.levelName.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.levelName.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.levelName.list.length == 1) {
              let dom = this._dom.level.levelName
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelName.list.animate = animate
              animate.onfinish = () => {
                this.other.levelName.list.splice(0, 1)
                this.other.levelName.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.levelName.list.length > 0) {
            let nextEvent = this.other.levelName.list[0]
            this.other.levelName[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      levelDiff: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.levelDiff.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.levelDiff.list.length == 1) {
              let dom = this._dom.level.levelDiff
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelDiff.list.animate = animate
              animate.onfinish = () => {
                this.other.levelDiff.list.splice(0, 1)
                this.other.levelDiff.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.levelDiff.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.levelDiff.list.length == 1) {
              let dom = this._dom.level.levelDiff
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelDiff.list.animate = animate
              animate.onfinish = () => {
                this.other.levelDiff.list.splice(0, 1)
                this.other.levelDiff.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.levelDiff.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.levelDiff.list.length == 1) {
              let dom = this._dom.level.levelDiff
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelDiff.list.animate = animate
              animate.onfinish = () => {
                this.other.levelDiff.list.splice(0, 1)
                this.other.levelDiff.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.levelDiff.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.levelDiff.list.length == 1) {
              let dom = this._dom.level.levelDiff
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.levelDiff.list.animate = animate
              animate.onfinish = () => {
                this.other.levelDiff.list.splice(0, 1)
                this.other.levelDiff.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.levelDiff.list.length > 0) {
            let nextEvent = this.other.levelDiff.list[0]
            this.other.levelDiff[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      scanline: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.scanline.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.scanline.list.length == 1) {
              let dom = this._dom.scanlineBody
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.scanline.list.animate = animate
              animate.onfinish = () => {
                this.other.scanline.list.splice(0, 1)
                this.other.scanline.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.scanline.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.scanline.list.length == 1) {
              let dom = this._dom.scanlineBody
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.scanline.list.animate = animate
              animate.onfinish = () => {
                this.other.scanline.list.splice(0, 1)
                this.other.scanline.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.scanline.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.scanline.list.length == 1) {
              let dom = this._dom.scanlineBody
              let animate = dom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.scanline.list.animate = animate
              animate.onfinish = () => {
                this.other.scanline.list.splice(0, 1)
                this.other.scanline.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.scanline.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.scanline.list.length == 1) {
              let dom = this._dom.scanlineBody
              let animate = dom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.scanline.list.animate = animate
              animate.onfinish = () => {
                this.other.scanline.list.splice(0, 1)
                this.other.scanline.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.scanline.list.length > 0) {
            let nextEvent = this.other.scanline.list[0]
            this.other.scanline[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      border: {
        list: [],
        fade: {
          show: (now = false) => {
            if (!now) {
              this.other.border.list.push({
                mode: 'fade',
                action: 'show'
              })
            }
            if (now || this.other.border.list.length == 1) {
              let domTop = this._dom.borders.top
              let domBottom = this._dom.borders.bottom
              let animateTop = domTop.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              let animateBottom = domBottom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.border.list.animateTop = animateTop
              this.other.border.list.animateBottom = animateBottom
              animateTop.onfinish = () => {
                this.other.border.list.splice(0, 1)
                this.other.border.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.border.list.push({
                mode: 'fade',
                action: 'hide'
              })
            }
            if (now || this.other.border.list.length == 1) {
              let domTop = this._dom.borders.top
              let domBottom = this._dom.borders.bottom
              let animateTop = domTop.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              let animateBottom = domBottom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1250 / this.playingData.playSpeed,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.border.list.animateTop = animateTop
              this.other.border.list.animateBottom = animateBottom
              animateTop.onfinish = () => {
                this.other.border.list.splice(0, 1)
                this.other.border.doNext()
              }
            }
          },
        },
        immediate: {
          show: (now = false) => {
            if (!now) {
              this.other.border.list.push({
                mode: 'immediate',
                action: 'show'
              })
            }
            if (now || this.other.border.list.length == 1) {
              let domTop = this._dom.borders.top
              let domBottom = this._dom.borders.bottom
              let animateTop = domTop.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              let animateBottom = domBottom.animate(
                [
                  {
                    opacity: 1,
                  },
                  {
                    opacity: 1,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.border.list.animateTop = animateTop
              this.other.border.list.animateBottom = animateBottom
              animateTop.onfinish = () => {
                this.other.border.list.splice(0, 1)
                this.other.border.doNext()
              }
            }
          },
          hide: (now = false) => {
            if (!now) {
              this.other.border.list.push({
                mode: 'immediate',
                action: 'hide'
              })
            }
            if (now || this.other.border.list.length == 1) {
              let domTop = this._dom.borders.top
              let domBottom = this._dom.borders.bottom
              let animateTop = domTop.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              let animateBottom = domBottom.animate(
                [
                  {
                    opacity: 0,
                  },
                  {
                    opacity: 0,
                  }
                ], {
                duration: 1,
                iterations: 1,
                fill: 'forwards'
              }
              )
              this.other.border.list.animateTop = animateTop
              this.other.border.list.animateBottom = animateBottom
              animateTop.onfinish = () => {
                this.other.border.list.splice(0, 1)
                this.other.border.doNext()
              }
            }
          },
        },
        doNext: () => {
          if (this.other.border.list.length > 0) {
            let nextEvent = this.other.border.list[0]
            this.other.border[nextEvent.mode][nextEvent.action](true)
          }
        }
      },
      audioWave: {
        list: [],
        fade: {
          show: (now = false) => { },
          hide: (now = false) => { },
        },
        immediate: {
          show: (now = false) => { },
          hide: (now = false) => { },
        },
        doNext: () => { }
      },
      progressBar: {
        list: [],
        fade: {
          show: (now = false) => { },
          hide: (now = false) => { },
        },
        immediate: {
          show: (now = false) => { },
          hide: (now = false) => { },
        },
        doNext: () => { }
      },
    }
  }
  cleanAll = () => {
    for (let key in this.other) {
      this.other[key].list = []
    }
  }
  setAll = (config = {}, defaultHide = false) => {
    this.cleanAll()
    for (let key in this.other) {
      if (config[key] == null) {
        config[key] = (!defaultHide)
      }
      if (config[key]) {
        this.other[key].immediate.show()
      } else {
        this.other[key].immediate.hide()
      }
    }
    for (let key in this.animate) {
      if (config[key] == null) {
        config[key] = (!defaultHide)
      }
      if (config[key]) {
        this.animate[key].reset()
      } else {
        this.animate[key].reset()
      }
    }
  }
  pauseAll = () => {
    for (let key in this.other) {
      if (this.other[key].list.length >= 1) {
        let animate = this.other[key].list[0].animate
        if (animate && animate.playState != "finished") {
          // console.log('paused fade', key)
          animate.pause()
        }
      }
    }
    for (let key in this.animate) {
      let animate = this.animate[key].playing
      if (animate && animate.playState != "finished") {
        animate.pause()
      } else {
        let animateTop = this.animate[key].playingTop
        let animateBottom = this.animate[key].playingBottom
        if (animateTop && animateBottom && !animateTop.finished) {
          animateTop.pause()
          animateBottom.pause()
        }
      }
    }
  }
  continueAll = () => {
    for (let key in this.other) {
      if (this.other[key].list.length >= 1) {
        let animate = this.other[key].list[0].animate
        if (animate && animate.playState != "finished") {
          animate.play()
        }
      }
    }
    for (let key in this.animate) {
      let animate = this.animate[key].playing
      if (animate && animate.playState != "finished") {
        // console.log(animate)
        animate.play()
      } else {
        let animateTop = this.animate[key].playingTop
        let animateBottom = this.animate[key].playingBottom
        if (animateTop && animateBottom && !animateTop.finished) {
          animateTop.play()
          animateBottom.play()
        }
      }
    }
  }
}
export default UIAnimation;