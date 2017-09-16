class Search {
    constructor(el) {
        this.$el = el
        this.keyword = ''
        this.page = 1
        this.perpage = 20
        this.songs = {}
        this.nomore = false
        this.fetching = false
        this.history = []
        this.$input = this.$el.querySelector('#search_input')
        this.$cancel = this.$el.querySelector('.btn_cancle')
        this.$delete = this.$el.querySelector('.fa-times-circle')
        this.$songs = this.$el.querySelector('.song-list')
        this.$hotKey = this.$el.querySelector('#hot_keys')
        this.$history = this.$el.querySelector('#record_keys')
        window.addEventListener('click', this.onClick.bind(this))
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        window.addEventListener('scroll', this.onScroll.bind(this))

        this.LOCAL_STORAGE_KEY = 'agui_search_history'
        this.history = localStorage.getItem(this.LOCAL_STORAGE_KEY) ? localStorage.getItem(this.LOCAL_STORAGE_KEY).split(',') : []
    }

    onClick(e) {
        if (e.target === this.$input) {
            this.$cancel.classList.remove('hide')
            // this.$delete.classList.remove('hide')
            this.$el.querySelector('#record_keys').classList.remove('hide')
            this.renderHis()
        }
        if (e.target === this.$cancel) {
            this.$cancel.classList.add('hide')
            this.reset()
            this.$hotKey.style.display = 'block'
            this.$el.querySelector('#record_keys').classList.add('hide')
            this.$input.value = ''
        }
        if (e.target === this.$delete) {
            this.$input.value = ''
            this.$delete.classList.add('hide')
        }
        if (e.target.matches('.record_con')) {
            this.$input.value = e.target.innerHTML
            this.$delete.classList.remove('hide')
            this.search(this.$input.value)
        }
        if (e.target.matches('.icon_close')) {
            let index = this.history.indexOf(e.target.previousElementSibling.innerHTML)
            this.history.splice(index, 1)
            localStorage.setItem(this.LOCAL_STORAGE_KEY, this.history)
            this.renderHis()
        }
        if (e.target.matches('.record_delete')) {
            this.history = []
            console.log(this.history)
            localStorage.setItem(this.LOCAL_STORAGE_KEY, this.history)
            this.$history.innerHTML = ''
        }

    }

    renderHis() {
        if(this.history.length > 0) {
            let hisHTML = this.history.map(item => `
                <li>
                    <a href="javascript:;" class="record_main">
                        <span class="icon icon_clock"></span>
                        <span class="record_con ellipsis">${item}</span>
                        <span class="icon icon_close"></span>
                    </a>
                </li>
            `).join('')
            hisHTML += `
                <p id="record_clear_btn" class="record_delete">
                    清除搜索记录
                </p>
            `
            this.$history.innerHTML = hisHTML
        }
    }

    onKeyUp(e) {
        let keyword = this.$input.value.trim()
        if (keyword) {
            this.$delete.classList.remove('hide')
        } else {
            this.$delete.classList.add('hide')
        }
        if (e.keyCode !== 13 ) {
            return
        }
        this.addHistory(keyword)
        // this.$el.querySelector('#record_keys').classList.add('hide')
        this.search(keyword)
    }

    addHistory(keyword) {
        let index = this.history.indexOf(keyword)
        if(index > -1) {
            this.history.splice(index, 1)
        }
        this.history.unshift(keyword)
        localStorage.setItem(this.LOCAL_STORAGE_KEY, this.history)
    }

    search(keyword, page) {
        this.$el.querySelector('#record_keys').classList.add('hide')

        if (this.keyword === keyword && this.songs[page || this.page]) return
        if (this.nomore || this.fetching) return
        if (this.keyword !== keyword) this.reset()
        this.keyword = keyword

        this.loading()
        fetch(`https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${this.page}`)
            .then(res => res.json())
            .then(json => {
                this.page = json.data.song.curpage
                this.songs[this.page] = json.data.song.list
                this.nomore = json.message === 'no results'
                return json.data.song.list
            })
            .then(songs => {
                this.append(songs)
                this.$hotKey.style.display = 'none'
            })
            .then(() => this.done())
            .catch(() => this.fetching = false)
    }

    append(data) {
        let html = data.map(song => {
            let artist = song.singer.map(s => s.name).join(' ')
            return `
                <a class="song-item" href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                    <i class="icon icon-music"></i>
                    <div class="song-name ellipsis">${song.songname}</div>
                    <div class="song-artist ellipsis">${artist}</div>
                </a>
            `
        }).join('')
        this.$songs.innerHTML += html
    }

    loading() {
        this.fetching = true
        this.$el.querySelector('.search-loading').classList.add('show')
    }

    done() {
        this.fetching = false
        if (this.nomore) {
            this.$el.querySelector('.loading-icon').style.display = 'none'
            this.$el.querySelector('.loading-text').style.display = 'none'
            this.$el.querySelector('.loading-done').style.display = 'block'
            this.$el.querySelector('.search-loading').classList.add('show')
        } else {
            this.$el.querySelector('.search-loading').classList.remove('show')
        }
    }

    onScroll(e) {
        if (this.nomore) {
            return window.removeEventListener('scroll', this.onScroll.bind(this))
        }
        if (pageYOffset + document.documentElement.clientHeight > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }

    reset() {
        this.page = 1
        this.songs = {}
        this.keyword = ''
        this.nomore = false
        this.$songs.innerHTML = ''
        // this.$hotKey.style.display = 'block'
    }

}