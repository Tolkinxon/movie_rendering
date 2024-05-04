const elFilterButton = document.querySelector('.movie__filter-button')
const elRating = document.querySelector('.movie__rating-input')
const elList = document.querySelector('#movie__list')
const elCounter = document.querySelector('#counter')
const elTemplate = document.querySelector('#template').content


let movieArr = movies.slice(0, 3) // taking of part movie list

elCounter.textContent = movieArr.length // counting length of movies




// normalized list for using better ------------------------------------------------------
const normalizedMovieList = movieArr.map(item => {
    const {Title, movie_year,  ytid, imdb_rating, Categories} = item
    return {
        title: Title.toString(),
        year: movie_year,
        ytId: ytid,
        rating: imdb_rating,
        categories: Categories
    }
})
//----------------------------------------------------------------------------------------




//rendering place ---------------------------------------------------------------------------
function render(arr, renderingPlace){

    renderingPlace.innerHTML = null
    
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {

        const {title, year,  ytId, rating} = item

        const newTemplate = elTemplate.cloneNode(true)

        newTemplate.querySelector('.movie__img').src = `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
        newTemplate.querySelector('.movie__title').textContent = title
        newTemplate.querySelector('.movie__year').textContent = year
        newTemplate.querySelector('.movie__rating').textContent = rating

        fragment.appendChild(newTemplate)
    })
    renderingPlace.appendChild(fragment)
}

render(normalizedMovieList, elList) // rendering
//----------------------------------------------------------------------------------------





// filter for rating -----------------------------------------------------------------------
elFilterButton.addEventListener('click', (evt) => {

    const ratingValue = +elRating.value.trim()

   const filteredMovie = normalizedMovieList.filter(item => item.rating >= ratingValue) 

    render(filteredMovie, elList) // rendering
    elCounter.textContent = filteredMovie.length // counting
})
//--------------------------------------------------------------------------------------------




// taking category list from movie list ------------------------------------------------------
    const categoryList = []

   normalizedMovieList.forEach(item => {
      let oneItemCategory = item.categories.split('|')
    
      oneItemCategory.forEach(item => {
        if(!(categoryList.includes(item))){
            categoryList.push(item)
        }
      })
    })
    
   
// -------------------------------------------------------------------------------------------


