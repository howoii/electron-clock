const t = updateTime()
const timeNode = document.getElementById('time')
timeNode.innerText = t.toLocaleTimeString()

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
    timeNode.innerText = t.toLocaleTimeString()
})

const counterNode = document.getElementById('counter')
counterNode.innerText = getCountDown()
function getCountDown() {
    const now = new Date()
    const count = 9 * 3600 * 1000 - (now - t)
    if (count < 0) {
        return '下班啦!'
    }

    const h = Math.floor(count / (1000 * 3600)) % 24
    const m = Math.floor(count / (1000 * 60)) % 60
    const s = Math.floor(count / 1000) % 60
    return `${h}小时${m}分${s}秒`
}
setInterval(() => {
    counterNode.innerText = getCountDown()
}, 1000);

// todo: 通知、UI美化