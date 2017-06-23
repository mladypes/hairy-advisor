import {initCanvas, resizeCanvasToContainer} from './canvas'
import {sample} from './sampling'

export function hairs(container) {
  const allHairs = []
  const canvas = initCanvas(container)
  let elapsedTime = performance.now()
  let delta = 0
  let rafId;
  
  init(canvas)
  loop(0)
  

  function init(canvas) {
    container.appendChild(canvas.element)
    fillWithHairs()
  }

  function fillWithHairs() {
    const hairCount = 200
    allHairs.splice(0, allHairs.length)
    allHairs.push(createHairAt({x: 0, y: 0}))
    
    function continuousHairFill() {
      if (allHairs.length < hairCount) {
        addHair()
        setTimeout(continuousHairFill, Math.random() * 30)
      }
    }
    
    continuousHairFill()
  }
  
  function addHair() {
    const nextPosition = sample(allHairs, 3, canvas.w, canvas.h)
    allHairs.push(createHairAt(nextPosition))
  }
  
  function createHairAt(position) {
    return {
      position,
      length: {
        current: 0,
        max: 5 + Math.random() * 20
      },
      speed: {
        growth: 3 + 6 * Math.random()
      }
    }
  }

  function loop(time) {
    delta = (time - elapsedTime) / 1000
    update(delta)
    elapsedTime = time
    draw()
    rafId = requestAnimationFrame(loop)
  }
  
  function update() {
    allHairs.forEach(updateHair)
  }

  function draw() {
    canvas.context.clearRect(0, 0, canvas.w, canvas.h)
    allHairs.forEach(renderHair)
  }
  
  function updateHair(hair) {
    if (hair.length.current < hair.length.max) {
      hair.length.current += hair.speed.growth * delta
    } else {
      hair.length.current = hair.length.max
    }
  }

  function renderHair(hair, index) {
    canvas.context.beginPath();
    canvas.context.lineWidth = hair.length.current / 4
    canvas.context.strokeStyle = 'black'
    canvas.context.lineCap = 'round'
    canvas.context.moveTo(hair.position.x, hair.position.y)
    const adjustedTime = elapsedTime / 200  + index * 100
    const sin = Math.sin(adjustedTime) 
    const cos = Math.cos(adjustedTime) 
    canvas.context.quadraticCurveTo(hair.position.x + hair.length.current / 4 * sin, hair.position.y - hair.length.current / 2, hair.position.x + hair.length.current / 3 * cos, hair.position.y - hair.length.current)
    canvas.context.stroke()
  }

  function stop() {
    cancelAnimationFrame(rafId)
  }

  function reset() {
    resizeCanvasToContainer(canvas)
    fillWithHairs();
  }

  return {
    stop,
    reset
  }
}