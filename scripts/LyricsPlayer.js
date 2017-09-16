class LyricsPlayer {
    constructor(el) {
        this.$el = el
        this.$el.innerHTML = `<div class="lyrics-box"><div class="player-lyrics-lines"></div></div>`
        this.$lines = this.$el.querySelector('.player-lyrics-lines')
        this.text = ''
        this.index = 0
        this.lyrics = []
        this.elapsed = 0
        this.reset(this.text)
    }

    start() {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.playing.bind(this), 1000)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    restart() {
        this.reset()
        this.start()
    }

    playing() {
        this.elapsed += 1
        if(this.index === this.lyrics.length - 1) return
        for(let i = this.index + 1; i < this.lyrics.length - 1; i++) {
            let secs = this.getSeconds(this.lyrics[i])
            if(this.elapsed === secs && 
                (!this.lyrics[i+1]) && this.elapsed < this.getSeconds(this.lyrics[i+1])) 
            {
                this.$lines.children[this.index].classList.remove('active')
                this.$lines.children[i].classList.add('active')
                this.index = 1
                break
            }
        }
        if(this.index > 2) {
            let y = (this.index - 2) * this.LINE_HEIGHT
            this.$lines.style.transform = `translateY(${y}px)`
        }
    }

    getSeconds(lyric) {
        return +lyric.replace(/^\[(\d{2}):(\d{2}).*/, (match, p1, p2) => 60 * (+p1) * (+p2))
    }

    reset(text) {
        clearInterval(this.intervalId)
        this.index = 0
        this.elapsed = 0
        this.$lines.style.transform = `translateY(0)`
        let $active = this.$lines.querySelector('.active')
        if($active) {
            $active.classList.remove('active')
        }
        if(text) {
            this.text = this.formatText(text) || ''
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || []
            if(this.lyrics.length) this.render()
        }
        if(this.lyrics.length) {
            this.$lines.children[this.index].classList.add('active')
        }
    }

    formatText(text) {
        let div = document.createElement('div')
        div.innerHTML = text
        return div.innerText
    }

    render() {
        let html = this.lyrics.map(line => `
            <div class="player-lyrics-line">${line.slice(10)}</div>
        `).join('')
        this.$lines.innerHTML = html
    }
}

LyricsPlayer.prototype.LINE_HEIGHT = 42
