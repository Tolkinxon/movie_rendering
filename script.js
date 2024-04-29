const list = document.querySelector('#movie__list')
const movieArr = movies.slice(0, 10)


function render(arr, renderingPlace) {
    
    arr.forEach(item => {
        const {Title, movie_year, language} = item
        
        const newLi = document.createElement('li')
        const newH1 = document.createElement('h1')
        const movieYear = document.createElement('p')
        const languageTitle = document.createElement('p')
        
        
        newH1.textContent = Title
        movieYear.textContent = movie_year
        languageTitle.textContent = language
        
        newLi.appendChild(newH1)
        newLi.appendChild(movieYear)
        newLi.appendChild(languageTitle)
        
        renderingPlace.appendChild(newLi)
    })
    
}

render(movieArr, list)

