const elMovieName = document.querySelector('#movie__name')
const elRating = document.querySelector('#movie__rating-input')
const elCategoriesSelect = document.querySelector('#categories-select')
const elFilterButton = document.querySelector('.movie__filter-button')
const elCounter = document.querySelector('#counter')
const elList = document.querySelector('#movie__list')
const elTemplate = document.querySelector('#template').content


let movieArr = movies.slice(0, 50) // taking of part movie list

elCounter.textContent = movieArr.length // counting length of movies




// normalized list for using better ------------------------------------------------------
const normalizedMovieList = movieArr.map(item => {
    const {Title, movie_year,  ytid, imdb_rating, Categories} = item
    return {
        movie__title: Title.toString(),
        movie__year: movie_year,
        movie__ytId: ytid,
        movie__rating: imdb_rating,
        movie__categories: Categories
    }
})
//----------------------------------------------------------------------------------------




//rendering place for movie list  ---------------------------------------------------------------------------
function render(arr, renderingPlace){

    renderingPlace.innerHTML = null
    
    const fragment = document.createDocumentFragment()

    arr.forEach(item => {

        const {movie__title,  movie__ytId, movie__rating, movie__categories} = item

        const newTemplate = elTemplate.cloneNode(true)

        newTemplate.querySelector('.movie__img').src = `https://img.youtube.com/vi/${movie__ytId}/mqdefault.jpg`
        newTemplate.querySelector('.movie__title').textContent = movie__title
        newTemplate.querySelector('.movie__category').textContent = movie__categories.split('|').join(', ')
        newTemplate.querySelector('.movie__rating').textContent = movie__rating

        fragment.appendChild(newTemplate)
    })
    renderingPlace.appendChild(fragment)
}




render(normalizedMovieList, elList) // rendering movie list
//----------------------------------------------------------------------------------------





// filter by rating -----------------------------------------------------------------------
// elFilterButton.addEventListener('click', (evt) => {

//     const ratingValue = +elRating.value.trim()

//    const filteredMovie = normalizedMovieList.filter(item => item.rating >= ratingValue) 

//     render(filteredMovie, elList) // rendering
//     elCounter.textContent = filteredMovie.length // counting
// })
//--------------------------------------------------------------------------------------------




// taking category list from movie list ------------------------------------------------------
    const categoryList = []

   normalizedMovieList.forEach(item => {
      let oneItemCategory = item.movie__categories.split('|')
    
      oneItemCategory.forEach(item => {
        if(!(categoryList.includes(item))){
            categoryList.push(item)
        }
      })
    })
// -------------------------------------------------------------------------------------------




// rendering category list to select for choosing category -----------------------------------
function renderCategoriesList(categoriesList, renderingPlace) {
    
    const fragment = document.createDocumentFragment()

    categoriesList.forEach(item => {
        const newOption = document.createElement('option')

        newOption.value = item
        newOption.textContent = item

        fragment.appendChild(newOption)
    })

    renderingPlace.appendChild(fragment)
}

renderCategoriesList(categoryList, elCategoriesSelect) // rendering category list to select tag
//-------------------------------------------------------------------------------------------------




// filtering movie list by selectd category -------------------------------------------------
// elFilterButton.addEventListener('click', (evt) => {

//     let filteredListByCategory = []

//     if(elCategoriesSelect.value == 'All') {
//         filteredListByCategory = normalizedMovieList
//     }
//     else {
//         filteredListByCategory = normalizedMovieList.filter(item => {
//           return item.categories.split('|').includes(elCategoriesSelect.value)
//         })
//     }

//     render(filteredListByCategory, elList) // rendering movie list by selectd category
// })
//-----------------------------------------------------------------------------------------------


elMovieName.addEventListener('change', (evt) => {


    

    const pattern = new RegExp(elMovieName.value.trim(), 'gi')


    const filteredNorm = normalizedMovieList.filter(item => {
        return item.movie__title.match(pattern)
    })
    
    render(filteredNorm, elList) 
})