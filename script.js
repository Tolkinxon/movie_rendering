const list = document.querySelector('#movie__list')
const movieArr = movies.slice(0, 20)

console.log(movieArr);
function render(arr, renderingPlace) {
    
    arr.forEach(item => {
        const {Title, movie_year,  ytid, imdb_rating} = item
        
        const newLi = document.createElement('li')
        const newImg = document.createElement('img')
        const div = document.createElement('div')
        const newH1 = document.createElement('h3')
        const movieYear = document.createElement('p')
        const rating = document.createElement('p')
        const buttonWrapper = document.createElement('div')
        const trailerButton = document.createElement('button')
        const infoButton = document.createElement('button')
        const bookmarkButton = document.createElement('button')



        newLi.classList.add('movie__item', 'col-6', 'py-2')
        newImg.classList.add('w-100')
        newImg.src = `https://img.youtube.com/vi/${ytid}/mqdefault.jpg`
        newLi.appendChild(newImg)

        div.classList.add('p-3', 'px-4', 'border')

        newH1.textContent = Title
        div.appendChild(newH1)

        movieYear.textContent = movie_year
        div.appendChild(movieYear)

        rating.textContent = imdb_rating
        div.appendChild(rating)



        buttonWrapper.classList.add('d-flex', 'justify-content-between')

        trailerButton.classList.add('btn', 'btn-outline-primary')
        trailerButton.style.fontSize = '13px'
        trailerButton.textContent = 'Watch trailer'

        infoButton.classList.add('btn', 'btn-outline-info', 'mx-1')
        infoButton.style.fontSize = '13px'
        infoButton.textContent = 'More info'

        bookmarkButton.classList.add('btn', 'btn-outline-info', 'mx-1')
        bookmarkButton.style.fontSize = '13px'
        bookmarkButton.textContent = 'More info'

        buttonWrapper.appendChild(trailerButton)
        buttonWrapper.appendChild(infoButton)
        buttonWrapper.appendChild(bookmarkButton)
        div.appendChild(buttonWrapper)
        newLi.appendChild(div)
        
        renderingPlace.appendChild(newLi)
    })
    
}

render(movieArr, list)

