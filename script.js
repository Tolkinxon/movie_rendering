const list = document.querySelector('#movie__list')
const movieArr = movies.slice(0, 20)


function render(arr, renderingPlace) {
    
    arr.forEach(item => {
        const {Title, movie_year, language, ytid} = item
        
        const newLi = document.createElement('li')
        const newImg = document.createElement('img')
        const newH1 = document.createElement('h1')
        const movieYear = document.createElement('p')
        const languageTitle = document.createElement('p')
        
        newImg.src = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`
        newH1.textContent = Title
        movieYear.textContent = movie_year
        languageTitle.textContent = language
        
        newLi.appendChild(newImg)
        newLi.appendChild(newH1)
        newLi.appendChild(movieYear)
        newLi.appendChild(languageTitle)
        
        renderingPlace.appendChild(newLi)
    })
    
}

render(movieArr, list)

