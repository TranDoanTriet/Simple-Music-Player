
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')

const playBtn = $('.btn-toggle-play')

console.log(playBtn)

const app = {
    currentIndex: 0,

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
        document.onscroll = function () {
            const scrollTop = window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
            console.log(newCdWidth)
        }
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
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
