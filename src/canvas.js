export function initCanvas(containerElement) {
    const element = document.createElement('canvas')
    const {w, h} = calculateDimensions(element, containerElement)
    const context = element.getContext('2d')
    return {
        element,
        context,
        w,
        h
    }
}

export function resizeCanvasToContainer(canvas) {
    const container = canvas.element.parentElement
    const newDimensions = calculateDimensions(canvas.element, container)

    Object.assign(canvas, newDimensions)
}

function calculateDimensions(canvas, container) {
    const dpr = window.devicePixelRatio
    const containerWidth = canvas.style.width = container.clientWidth
    const containerHeight = canvas.style.height = container.clientHeight
    
    const w = canvas.width = containerWidth * dpr
    const h = canvas.height = containerHeight * dpr

    return {w, h}

}