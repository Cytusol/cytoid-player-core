function getNewDom(type, className, id, style, onclick, innerDoms = [], dom) {
  if (!dom) {
    dom = document.createElement(type || 'div')
  }
  dom.className = className || ''
  dom.id = id || ''
  dom.style.cssText = style || ''
  dom.onclick = onclick
  if (Array.isArray(innerDoms)) {
    for (let innerDom of innerDoms) {
      if (innerDom instanceof HTMLElement) {
        dom.appendChild(innerDom)
      } else {
        if (typeof innerDom == 'object') {
          dom.appendChild(getNewDom(
            innerDom.type,
            innerDom.className,
            innerDom.id,
            innerDom.style,
            innerDom.onclick,
            innerDom.innerDoms,
            innerDom.dom
          ))
        }
      }
    }
  }
  return dom
}
class PlayerDom {
  playerBox = null;
  player = document.createElement('div');
  background = document.createElement('div');
  noteBox = document.createElement('div');
  notePreloader = document.createElement('div');
  scanlinePosition = document.createElement('div');
  scanlineBody = document.createElement('div');
  noteEffectBox = document.createElement('div');
  combo = document.createElement('span');
  score = document.createElement('span');
  // audio = document.createElement('div');
  dragBox = document.createElement('canvas');
  textEventBox = document.createElement('div');
  borders = {
    box: document.createElement('div'),
    top: document.createElement('div'),
    bottom: document.createElement('div')
  };
  level = {
    levelDiff: document.createElement('span'),
    box: document.createElement('div'),
    difficultyName: document.createElement('span'),
    difficultyLevel: document.createElement('span'),
    levelName: document.createElement('span'),
  };
  pause = document.createElement('div')
  constructor(playerBox) {
    this.playerBox = playerBox
    this.playerBox.innerHTML = ''

    let template = {
      dom: this.player,
      "type": "DIV",
      "className": "",
      "id": "player",
      "style": "",
      "innerDoms": [
        {
          "type": "DIV",
          "className": "",
          "id": "debug-data",
          "style": "display: none; z-index: 1000; color: white; position: absolute; bottom: 0px; height: auto; font-size: 0.25rem;",
          "onclick": null,
          "innerDoms": []
        },
        {
          "type": "DIV",
          "className": "",
          "id": "ui-bottom",
          "style": "",
          "onclick": null,
          "innerDoms": [
            {
              dom: this.level.box,
              "type": "DIV",
              "className": "",
              "id": "ui-bottom-left",
              "style": "display: none;",
              "onclick": null,
              "innerDoms": [
                {
                  dom: this.level.levelDiff,
                  "type": "SPAN",
                  "className": "",
                  "id": "difficulty-brunch",
                  "style": "",
                  "onclick": null,
                  "innerDoms": [
                    {
                      dom: this.level.difficultyName,
                      "type": "SPAN",
                      "className": "",
                      "id": "difficulty-name",
                      "style": "",
                      "onclick": null,
                      "innerDoms": []
                    },
                    {
                      dom: this.level.difficultyLevel,
                      "type": "SPAN",
                      "className": "",
                      "id": "difficulty-level",
                      "style": "",
                      "onclick": null,
                      "innerDoms": []
                    }
                  ]
                },
                {
                  dom: this.level.levelName,
                  "type": "SPAN",
                  "className": "",
                  "id": "level-name",
                  "style": "",
                  "onclick": null,
                  "innerDoms": []
                }
              ]
            },
            {
              "type": "DIV",
              "className": "",
              "id": "ui-bottom-right",
              "style": "",
              "onclick": null,
              "innerDoms": [
                {
                  "type": "DIV",
                  "className": "",
                  "id": "mods-box",
                  "style": "",
                  "onclick": null,
                  "innerDoms": [
                    {
                      "type": "DIV",
                      "className": "auto mod-brunch",
                      "id": "",
                      "style": "",
                      "onclick": null,
                      "innerDoms": [
                        {
                          "type": "SPAN",
                          "className": "",
                          "id": "mod-name",
                          "style": "",
                          "onclick": null,
                          "innerDoms": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "DIV",
          "className": "",
          "id": "player-context",
          "style": "",
          "onclick": null,
          "innerDoms": [
            {
              "type": "DIV",
              "className": "",
              "id": "note-effect-box",
              "style": "",
              "onclick": null,
              "innerDoms": [
                {
                  dom: this.borders.box,
                  "type": "DIV",
                  "className": "",
                  "id": "borders",
                  "style": "position: absolute;",
                  "onclick": null,
                  "innerDoms": [
                    {
                      dom: this.borders.top,
                      "type": "DIV",
                      "className": "",
                      "id": "border-top",
                      "style": "",
                      "onclick": null,
                      "innerDoms": []
                    },
                    {
                      dom: this.borders.bottom,
                      "type": "DIV",
                      "className": "",
                      "id": "border-bottom",
                      "style": "",
                      "onclick": null,
                      "innerDoms": []
                    }
                  ]
                },
                {
                  dom: this.dragBox,
                  "type": "CANVAS",
                  "className": "",
                  "id": "note-drag-box",
                  "style": "position: absolute;",
                  "onclick": null,
                  "innerDoms": []
                },
                {
                  dom: this.noteEffectBox,
                  "type": "DIV",
                  "className": "",
                  "id": "note-effect-contents",
                  "style": "",
                  "onclick": null,
                  "innerDoms": []
                }
              ]
            },
            {
              dom: this.noteBox,
              "type": "DIV",
              "className": "",
              "id": "note-box",
              "style": "",
              "onclick": null,
              "innerDoms": [
                {
                  dom: this.notePreloader,
                  "type": "DIV",
                  "className": "preload-note debug-body body-click_up",
                  "id": "preload-note",
                  "style": "",
                  "onclick": null,
                  "innerDoms": []
                },
                {
                  dom: this.scanlinePosition,
                  "type": "DIV",
                  "className": "",
                  "id": "scanline-position",
                  "style": "",
                  "onclick": null,
                  "innerDoms": [
                    {
                      dom: this.scanlineBody,
                      "type": "DIV",
                      "className": "",
                      "id": "scanline-body",
                      "style": "width: 0px;",
                      "onclick": null,
                      "innerDoms": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "DIV",
          "className": "",
          "id": "ui-top",
          "style": "",
          "onclick": null,
          "innerDoms": [
            {
              "type": "SPAN",
              "className": "",
              "id": "pause",
              "style": "",
              "onclick": null,
              "innerDoms": [
                {
                  dom: this.pause,
                  "type": "DIV",
                  "className": "",
                  "id": "pause-box",
                  "style": "",
                  "innerDoms": [
                    {
                      "type": "DIV",
                      "className": "pause-icon",
                      "id": "",
                      "style": "",
                      "onclick": null,
                      "innerDoms": []
                    }
                  ]
                }
              ]
            },
            {
              dom: this.combo,
              "type": "SPAN",
              "className": "combo-animation",
              "id": "combo",
              "style": "",
              "onclick": null,
              "innerDoms": []
            },
            {
              dom: this.score,
              "type": "SPAN",
              "className": "",
              "id": "score",
              "style": "",
              "onclick": null,
              "innerDoms": []
            }
          ]
        },
        {
          "type": "DIV",
          "className": "",
          "id": "ui-center",
          "style": "",
          "onclick": null,
          "innerDoms": [
            {
              dom: this.textEventBox,
              "type": "DIV",
              "className": "",
              "id": "event-text",
              "style": "",
              "onclick": null,
              "innerDoms": []
            }
          ]
        },
        {
          "type": "AUDIO",
          "className": "",
          "id": "bgMusic",
          "style": "",
          "onclick": null,
          "innerDoms": [
            {
              "type": "SOURCE",
              "className": "",
              "id": "",
              "style": "",
              "onclick": null,
              "innerDoms": []
            }
          ]
        },
        {
          dom: this.background,
          "type": "DIV",
          "className": "",
          "id": "player-background",
          "style": "",
          "onclick": null,
          "innerDoms": []
        }
      ]
    }
    this.score.innerText = '0000000'
    this.combo.innerText = '0'
    getNewDom('div', '', 'player-box', 'display:none;', undefined, [template], this.playerBox)
  }
}
export default PlayerDom;