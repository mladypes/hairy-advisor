import {hairs} from './hairs'

const hairHandler = hairs(document.querySelector('#hairs-container'))

const advices = [
    "Follow your dreams",
    "Always eat breakfast",
    "Don't go to sleep too late",
    "You have to set goals for yourself",
    "Everyone is unique in their own way",
    "You cannot climb the ladder of success dressed in the costume of failure.",
    "Don't be a chickenshit - tell people how you really feel",
    "Treat others the way you would like to be treated",
    "Don't swim after eating",
    "Never go out with wet hair",
    "Eat more healthy",
    "It will pass",
    "Storms don't last forever",
    "Get a cat",
    "Visit your parents",
    "Take it easy",
    "Follow your heart",
    "An apple a day, keeps the doctor away",
    "If you want a job, you have to apply"
]

const handStates = {
    up: 0,
    down: 1
}

const hand = document.getElementById("hand")
let handState = handStates.up

const card = document.getElementById("real-card")

document.querySelector('#retry').addEventListener('click', () => location.reload())

function flip() {
    card.classList.toggle('flip')
}

const fauxCard = document.getElementById("faux-card")
const adviceElement = document.getElementById("advice")

const answerLayer = document.getElementById("answer-layer")
answerLayer.addEventListener('transitionend', (e) => {
    if (e.target === answerLayer) {
        handEnter()
        hairHandler.stop();
    }
})

hand.addEventListener('transitionend', () => {
    if (handState === handStates.up) {
        adviceElement.innerHTML = randomArrayElement(advices)
        card.style.visibility = "visible"
        setTimeout(handLeave, 0)
    } else if (handState === handStates.down) {
        flip()
        document.querySelector('#controls').style.opacity = 1
    }
})

window.addEventListener('load', init);

function init () {
    history.pushState(null, null, '/')

    const submitButton = document.getElementById("submit-button")
    submitButton.addEventListener('click', () => {
        answerLayer.style.visibility = 'visible'
        answerLayer.style.opacity = 1
    })

    const confessor = document.querySelector('#confessor')
    confessor.focus()
    confessor.addEventListener("keypress", (e) => {
        const code = e.keyCode || e.keyIdentifier || e.wich
        const enterCode = 13
        if (code === enterCode) {
            e.preventDefault()
            submitButton.click()
        }
    })
    
    

    selectImages()
    positionHandOffscreen()

    window.addEventListener('resize', hairHandler.reset)
}

function selectImages() {
    const imagePaths = [
        'images/arm_fat_guy.png',
        'images/arm_tattoo.png',
        'images/arm_paw.png',
        'images/arm_undead.png',
        'images/arm_woman.png',
    ]

    const cardImages = [
        '../images/card_black.png',
        '../images/card_white.png'
    ]

    document.getElementById('arm').setAttribute('src', randomArrayElement(imagePaths))
    document.querySelectorAll('.back, .back-static').forEach((() => {
        const backgroundImage = `url(${randomArrayElement(cardImages)})`
        return (element) => element.style['background-image'] = backgroundImage
    })())
}

function handEnter() {
    fauxCard.style.visibility = 'visible'
    hand.classList.add('hand-transition-enter')
    hand.classList.remove('hand-transition-leave')
    handState = handStates.up
    const cbr = card.getBoundingClientRect()

    moveHandTo(cbr.top)
}

function handLeave() {
    hand.classList.add('hand-transition-leave')
    hand.classList.remove('hand-transition-enter')
    fauxCard.style.visibility = 'hidden'
    handState = handStates.down

    const cbr = card.getBoundingClientRect()

    moveHandTo(-cbr.height)
}

function moveHandTo(top) {
    hand.style.transform = `translate3d(0, ${top}px, 0)`
}

function positionHandOffscreen() {
    setTimeout(() => moveHandTo(window.innerHeight + document.querySelector('#arm').clientHeight), 200)
}

function randomArrayElement(array) {
    return array[~~(Math.random() * array.length)]
}