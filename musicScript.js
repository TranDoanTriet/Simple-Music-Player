
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')

const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')

const app = {
    currentIndex: 0,
    isPlaying: false,

    songs: [
        {
            name: 'What Do You Mean?',
            singer: 'Justin Bieber',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.png'
        },
        {
            name: 'Senorita',
            singer: 'Shawn Mendes, Camila Cabello',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.png'
        },
        {
            name: 'Beggin',
            singer: 'Maneskin',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.png'
        },
        {
            name: 'Old Town Road',
            singer: 'Lil Nas X',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.png'
        },
        {
            name: 'Havana',
            singer: 'Camila Cabello',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.png'
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.png'
        },
        {
            name: 'Dusk Till Dawn',
            singer: 'ZAYN',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.png'
        },
        {
            name: 'La la la',
            singer: 'Naughty Boy',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.png'
        },
        {
            name: 'Uptown Funk',
            singer: 'Mark Ronson',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.png'
        },
        {
            name: 'Sorry',
            singer: 'Justin Bieber',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.png'
        }
    ],
    render: function () {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb"
                        style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth
        let _this = this
        //phong to/ thu nho cd
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        //xu ly cd rotate
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause()
        //xu ly khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }

        }

        //khi song dc play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        //khi song pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // tien do bai hat thay doi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
                //xu ly thanh nhac fill theo nhac
                let x = progressPercent;
                let color = 'linear-gradient(90deg, rgb(117, 252, 117)' + x + '%' + ', rgb(214, 214, 214)' + x + '%)'
                progress.style.background = color
            }
        }

        //xu ly khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime
            console.log(seekTime)
        }

        //khi next song
        nextBtn.onclick = function () {
            _this.nextSong()
            audio.play()
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    start: function () {
        //Định nghĩa các thuốc tính cho object
        this.defineProperties()

        //lắng nghe/ xử lý sự kiện
        this.handleEvents()

        //load thong tin bai hat dau tien
        this.loadCurrentSong()

        //render playlist
        this.render()
    }
}

app.start()
