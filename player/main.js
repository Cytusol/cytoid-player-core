import './note/note.css'

var devlog = (false && window.location.hostname == "localhost" ? console.log : (() => { return }))

import Audio from './tools/audio'
import TimeLine from './tools/timeline'
import UIAnimation from './player/uiAnimation'
import PlayerDom from './player/dom'
// console.log(new PlayerDom(document.createElement('div')))

class PlayerConfig {

}
class PlayerData {
  playSpeed = null;

  combo = 0;
  score = 0;

  pointers = {
    page: 0,
    note: 0,
    event: 0,
    tempo: 0
  };

  existDargLine = [];
  audioFixedTimes = 0;
  LastAudioFixedTime = -10000;
}

class Player {
  chart;
  timeAnchor = null;
  time;
  deviceOffset = 0;
  playState = null;
  id = Math.round(Math.random())
  onFinished = null;
  playingData = new PlayerData
  timeline = new TimeLine
  animations = new UIAnimation
  audio = new Audio
  dom = new PlayerDom(document.getElementById('player-box'))
  constructor(inputChart, audioBlob, background = null, data = {}, playerSetting = {}) {
    this.setSizeAuto()

    // setup self compoments
    this.animations.setup(this.dom, this.playingData)

    if (playerSetting.deviceOffset) {
      this.deviceOffset = playerSetting.deviceOffset * 1000;
    }

    if (playerSetting.playSpeed) {
      this.playingData.playSpeed = playerSetting.playSpeed;
    } else {
      this.playingData.playSpeed = 1;
    }

    console.log("Speed:", this.playingData.playSpeed)
    console.log("offset:", this.deviceOffset)

    this.chart = inputChart
    // this.initAudio(audioBlob)
    this.audio.setup(audioBlob)
    this.initChart()

    this.dom.background.style.backgroundImage = 'url(' + URL.createObjectURL(background) + ')'

    this.dom.level.box.classList.add(data.difficultyType || "extreme")

    data = Object.assign({
      difficultyType: 'extreme',
      difficultyName: data.difficultyType,
      difficultyLevel: 0,
      levelName: 'LevelName'
    }, data)
    if (!data.difficultyType) data.difficultyType = 'extreme'
    this.dom.level.box.style.display = ''
    this.dom.level.box.classList.add(data.difficultyType)
    this.dom.level.difficultyName.innerText = data.difficultyName || data.difficultyType
    this.dom.level.difficultyLevel.innerText = data.difficultyLevel
    this.dom.level.levelName.innerText = data.levelName

    // this.dom.player.onclick = ()=>{this.switch()}

    devlog(this.chart)
    this.dom.playerBox.style.display = 'block'

    this.animations.animate.combo.show()
    this.animations.animate.score.show()
    this.animations.animate.border.show()
    this.animations.animate.levelName.show()
    this.animations.animate.levelDiff.show()
    window.requestAnimationFrame((timestamp) => { this.updateLoop(timestamp) })

    // Setup Dom
    this.dom.player.onclick = () => {
      this.start()
      this.dom.player.onclick = null
    }
    this.dom.pause.onclick = () => {
      this.switch()
      this.dom.player.onclick = null
    }

  }
  jump(startTime = 0, speed = 0) {
    this.dom.player.classList.remove("playing")
    this.dom.player.classList.add("pause")

    this.playState = "jumping"
    this.id++
    this.time = startTime
    this.timeAnchor = null
    this.timeline.reset()
    this.resetDom()
    // point to the playing page
    // this.dom.audio.pause()
    this.audio.stop()
    this.playingData.pointers.tempo = 0
    this.playingData.pointers.page = 0
    // play Speed
    if (speed > 0) {
      this.playingData.playSpeed = speed;
      this.dom.playerBox.style.setProperty('--playspeed', this.playingData.playSpeed)
    } else if (this.playingData.playSpeed > 0) {
      this.dom.playerBox.style.setProperty('--playspeed', this.playingData.playSpeed)
    } else {
      this.playingData.playSpeed = 1;
      this.dom.playerBox.style.setProperty('--playspeed', this.playingData.playSpeed)
    }
    this.playState = "pause"
  }
  start(startTime = 0, speed = 0) {
    this.jump(startTime, speed)

    this.playState = "playing"

    this.dom.player.classList.remove("pause")
    this.dom.player.classList.add("playing")

    this.animations.continueAll()

    // this.dom.audio.play()
    this.audio.play((this.time + this.deviceOffset) / 1000 - this.chart.music_offset, this.playingData.playSpeed)
  }
  pause(isEnd = false) {
    if (!this.playState) return
    this.playState = "pause"
    this.dom.player.classList.remove("playing")
    this.dom.player.classList.add("pause")

    if (!isEnd) {
      // this.dom.audio.pause()
      this.audio.stop()
      this.animations.pauseAll()
    } else {
      this.playState = null
      this.audio.stop()
      // end anime
      this.animations.animate.combo.hide()
      this.animations.animate.score.hide()
      this.animations.animate.border.hide()
      this.animations.animate.levelName.hide()
      this.animations.animate.levelDiff.hide()
      if (this.onFinished) {
        this.onFinished()
      }
    }
  }
  contiune() {
    if (!this.playState) this.start()
    else this.start(this.time, this.playingData.playSpeed)
  }
  switch() {
    if (!this.playState || this.playState == "pause") this.contiune()
    else this.pause()
  }
  updateLoop(timestamp, pauseNextFrame = false) {
    if (!this.timeAnchor) {
      this.timeAnchor = timestamp - this.time / this.playingData.playSpeed
    }
    switch (this.playState) {
      case "jumping":
        this.playState = "pause"
      case "playing":
        let frameTime = Math.max((timestamp - this.timeAnchor) - this.time / this.playingData.playSpeed, 16.67)

        this.time = (timestamp - this.timeAnchor) * this.playingData.playSpeed;

        if (this.playingData.pointers.page >= this.chart.page_list.length) {
          this.pause(true)
          break
        }

        // Ticker
        this.tick = (() => {
          // return this.timeToTick(this.time/1000)
          while (
            (this.playingData.pointers.tempo + 1) < this.chart.tempo_list.length &&
            this.time / 1000 >= this.chart.tempo_list[this.playingData.pointers.tempo + 1].time
          ) {
            this.playingData.pointers.tempo++
          }
          let tempo = this.chart.tempo_list[this.playingData.pointers.tempo].value
          let startTick = this.chart.tempo_list[this.playingData.pointers.tempo].tick
          let relativeTime = this.time / 1000 - this.chart.tempo_list[this.playingData.pointers.tempo].time
          return startTick + relativeTime / (tempo / 1000000 / this.chart.time_base)
        })();

        // Scanline
        (() => {
          while (this.tick > this.chart.page_list[this.playingData.pointers.page].end_tick) {
            this.playingData.pointers.page++
            if (!this.chart.page_list[this.playingData.pointers.page]) {
              // this.playingData.pointers.page = this.chart.page_list.length - 1
              return
            }
          }
          let page = this.chart.page_list[this.playingData.pointers.page]
          let orginY = (this.tick - page.start_tick) / page.length
          if (page.scan_line_direction < 0) orginY = 1 - orginY
          let y = orginY * (page.position.top - page.position.bottom) + page.position.bottom
          y = Math.min(Math.max(y, 0), 1)

          this.dom.scanlinePosition.style.bottom = 100 * y + '%'
        })();

        // Opera
        let nextEvent = this.timeline.doNext(this.time)
        while (nextEvent !== null) {
          nextEvent()
          nextEvent = this.timeline.doNext(this.time)
        }

        // Drag Line
        (() => {
          let ctx = this.dom.dragBox.getContext('2d')
          let width = this.dom.dragBox.width
          let height = this.dom.dragBox.height
          let lineWidth = height / 35
          ctx.clearRect(0, 0, width, height)

          ctx.strokeStyle = 'white'
          ctx.setLineDash([lineWidth / 2, lineWidth / 2]);
          ctx.lineWidth = lineWidth;

          for (let lineData of this.playingData.existDargLine) {
            let position = lineData.position
            let timeline = lineData.timeline

            let progressIn = 1
            let progressOut = 0
            if (timeline.in.length > frameTime / 2000) {
              progressIn = Math.min((this.time / 1000 - timeline.in.start) / timeline.in.length, 1)
            }
            if (timeline.out.length > frameTime / 2000) {
              progressOut = Math.min((timeline.out.end - this.time / 1000) / timeline.out.length, 1)
            }

            let x1 = width * position.x1
            let y1 = height * Math.abs(1 - position.y1)
            let x2 = width * position.x2
            let y2 = height * Math.abs(1 - position.y2)

            ctx.lineDashOffset = -progressOut * Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
            ctx.beginPath()
            ctx.moveTo((x2 - (x2 - x1) * progressOut), (y2 - (y2 - y1) * progressOut))
            ctx.lineTo((x1 + (x2 - x1) * progressIn), (y1 + (y2 - y1) * progressIn))
            ctx.stroke()
          }
        })();

        // audio
        if (this.playState == "playing") {
          (() => {
            let audioOffset = (this.audio.currentTime + this.chart.music_offset) * 1000 - this.time - this.deviceOffset
            // console.log(this.audio.currentTime + this.chart.music_offset, this.time / 1000, audioOffset)
            if (Math.abs(audioOffset) > frameTime / 2 * Math.round(1 + this.playingData.audioFixedTimes / 5)) {
              if (this.playingData.audioFixedTimes < 20 && (this.time - this.playingData.LastAudioFixedTime) > 500 * this.playingData.audioFixedTimes) {
                this.audio.play((this.time + this.deviceOffset) / 1000 - this.chart.music_offset, this.playingData.playSpeed)
                this.playingData.LastAudioFixedTime = this.time
                this.playingData.audioFixedTimes++
              } else if (audioOffset > 500) {
                this.audio.play((this.time + this.deviceOffset) / 1000 - this.chart.music_offset, this.playingData.playSpeed)
              }
            }
            let debugData = ('Offset Fixed: ' + this.playingData.audioFixedTimes + ' time(s), '
              + 'fps: ' + Math.round(1000 / frameTime) + ', '
              + 'Offset: ' + (Math.abs(audioOffset) < 10 ? '< ±10' : Math.round(audioOffset)) + 'ms ')
            // if (document.getElementById('debug-data').innerText != debugData) document.getElementById('debug-data').innerText = debugData
          })()
        }
        break;
      case "pause":
      case "skip":
        this.timeAnchor = timestamp - this.time
        break;
      default:
        break;
    }
    if (this.dom.combo.innerText != this.playingData.combo) {
      this.playingData.score = ((() => {
        let score = 0
        let N = this.chart.note_list.length
        for (let i = 1; i <= this.playingData.combo; i++) {
          score += 900000 / N * 1 + 200000 / N / (N + 1) * i
        }
        return String(Math.round(score)).padStart(7, "0");
      })())

      this.dom.score.innerText = this.playingData.score
      this.dom.combo.innerText = this.playingData.combo
      this.dom.combo.classList.remove("combo-animation")
    } else {
      this.dom.combo.classList.add("combo-animation")
    }

    window.requestAnimationFrame((timestamp) => { this.updateLoop(timestamp) })
  }
  // initAudio(audioBlob) {
  //   this.dom.audio.src = URL.createObjectURL(audioBlob)
  // }
  initChart() {

    let getFadeInTime = (note) => {
      const basicTime = 1.367
      let tick = note.tick
      let ar = note.approach_rate ? note.approach_rate : 1
      let page = chart.page_list[note.page_index];
      let prevPage = chart.page_list[note.page_index - 1] ? chart.page_list[note.page_index - 1] : null
      let prevPrevPageEnd = chart.page_list[note.page_index - 2] ? chart.page_list[note.page_index - 2].end_tick : 0
      if (!prevPage || (ar && ar === 0)) {
        return 0
      }

      let pageRatio = (tick - prevPage.end_tick) / (page.end_tick - prevPage.end_tick)

      let tempo = (this.tickToTime(page.end_tick) - this.tickToTime(prevPage.end_tick)) * pageRatio +
        (this.tickToTime(prevPage.end_tick) - this.tickToTime(prevPrevPageEnd)) * (basicTime - pageRatio)

      let speed = tempo >= basicTime ? 1 : basicTime / tempo;
      speed *= ar;
      return ((() => {
        // is drag? 
        return ([3, 4, 6, 7].indexOf(note.type) > -1)
      }) ? 1.175 / speed : basicTime / speed);
    }

    let chart = this.chart
    // music_offset
    if (!chart.music_offset) chart.music_offset = 0
    // tick to time pre load
    for (let tempo_p in chart.tempo_list) {
      if (tempo_p == 0) {
        chart.tempo_list[tempo_p].time = 0
      } else {
        chart.tempo_list[tempo_p].time =
          chart.tempo_list[tempo_p - 1].time +
          (chart.tempo_list[tempo_p].tick - chart.tempo_list[tempo_p - 1].tick) *
          (chart.tempo_list[tempo_p - 1].value / 1000000 / chart.time_base)
      }
    }

    // load page data
    for (let page of chart.page_list) {
      page.time = {
        start: this.tickToTime(page.start_tick),
        end: this.tickToTime(page.end_tick)
      }
      page.length = page.end_tick - page.start_tick
      page.time.length = page.time.end - page.time.start
      page.position = {
        top: 1,
        bottom: 0,
        length: 1,
      }
      if (page.PositionFunction && page.PositionFunction.Type == 0) {
        let scale = page.PositionFunction.Arguments[0]
        let offset = page.PositionFunction.Arguments[1]
        page.position = {
          top: (1 + offset) / 2 + scale / 2,
          bottom: (1 + offset) / 2 - scale / 2,
        }
        page.position.length = page.position.top - page.position.bottom
      }
    }

    // load note data
    for (let note of chart.note_list) {
      note.data = ((() => {
        let page = chart.page_list[note.page_index]

        let type = this.noteTypeList[note.type]

        let name = type + ([0, 1, 5, 6, 7].indexOf(note.type) < 0 ? '' : '_' +
          (page.scan_line_direction > 0 ? 'up' : 'down'))
        // let name = type + '_' +(
        //   page.scan_line_direction > 0 ? 'up' : 'down')

        let position = ((() => {
          let direction = page.scan_line_direction
          let x = note.x
          let orginY = (note.tick - page.start_tick) / (page.end_tick - page.start_tick)
          if (direction < 0) orginY = 1 - orginY
          let y = orginY * (page.position.top - page.position.bottom) + page.position.bottom
          let endY = y
          let fromY = y
          if ([1, 2].indexOf(note.type) > -1) {
            endY = ((() => {
              let holdEndTick = note.tick + note.hold_tick
              for (let page of chart.page_list) {
                if (page.start_tick < holdEndTick && page.end_tick >= holdEndTick) {
                  let ans = (holdEndTick - page.start_tick) / (page.end_tick - page.start_tick)
                  if (page.scan_line_direction == -1) ans = 1 - ans
                  return ans * (page.position.top - page.position.bottom) + page.position.bottom
                }
              }
            })())
          }
          if ([8, 9].indexOf(note.type) >= 0) {
            fromY = 1 - note.NoteDirection
          }

          return {
            x, y, endY, direction, page, fromY
          }
        })())

        let time = this.tickToTime(note.tick)

        let duration = ((() => {
          let fadein = getFadeInTime(note)
          let hold = this.tickToTime(note.tick + note.hold_tick) - time
          if ([8, 9].indexOf(note.type) >= 0) fadein = (page.end_tick - page.start_tick) / chart.time_base / 3
          return { fadein, hold }
        })())

        let timein = time - duration.fadein
        let timeout = time + duration.hold

        let nextDrag = (note.next_id > 0 ? chart.note_list[note.next_id] : null)

        if (nextDrag != null) nextDrag.prevDrag = note

        return { type, name, position, time, timein, timeout, duration, nextDrag }
      })())
    }


    // load note dom
    for (let note of chart.note_list) {
      note.dom = ((() => {
        let positionDom = document.createElement('div')
        let bodyDom = document.createElement('div')
        let bodyingDom = document.createElement('div')
        let ringDom = document.createElement('div')
        let ringDomside = document.createElement('div')

        ringDom.innerHTML = `
            <div class="section section_left">
              <div class="box box_left">
                <div class="circle circle_left"></div>
              </div>
            </div>
            <div class="section section_right">
              <div class="box box_right">
                <div class="circle circle_right"></div>
              </div>
            </div>`
        ringDomside.innerHTML = ringDom.innerHTML

        positionDom.className = "note position-" + note.data.name
        bodyDom.className = "debug-body body-" + note.data.name
        bodyingDom.className = "bodying-" + note.data.name
        ringDomside.className = "ring ring-side"
        ringDom.className = "ring ring-" + note.data.name

        positionDom.style.setProperty('--fadein-time', note.data.duration.fadein + 's')
        positionDom.style.setProperty('--hold-time', note.data.duration.hold + 's')
        positionDom.style.setProperty('--hold-length', Math.abs(note.data.position.endY - note.data.position.y))

        positionDom.style.setProperty('--x', note.data.position.x)
        positionDom.style.setProperty('--y', note.data.position.y)
        positionDom.style.setProperty('--from-y', note.data.position.fromY)

        positionDom.appendChild(bodyingDom)
        positionDom.appendChild(bodyDom)
        if ([1, 2].indexOf(note.type) >= 0) {
          positionDom.appendChild(ringDomside)
          positionDom.appendChild(ringDom)
        }

        return positionDom
      })())

      note.bloomDom = ((() => {
        let positionDom = document.createElement('div')
        let bodyDom = document.createElement('div')
        let perfectDom = document.createElement('div')
        let name = ((() => {
          if (note.data.type == "click") return "click"
          if (note.data.type == "flick") return "flick"
          return "other"
        })())
        let time = 0.4

        positionDom.style.setProperty('--fadein-time', time + 's')

        positionDom.style.setProperty('--x', note.data.position.x)
        positionDom.style.setProperty('--y', note.data.position.endY)

        if ([4, 7].indexOf(note.type) >= 0) {
          positionDom.style.setProperty('transform', 'scale(.75)')
        }

        positionDom.className = "note note-bloom position-bloom_" + name
        bodyDom.className = "debug-body body-bloom_" + name
        perfectDom.className = "body-perfect"
        positionDom.appendChild(bodyDom)
        positionDom.appendChild(perfectDom)
        return positionDom
      })())

      if ([1, 2].indexOf(note.type) >= 0) {
        note.holdLineDom = ((() => {
          let positionDom = document.createElement('div')
          let bodyDom = document.createElement('div')
          let bodyColorDom = document.createElement('div')
          let name = note.data.name

          positionDom.style.setProperty('--fadein-time', note.data.duration.fadein + 's')
          positionDom.style.setProperty('--hold-time', note.data.duration.hold + 's')
          positionDom.style.setProperty('--hold-length', Math.abs(note.data.position.endY - note.data.position.y))

          positionDom.style.setProperty('--x', note.data.position.x)
          positionDom.style.setProperty('--y', note.data.position.y)

          positionDom.className = "note position-line_" + name
          bodyDom.className = "debug-body body-line_" + name
          bodyColorDom.className = "debug-body body-line-color_" + name
          positionDom.appendChild(bodyDom)
          bodyDom.appendChild(bodyColorDom)
          return positionDom
        })())
      }

      if ([3, 4, 6, 7].indexOf(note.type) >= 0) {
        note.dragLineData = ((() => {
          if (note.next_id <= 0) return null;
          let next = chart.note_list[note.next_id]
          let x1 = note.data.position.x
          let x2 = next.data.position.x
          let y1 = note.data.position.y
          let y2 = next.data.position.y

          let timeline = {
            in: {
              start: note.data.timein,
              end: next.data.timein,
              length: next.data.timein - note.data.timein
            },
            out: {
              start: note.data.time,
              end: next.data.time,
              length: next.data.time - note.data.time
            }
          }
          let position = {
            x1, x2, y1, y2
          }
          return { timeline, position }
        })())
        note.dragHeadDom = ((() => {
          if (note.next_id <= 0) return null;
          let next = chart.note_list[note.next_id]

          let positionDom = document.createElement('div')
          let bodyDom = document.createElement('div')

          positionDom.style.setProperty('--fadein-time', (next.data.timein - note.data.timein) + 's')
          positionDom.style.setProperty('--draging-time', (next.data.time - note.data.time) + 's')

          positionDom.style.setProperty('--x', note.data.position.x)
          positionDom.style.setProperty('--y', note.data.position.y)
          positionDom.style.setProperty('--end-x', next.data.position.x)
          positionDom.style.setProperty('--end-y', next.data.position.y)

          positionDom.className = "position-drag-head"
          if ([3, 4].indexOf(note.type) >= 0) {
            bodyDom.className = "body-drag-head"
          } else {
            bodyDom.className = "body-cdrag-head-" + ((() => {
              let prevDrag = note
              while (prevDrag.prevDrag != null) {
                prevDrag = prevDrag.prevDrag
              }
              return (prevDrag.data.position.direction > 0 ? 'up' : 'down')
            })())
          }

          positionDom.appendChild(bodyDom)
          return positionDom
        })())
      } else {
        note.dragLineData = null
      }

      // opera
      // note init
      this.timeline.add((note.data.timein) * 1000, () => {
        note.dom.classList.remove("holding")
        this.dom.noteBox.insertBefore(note.dom, this.dom.noteBox.firstChild)
        if (this.time - note.data.timein * 1000 > 50) {
          note.dom.style.setProperty('--delay-time', (note.data.timein - this.time / 1000) + 's')
        }
      })
      // note start fadein
      let noteStartFadein = (note.data.time - note.data.duration.fadein)
      this.timeline.add(noteStartFadein * 1000, () => {
        if ([1, 2].indexOf(note.type) >= 0) {
          this.dom.noteEffectBox.insertBefore(note.holdLineDom, this.dom.noteEffectBox.firstChild)
          note.holdLineDom.style.setProperty('--delay-time', (noteStartFadein - this.time / 1000) + 's')
        }
        if (note.dragLineData != null) {
          this.playingData.existDargLine.push(note.dragLineData)
        }
        note.dom.style.setProperty('--delay-time', (noteStartFadein - this.time / 1000) + 's')
        devlog("fadein", note.id)
      })
      // note time
      this.timeline.add((note.data.time) * 1000, () => {
        if ([3, 4, 6, 7].indexOf(note.type) >= 0 && note.dragHeadDom != null) {
          this.dom.noteBox.insertBefore(note.dragHeadDom, this.dom.noteBox.firstChild)
          note.dragHeadDom.style.setProperty('--delay-time', (note.data.time - this.time / 1000) + 's')
        }
        devlog("note", note.id)
      })
      // note bloom
      this.timeline.add((note.data.timeout) * 1000, () => {
        this.playingData.combo++
        if (this.time - note.data.timeout * 1000 < 50) {
          this.dom.noteBox.insertBefore(note.bloomDom, this.dom.noteBox.firstChild)
        }
        devlog("bloom", note.id)
        note.dom.remove()
      })
      this.timeline.add((note.data.timeout + 0.8) * 1000, () => {
        note.bloomDom.remove()
      })

      // hold
      if ([1, 2].indexOf(note.type) >= 0) {
        // hold start time
        this.timeline.add((note.data.time) * 1000, () => {
          if (this.time - note.data.time * 1000 > 50) {
            note.holdLineDom.style.setProperty('--delay-time', (note.data.time - this.time / 1000 - note.data.duration.fadein) + 's')
          }
          note.dom.style.setProperty('--delay-time', (noteStartFadein - this.time / 1000) + 's')
          // note.dom.style.setProperty('--ring-delay-time', (note.data.time - this.time / 1000)+'s')
          note.dom.style.setProperty('--ring-delay-ratio', (note.data.time - this.time / 1000) / note.data.duration.hold)
          note.dom.classList.add("holding")
          devlog("hold_start", note.id)
        })
        // hold end time
        this.timeline.add((note.data.time + note.data.duration.hold) * 1000, () => {
          note.holdLineDom.remove()
          devlog("hold_end", note.id)
        })
      }
      // drag
      if ([3, 4, 6, 7].indexOf(note.type) >= 0) {
        if (note.dragHeadDom != null) {
          let next = chart.note_list[note.next_id]
          this.timeline.add((next.data.time) * 1000, () => {
            note.dragHeadDom.remove()
          })
        }
        if (note.dragLineData != null) {
          this.timeline.add((note.dragLineData.timeline.out.end) * 1000, () => {
            for (let i in this.playingData.existDargLine) {
              if (this.playingData.existDargLine[i] == note.dragLineData) {
                this.playingData.existDargLine.splice(i, 1)
                break
              }
            }
          })
        }
      }
    }
    chart.note_list.sort((a, b) => {
      const f = -1
      if (a.tick > b.tick) {
        return -f
      } else if (a.tick < b.tick) {
        return f
      } else if (a.id > b.id) {
        return -f
      } else if (a.id < b.id) {
        return f
      } else {
        return 0
      }
    })
    this.timeline.add(chart.note_list[chart.note_list.length - 1].data.timeout * 1000, () => {
      this.animations.animate.scanline.hide()
    })

    // load Chart Events
    // 
    this.timeline.add(0, () => {
      this.playingData.combo = 0
      this.animations.setAll({}, (chart.is_start_without_ui && chart.is_start_without_ui == true))
      if (this.time <= 0)
        this.animations.animate.scanline.show();
    })
    chart.textEvents = []
    chart.event_order_list.sort((a, b) => {
      const f = -1
      if (a.tick > b.tick) {
        return -f
      } else if (a.tick < b.tick) {
        return f
      } else {
        return 0
      }
    })
    for (let events of chart.event_order_list) {
      let tick = events.tick
      let time = this.tickToTime(tick)
      let domName = [
        'combo',
        'score',
        'levelName',
        'levelDiff',
        'scanline',
        'border',
        'audioWave',
        'progressBar'
      ]
      for (let event of events.event_list) {
        switch (event.type) {
          case 0:
          case 1:
          case 8:
            let args = event.args
            let color = ''
            let text = ''
            switch (event.type) {
              case 0:
                text = 'SPEED UP'
                color = '#D25669'
                break;
              case 1:
                text = 'SLOW DOWN'
                color = '#A0C8Bf'
                break;
              case 8:
                text = args.split(',', 2)[0]
                color = args.split(',', 2)[1] || '#FFFFFF'
                break;
              default:
                break;
            }
            chart.textEvents.push({
              tick, time,
              color, text
            })
            let eventID = time + color
            this.timeline.add(time * 1000, () => {
              let newContext = document.createElement('div')
              newContext.id = 'event-text-content'
              newContext.innerText = text

              this.dom.textEventBox.style.setProperty('--text-color', color)
              this.dom.textEventBox.style.setProperty('--delay-time', (time - this.time / 1000) + 's')
              this.dom.textEventBox.replaceChildren(newContext)

              this.dom.scanlineBody.style.setProperty('--scanline-color', color)
              this.dom.scanlineBody.setAttribute('eventid', eventID)
            })
            this.timeline.add((time + 4) * 1000, () => {
              if (this.dom.scanlineBody.getAttribute('eventid') == eventID) {
                this.dom.scanlineBody.style.setProperty('--scanline-color', 'white')
                this.dom.scanlineBody.removeAttribute('eventid')
              }
            })
            break;
          case 2:
            // immediate out
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.other[domName[arg]].immediate.show()
              })
            }
            break;
          case 3:
            // immediate in
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.other[domName[arg]].immediate.hide()
              })
            }
            break;
          case 4:
            // fade out
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.other[domName[arg]].fade.show()
              })
            }
            break;
          case 5:
            //fade in
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.other[domName[arg]].fade.hide()
              })
            }
            break;
          case 6:
            //animation in
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.animate[domName[arg]].show()
              })
            }
            break;
          case 7:
            //animation out
            for (let arg of event.args.split(',')) {
              this.timeline.add((time) * 1000, () => {
                this.animations.animate[domName[arg]].hide()
              })
            }
            break;
          default:
            break;
        }
      }
    }
  }
  resetDom(startTime) {
    let oldPlayState = this.playState
    this.playState = "skip"
    let chart = this.chart;
    // UI
    ((() => {
      this.animations.cleanAll()
      for (let events of chart.event_order_list) {
        let tick = events.tick
        let time = this.tickToTime(tick)
        let domName = [
          'combo',
          'score',
          'levelName',
          'levelDiff',
          'scanline',
          'border',
          'audioWave',
          'progressBar'
        ]
        for (let event of events.event_list) {
          if (startTime > time) {
            switch (event.type) {
              case 4:
              case 2:
                // immediate out
                for (let arg of event.args.split(',')) {
                  this.timeline.add((time) * 1000, () => {
                    this.animations.other[domName[arg]].immediate.show()
                  })
                }
                break;
              case 3:
              case 5:
                // immediate in
                for (let arg of event.args.split(',')) {
                  this.timeline.add((time) * 1000, () => {
                    this.animations.other[domName[arg]].immediate.hide()
                  })
                }
                break;
              default:
                break;
            }
          } else {
            break;
          }
        }
      }
    })());

    // Note Box
    ((() => {
      this.playingData.existDargLine = []
      this.dom.noteEffectBox.innerHTML = ''
      let savedDom = {
        // borders: this.dom.borders.box,
        preload: this.dom.notePreloader,
        scanline: this.dom.scanlinePosition,
      }
      this.dom.noteBox.innerHTML = ''
      // this.dom.noteBox.appendChild(savedDom.borders)
      this.dom.noteBox.appendChild(savedDom.preload)
      this.dom.noteBox.appendChild(savedDom.scanline)
    })());
    this.playState = oldPlayState
  }
  tickToTime(tick) {
    let tempo = 0, time = 0, relativeTick = 0
    for (let tempo_p in this.chart.tempo_list) {
      if (tick < this.chart.tempo_list[tempo_p].tick) {
        break
      }
      else {
        tempo = this.chart.tempo_list[tempo_p].value
        time = this.chart.tempo_list[tempo_p].time
        relativeTick = tick - this.chart.tempo_list[tempo_p].tick
      }
    }
    return time + relativeTick * tempo / 1000000 / this.chart.time_base
  }
  timeToTick(time) {
    let tempo = 0, tick = 0, relativeTime = 0
    for (let tempo_p in this.chart.tempo_list) {
      if (time < this.chart.tempo_list[tempo_p].time) {
        return tick + relativeTime / (tempo / 1000000 / this.chart.time_base)
      } else {
        tempo = this.chart.tempo_list[tempo_p].value
        tick = this.chart.tempo_list[tempo_p].tick
        relativeTime = time - this.chart.tempo_list[tempo_p].time
      }
    }
    return tick + relativeTime / (tempo / 1000000 / this.chart.time_base)
  }
  noteTypeList = [
    "click",
    "hold",
    "long_hold",
    "drag",
    "drag_child",
    "flick",
    "click",
    "cdrag_child",
    "drop_click",
    "drop_drag"
  ]
  setSize(width, height) {
    if (width / height < 4 / 3) {
      height = width / 4 * 3
    } else if (width / height > 22 / 9) {
      width = height / 9 * 22
    }
    this.dom.player.style = '--playerWidth: ' + width + 'px;' + '--playerRatio: ' + width / height + ';';
    this.dom.dragBox.height = this.dom.noteBox.offsetHeight
    this.dom.dragBox.width = this.dom.noteBox.offsetWidth
  }
  setSizeAuto() {
    let width = this.dom.playerBox.offsetWidth
    let height = this.dom.playerBox.offsetHeight
    this.setSize(width, height)
  }
}

export default Player