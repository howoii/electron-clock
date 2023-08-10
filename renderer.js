const DURATION_MAX = 9
const VERSION_DAYS = [new Date('2023/8/10'), new Date('2023/10/31'), new Date('2023/1/24')]

var duration = 9
var startTime = new Date()
var isOFFWork = true
var isVersionUpdateDay = false
const startNode = document.getElementById('start')
const counterNode = document.getElementById('counter')
const timeNode = document.getElementById('time')
const durationNode = document.getElementById('duration')
durationNode.innerText = `${duration}`

function updateTime() {
    const dateStr = window.localStorage.getItem('last_time')
    const last = new Date(dateStr)
    const now = new Date()
    isVersionUpdateDay = VERSION_DAYS.some((d) => {
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
    })
    if (!dateStr || last.toLocaleDateString() !== now.toLocaleDateString()) {
        window.localStorage.setItem('last_time', now.toString())
        startTime = now
    } else {
        startTime = last
    }
    startNode.innerText = startTime.toLocaleTimeString()
}

function updateCountDown(notify) {
    const now = new Date()
    timeNode.innerText = now.toLocaleTimeString()
    if (isVersionUpdateDay) {
        counterNode.innerText = `版更日`
        counterNode.setAttribute('class', 'alarm')
        return
    } else {
        counterNode.removeAttribute('class', 'alarm')
    }

    const count = duration * 3600 * 1000 - (now - startTime)
    if (count < 0) {
        counterNode.innerText = '下班啦!'
        if (notify && !isOFFWork) {
            new Notification('下班!', {
                body: '下班啦！搞快点！'
            })
        }
        isOFFWork = true
        return
    } else {
        isOFFWork = false
    }

    const h = Math.floor(count / (1000 * 3600)) % 24
    const m = Math.floor(count / (1000 * 60)) % 60
    const s = Math.floor(count / 1000) % 60
    counterNode.innerText = `${h}h ${m}m ${s}s`
}

// update time on first time start app
updateTime()
updateCountDown(false)

// update time when window is focused
window.electronAPI.handleActive((e) => {
    updateTime()
})

// update count down every second
setInterval(() => {
    updateCountDown(true)
}, 1000);

durationNode.addEventListener('click', () => {
    console.log('click')
    duration = duration + 1
    duration = (duration > DURATION_MAX) ? 1 : duration
    durationNode.innerText = `${duration}`
})