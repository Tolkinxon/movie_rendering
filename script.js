const elMovieName = document.querySelector('#movie__name')
const elRating = document.querySelector('#movie__rating-input')
const elCategoriesSelect = document.querySelector('#categories-select')
const elSortingType = document.querySelector('.select-sort')
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





// taking category list from movie list ------------------------------------------------------...
    const categoryList = []

   normalizedMovieList.forEach(item => {
      let oneItemCategory = item.movie__categories.split('|')
    
      oneItemCategory.forEach(item => {
        if(!(categoryList.includes(item))){
            categoryList.push(item)
        }
      })
    })

    categoryList.sort()
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






elFilterButton.addEventListener('click', (evt) => {

    const inputName = elMovieName.value.trim()
    const rating = elRating.value
    const category = elCategoriesSelect.value
    

    const pattern = new RegExp(inputName, 'gi')


     const filteredMovies = filterWithAllfeatures(pattern, rating, category)

    console.log(elSortingType.value);

    if(elSortingType.value == 'high'){
        filteredMovies.sort((a, b) => {
           return b.movie__rating - a.movie__rating
        })
    }
    if(elSortingType.value == 'low'){
        filteredMovies.sort((a, b) => {
           return a.movie__rating - b.movie__rating
        })
    }



     render(filteredMovies, elList) 
     elCounter.textContent = filteredMovies.length 

  

    
   
})

function filterWithAllfeatures(inputName, rating, category){
    return normalizedMovieList.filter(item => {
        const filteredcategory = category === 'All' || item.movie__categories.split('|').includes(category)

        return filteredcategory && item.movie__rating >= rating && item.movie__title.match(inputName)
    })
}