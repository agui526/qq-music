class Slider {
    constructor(options = {}) {
        this.$el = options.el
        this.slides = options.slides
        this.interval = options.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }

    render() {
        this.$el.innerHTML = '<div class="ui-slider-group"></div><div class="ui-slider-dots"></div>'
        this.$group = document.querySelector('.ui-slider-group')
        this.$group.style.width = `${this.slides.length * 100}%`
        this.$group.innerHTML = this.slides.map(slide => `
            <div class="ui-slider-item">
                <a href="${slide.link}">
                    <img src="${slide.image}" alt="">
                </a>
            </div>
        `).join('')

        this.$dots = document.querySelector('.ui-slider-dots')
        this.$dots.innerHTML = this.slides.map((slide, index) => `
            <b data-index=${index}></b>
        `).join('')
    }

    start() {
        setInterval(this.next.bind(this), this.interval)
    }

    next() {        
        if(this.index === this.slides.length) {
            this.$group.style.transform = `translateX(0)`
            this.index = 0
            return
        }
        let x = `-${this.index * 100 / this.slides.length}%`
        let b = (this.index === 0) ? (this.slides.length - 1) : (this.index - 1)
        console.log(this.index, b)
        this.$group.style.transform = `translateX(${x})`
        this.$dots.querySelector(`b[data-index="${this.index}"]`).classList.add('ui-state-active')
        this.$dots.querySelector(`b[data-index="${b}"]`).classList.remove('ui-state-active')
        this.index += 1
    }
}