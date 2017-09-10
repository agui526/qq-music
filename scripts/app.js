(function () {

    // fetch('/json/rec.json')
    //     .then(res => res.json())
    //     .then(renderRec);

    // fetch('/json/topList.json')
    //     .then(res => res.json())
    //     .then(json => json.data.topList)
    //     .then(renderTopList);

    renderRec(rec)
    renderTopList(topList.data.topList)
    renderHotKyes(hotKey.data)

    function renderRec(json) {
        renderSlider(json.data.slider);
        renderRadio(json.data.radioList);
    }

    function renderSlider(data) {
        let slides = data.map(slide => ({
            link: slide.linkUrl,
            image: slide.picUrl
        }));
        new Slider({
            el: document.querySelector('#slider'),
            slides: slides,
            interval: 3000
        })
    }

    function renderRadio(data) {
        let $el = document.querySelector('.radio_list')
        let radios = data.map(radio => `
        <li class="radio-item">
            <a href="javascript:;" class="list-main">
                <div class="list_media">
                    <img src="${radio.picUrl}" alt="">
                    <i class="fa fa-play-circle-o"></i>
                </div>
                <div class="list_info">
                    <h3>${radio.Ftitle}</h3>
                </div>
            </a>
        </li>
        `).join('')
        $el.innerHTML = radios
    }

    function renderTopList(data) {
        let $el = document.querySelector('.tab_topList')
        let topLists = data.map(topList => `
        <div class="topic_item">
            <div class="topic_main">
                <a href="javascript:;" class="topic_media">
                    <img class="lazyload" data-url="${topList.picUrl}" src="${topList.picUrl}">
                    <span class="listen_count"><i class="fa fa-headphones" aria-hidden="true"></i>${(topList.listenCount / 10000).toFixed(2)}万</span>
                </a>
                <div class="topic_info">
                    <div class="topic_cont">
                        <h3 class="topic_tit">${topList.topTitle}</h3>
                        ${songList(topList.songList)}
                    </div>
                    <i class="topic_arrow"></i>
                </div>
            </div>
        </div>
        `).join('')

        $el.innerHTML = topLists
    }

    function songList(data) {
        return data.map((song, i) => `
            <p>${i + 1}<span class="text_name">${song.songname}</span>- ${song.singername}</p>
        `).join('')
    }

    function renderHotKyes(data) {
        let $el = document.querySelector('.result_tags')
        let keys = data.hotkey
        let specialKey = data.special_key, specialUrl = data.special_url
        let hotKeys = shuffle(keys, 6).map(hotKey => `
            <a href="javascript:;" class="js_keyword tag_s">${hotKey.k}</a>
        `).join('')

        $el.innerHTML = `<a href="${specialUrl}" class="tag_s tag_hot">${specialKey}</a>` + hotKeys
    }

    function shuffle(array, count) {
        let re = []
        let len = Math.min(count, array.length)
        for(let i = 0; i < len; i++){
            (function(i){
                var temp = array
                var m = Math.floor(Math.random() * temp.length)
                re[i] = temp[m]
                array.splice(m, 1)
            })(i)    
        }
        return re
    }

    let search = new Search(document.querySelector('#search-view')) 

})()