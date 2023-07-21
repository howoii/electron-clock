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

var isOFFWork = false
const counterNode = document.getElementById('counter')
updateCountDown(false)
function updateCountDown(notify) {
    const now = new Date()
    const count = 9 * 3600 * 1000 - (now - t)
    if (count < 0) {
        counterNode.innerText = '下班啦!'
        if (notify && !isOFFWork) {
            new Notification('下班!', {
                body: '下班啦！搞快点！'
            })
        }
        isOFFWork = true
        return
    }

    const h = Math.floor(count / (1000 * 3600)) % 24
    const m = Math.floor(count / (1000 * 60)) % 60
    const s = Math.floor(count / 1000) % 60
    counterNode.innerText = `${h}小时${m}分${s}秒`
}
setInterval(() => {
    updateCountDown(true)
}, 1000);

// todo: UI美化