(function() {

    let slider = new Slider({
        el: document.querySelector('#slider'),
        slides: [
            {link: '#1', image: 'images/eson.jpg'},
            {link: '#1', image: 'images/feat.jpg'},
            {link: '#1', image: 'images/hiha.jpg'},
            {link: '#1', image: 'images/pan.jpg'},
            {link: '#1', image: 'images/rong.jpg'}
        ],
        interval: 3000
    });

})()