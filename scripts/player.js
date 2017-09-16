class Player {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.createAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'))
        this.progress = new LyricsPlayer(this.$el.querySelector('.progress'))
    }

    handleEvent(ev) {

    }

    createAudio() {
        this.$audio = document.createElement('audio')
        this.$audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
        this.$audio.addEventListener('ended', () => {
            this.$audio.play()
            this.lyrics.restart()
            this.progress.restart()
        })
        document.body.appendChild(this.$audio)
    }

    play(options = {}) {
        if(!options) return

        this.$el.querySelector('.song-name').innerText = options.songname
        this.$el.querySelector('.song-artist').innerText = options.artist
        this.p
    }

    show() {
        this.$el.classList.add('show')
        document.body.classList.add('noscroll')
    }

    hide() {
        this.$el.classList.remove('show')
        document.body.classList.remove('noscroll')
    }
}