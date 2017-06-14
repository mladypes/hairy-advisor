export function initCanvas(containerElement) {
    const dpr = window.devicePixelRatio
    const element = document.createElement('canvas')

    const containerWidth = element.style.width = containerElement.clientWidth
    const containerHeight = element.style.height = containerElement.clientHeight
    
    const w = element.width = containerWidth * dpr
    const h = element.height = containerHeight * dpr

    const context = element.getContext('2d')

    return {
        element,
        context,
        w,
        h
    }
}