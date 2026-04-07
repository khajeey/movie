let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e' 
 
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
let tokenSearch = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`

const append = document.querySelector(".append")


const prev = document.querySelector(".prev")
const title = document.querySelector(".title")
const next = document.querySelector(".next")
let movieType = "top_rated"
let page = 1
const searchInput = document.querySelector("#search")

const minInput = document.querySelector("#min")
const maxInput = document.querySelector("#max")
const scoreInput = document.querySelector("#score")


async function getMovies(movieType,page = 1, query = "", min = '', max = '',score = '') {
    append.innerHTML = null
    let url = tokenTop
    if (query) {
        url = tokenSearch + `&query=${query}`
    }else{

        if (movieType == "top_rated") {
            url = tokenTop
        }else if(movieType == "popular"){
            url = tokenPopular
        }else{
            url = tokenUpComing
        }
    }

    if (min) url += `&primary_release_date.gte=${min}-01-01`
    if (max) url += `&primary_release_date.lte=${max}-12-31`
    if (score) url += `&vote_average.gte=${score}`

        let Movies = await axios.get(url + `&page=${page}`)
        Movies = Movies.data.results
        // console.log(topMovies);
        

        for (const movie of Movies) {
            append.innerHTML += `<div class="movie">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${movie.original_title}">
       
                   <div class="movie-info">
                       <h3>${movie.original_title}</h3>
                       <span class="orange">${movie.vote_average}</span>
                    </div>
                    <span class="date">${movie.release_date}</span> 
                </div>`
        }
}

getMovies(movieType,1)

const valueBtns = document.querySelectorAll(".btns")

valueBtns.forEach(btn =>{
    btn.addEventListener("click", (e)=>{
        movieType = e.target.value;
        page = 1
        getMovies(movieType,page)
    })
})


next.addEventListener("click", ()=>{
    let page = Number(window.localStorage.getItem("title")) || 1
    page += 1
    title.textContent = page
    getMovies(movieType,page)

    window.localStorage.setItem("title", page,minInput.value, maxInput.value, scoreInput.value)
})

prev.addEventListener("click", ()=>{
    let page = Number(window.localStorage.getItem("title")) || 1
    page -= 1
    title.textContent = page
    getMovies(movieType,page)

    window.localStorage.setItem("title", page,minInput.value, maxInput.value, scoreInput.value)
})



searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        let query = e.target.value.trim()
        page = 1
        getMovies(movieType, page, query)
    }
})


const filterBtn = document.querySelector(".btn")

filterBtn.addEventListener("click", () => {
    let min = minInput.value
    let max = maxInput.value
    let query = searchInput.value.trim()
    let score = Number(scoreInput.value)
    
    if (score > 10) {
        alert("Score 10 dan katta bo‘lmaydi")
        return}
    score = Math.floor(score)

    page = 1
    getMovies(movieType, page, "", min, max)
})

