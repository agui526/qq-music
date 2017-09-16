class ProgressBar {
    constructor(el, duration, start) {
        this.$el = el
        this.elapsed = 0
        this.duration = duration || 0
        this.progress = 0
        this.interval = 50
        this.render()
        this.$progress = this.$el.querySelector('.progress-play')
        this.$elapsed = this.$el.querySelector('.time-elapsed')
        this.$duration = this.$el.querySelector('.time-duration')
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        this.$duration.innerText = this.formatTime(this.duration)

        if(start) this.start()
    }

    start() {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.playing().bind(this), this.interval)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    playing() {
        this.elapsed += this.interval
        if(this.elapsed > this.duration) this.reset()
        this.progress = this.elapsed / this.duration
        this.$progress.style.transform = `translateX(${this.progress - 1})`
        this.$elapsed.innerText = this.formatTime(this.$elapsed)
    }

    reset() {
        clearInterval(this.intervalId)
        this.elapsed = 0
        this.progress = 0
        this.$progress.style.transform = `translateX(-100%)`
        this.$elapsed.innerText = this.formatTime(this.elapsed)
        if (duration) {
            this.duration = +duration
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }

    restart() {
        this.reset()
        this.start()
    }

    formatTime(time) {
        let mins = Math.floor(time / 60)
        let secs = Math.floor(time % 60)
        if(mins < 10) mins = '0' + mins
        if(secs < 10) secs = '0' + secs
        return `${mins}:${secs}`
    }

    render() {
        this.$el.innerHTML = `
            <span class="time time-elapsed">00:13</span>
            <div class="progress-box">
                <div class="progress-bar progress-bg"></div>
                <div class="progress-bar progress-load"></div>
                <div class="progress-bar progress-play"></div>
            </div>
            <span class="time time-duration">04:58</span>
        `
    }
}