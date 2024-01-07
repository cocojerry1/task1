// task.js 파일
function getMovieData() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'api키값을 넣으세요'
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => { allMovies = data.results; // 전체 영화 데이터 저장
                            updateDOM(allMovies); // 초기에 모든 영화 표시
        })
        .catch(err => console.error(err));
    
        
}
// 무비컨텐트의 내용
function updateDOM(movies) {
    const section = document.querySelector('.movie-content');
    section.innerHTML = ''; 

    movies.forEach(movie => {
        const { id, title, vote_average, poster_path, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3 class="movie-title" data-id="${id}">${title}</h3>
                <span class="green">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        section.appendChild(movieEl);

        // 영화 title를 누를시 영화id값이 나옴
        movieEl.querySelector('.movie-title').addEventListener('click', function() {
            alert("영화 ID: " + this.getAttribute('data-id'));
        });
    });
}
// 영화 검색기능
function searchMovies() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredMovies = allMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm)
    );
    updateDOM(filteredMovies);
}

let allMovies = []; // 영화 데이터를 저장할 전역 변수


// 검색누르는 기능
document.querySelector('.bx.bx-search').addEventListener('click', searchMovies);

window.onload = getMovieData;

