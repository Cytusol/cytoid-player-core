import './style.css'

import CytoidPlayer from './player/main'

var player = {};
var origin = null;
window.onload = () => {

  if (self != top) {
    document.getElementById('loading-dim').innerText = "Waiting..."
    window.addEventListener('message',(event) => {
      document.getElementById('loading-dim').innerText = "Loading..."
      if(event.data.type =='leveldata'){
        origin = event.origin
        // console.log(event)
        let levelData = event.data.context
        // console.log(levelData)
        player = new CytoidPlayer(
          levelData.chart,
          levelData.audio,
          levelData.background,
          levelData.info,
          levelData.player,
        )
        console.log(levelData.player.colorReg)
        if (levelData.player.colorReg) {
          let colorDom = document.createElement("style")
          for (let note in levelData.player.colorReg) {
            for(let key in levelData.player.colorReg[note]) {
              let deg = levelData.player.colorReg[note][key]
              colorDom.innerHTML += `.note.position-${note}_${key}{filter:hue-rotate(${deg}deg);}\n`
              if (note == 'hold') {
                colorDom.innerHTML += `.note.position-line_${note}_${key}{filter:hue-rotate(${deg}deg);}\n`
              } else if (note == 'click') {
                colorDom.innerHTML += `.body-cdrag-head-${key}{filter:hue-rotate(${deg}deg);}\n`
                colorDom.innerHTML += `.note.position-cdrag_child_${key}{filter:hue-rotate(${deg}deg);}\n`
              }
            }
          }
          console.log(colorDom)
          document.body.appendChild(colorDom)
        }
        
        player.setSizeAuto()
        window.onresize = () => {
          player.setSizeAuto()
          // console.log("auto resized")
        }

        top.postMessage({
          type: "playerState",
          value: "ready"
        }, origin)
        document.getElementById('loading-dim').style = 'display: none'
        initControl()
        window.requestAnimationFrame((timestamp) => { sendState(timestamp) })
      }
    })
  } else {
    (async ()=>{
      let newPlayer;
      
      // await loadChart('./chart/test2/')
      //   .then(levelData => {
      //     if (levelData != null) {
      //       newPlayer = new CytoidPlayer(levelData.chart, levelData.audioBlob,
      //         levelData.backgroundBlob, levelData.chartInfo)
      //     }
      //   })
      if (!newPlayer) {
        await loadChart('./chart/teages.yunomi.yumeiroparedo/')
        .then(levelData => {
          if (levelData != null) {
            newPlayer = new CytoidPlayer(levelData.chart, levelData.audioBlob,
              levelData.backgroundBlob, levelData.chartInfo)
          }
        })
      }
      newPlayer.setSizeAuto()
      // console.log(newPlayer)
      player = newPlayer
      document.getElementById('loading-dim').style = 'display: none'
      
      window.onresize = function () {
        player.setSizeAuto()
        devlog("auto resized")
      }
      return newPlayer
    })();
  }

  async function loadChart(url) {
    let levelJsonUrl = url + '/level.json'
    let levelJson = await fetch(levelJsonUrl, {method:'GET', mode: 'cors'})
      .then(response => response.json())
      .catch(()=>{return null})
    if (levelJson != null) {
      let backgroundURL = url + '/' + levelJson.background.path
      let audioURL = url + '/' + (levelJson.charts[0].music_override ? levelJson.charts[0]['music_override'].path : levelJson.music.path)
      let chartURL = url + '/' + levelJson.charts[0].path
      // console.log({audioURL,chartURL,backgroundURL})
      let audioBlob = await fetch(audioURL)
      .then(response => response.blob())
      let backgroundBlob = await fetch(backgroundURL)
        .then(response => response.blob())
      let chart = await fetch(chartURL)
        .then(response => response.json())
      let chartInfo = {
        difficultyType: levelJson.charts[0].type,
        difficultyName: (levelJson.charts[0].name),
        difficultyLevel: levelJson.charts[0].difficulty,
        levelName: levelJson.title
      }
      return({audioBlob, chart, backgroundBlob, chartInfo})
    }
    return null
  }


}

var sended = 0
function sendState(timestamp) {
  if (sended <= 0) {
    top.postMessage({
      type: "playerState",
      value: {
        state: player.playState,
        playSpeed: player.playSpeed,
        deviceOffset: player.deviceOffset,
        time: player.time / 1000 || 0,
        tick: player.tick,
        length: player.audio.length || 0,
      }
    }, origin)
    sended = 15
  } else {
    sended--;
  }
  window.requestAnimationFrame((timestamp) => { sendState(timestamp) })
}

function initControl() {
  window.addEventListener('message',(event) => {
    if (event.data.type == 'command') {
      switch(event.data.command) {
        case 'setPlayState':
          player.start(event.data.value.time, event.data.value.speed)
          break;
        case 'jump':
          player.jump(event.data.value.time, event.data.value.speed)
          break;
        case 'switch':
          player.switch()
          break;
        case 'contiune':
          player.contiune()
          break;
        case 'pause':
          player.pause()
          break;
        default:
          break;
      }
    }
  })
}