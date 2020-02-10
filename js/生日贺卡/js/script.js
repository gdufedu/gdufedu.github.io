window.onload = function() {
    var music = document.getElementById('music');
    var audio = document.getElementsByTagName('audio')[0];
    var btnPlay = document.getElementById('j_play');
    var btnPlay = document.createElement('button');
    var style = document.createElement('style');
    style.textContent = '.music > img.pause {animation-play-state: paused;}';
    style.type = 'text/css';
    this.document.head.appendChild(style);
    (btnPlay.onclick = () => {
        audio.play();
    })();

    audio.addEventListener(
        'ended',
        function() {
            music.setAttribute('class', '');
        },
        false
    );

    music.addEventListener(
        'touchstart',
        function() {
            if (audio.paused) {
                audio.play();
                this.className = 'play';
            } else {
                audio.pause();
                this.className += ' pause';
            }
        },
        false
    );
    page1.addEventListener(
        'touchstart',
        function() {
            page1.style.display = 'none';
            page2.style.display = 'block';
            page3.style.display = 'block';
            page3.style.top = '100%';
            setTimeout(() => {
                page2.setAttribute('class', 'page fadeOut');
                page3.setAttribute('class', 'page fadeIn');
            }, 5500);
        },
        false
    );
};
