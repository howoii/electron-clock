const DURATION_MAX = 9
var duration = 9

var t = updateTime()
var startNode = document.getElementById('start')
startNode.innerText = t.toLocaleTimeString()

function updateTime() {
    const dateStr = window.localStorage.getItem('last_time')
    const last = new Date(dateStr)
    const now = new Date()
    if (!dateStr || last.toLocaleDateString() !== now.toLocaleDateString()) {
        window.localStorage.setItem('last_time', now.toString())
        return now
    } else {
        return last
    }
}

window.electronAPI.handleActive((e) => {
    t = updateTime()
    startNode.innerText = t.toLocaleTimeString()
})

var isOFFWork = false
var counterNode = document.getElementById('counter')
var timeNode = document.getElementById('time')
updateCountDown(false)
function updateCountDown(notify) {
    const now = new Date()
    const count = duration * 3600 * 1000 - (now - t)
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
    timeNode.innerText = now.toLocaleTimeString()
}
setInterval(() => {
    updateCountDown(true)
}, 1000);

var durationNode = document.getElementById('duration')
durationNode.innerText = `${duration}`
durationNode.addEventListener('click', () => {
    console.log('click')
    duration = duration + 1
    duration = (duration > DURATION_MAX) ? 1 : duration
    durationNode.innerText = `${duration}`
})