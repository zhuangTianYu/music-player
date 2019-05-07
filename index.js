const range = document.querySelector('input[type=range]')
const audio = document.querySelector('audio')
const current = document.querySelector('.current')
const ending = document.querySelector('.ending')
const playEl = document.querySelector('.play')

const state = {
  playing: false,
  dragging: false
}

const second2minute = (second) => {
  const mm = Math.floor(second / 60)
  const ss = (second % 60).toFixed(0)
  const complete = num => num < 10 ? `0${num}` : num
  return `${complete(mm)}:${complete(ss)}`
}

const setCurrent = () => {
  const currentTime = audio.currentTime
  const innerHTML = second2minute(currentTime)
  Object.assign(current, { innerHTML })
  if (!state.dragging) {
    Object.assign(range, { value: currentTime })
  }
}

const setEnding = () => {
  const duration = audio.duration
  const innerHTML = second2minute(duration)
  Object.assign(ending, { innerHTML })
  Object.assign(range, { value: 0, max: duration })
}

const init = setEnding

const play = () => {
  audio.play()
  Object.assign(state, { playing: true })
  Object.assign(playEl, { innerHTML: 'pause' })
}

const pause = () => {
  audio.pause()
  Object.assign(state, { playing: false })
  Object.assign(playEl, { innerHTML: 'play' })
}

playEl.onclick = () => state.playing ? pause() : play()

audio.ontimeupdate = setCurrent

audio.onended = () => {
  Object.assign(range, { value: 0 })
  Object.assign(state, { playing: false })
  Object.assign(playEl, { innerHTML: 'play' })
  Object.assign(current, { innerHTML: '00:00' })
}

range.onchange = () => {
  audio.currentTime = range.value
  Object.assign(state, { dragging: false })
}

range.oninput = () => {
  Object.assign(state, { dragging: true })
}

window.onload = init


