const elMovieName = document.querySelector('#movie__name')
const elRating = document.querySelector('#movie__rating-input')
const elCategoriesSelect = document.querySelector('#categories-select')
const elSortingType = document.querySelector('.select-sort')
const elFilterButton = document.querySelector('.movie__filter-button')
const elCounter = document.querySelector('#counter')
const elList = document.querySelector('#movie__list')
const elTemplate = document.querySelector('#template').content


// taking normalized movie list from data base
const movieArr = movies.slice(0, 50).map(item => {
    const {Title, Categories, imdb_rating, ytid} = item

    return {
        movie__title: Title.toString(),
        movie__categories: Categories,
        movie__rating: imdb_rating,
        movie__img: ytid
    }
})


// rendering codes for all movies to HTML
function render(arrForRendering, placeForRendering){

    placeForRendering.innerHTML = null

    const fragment = document.createDocumentFragment()

    arrForRendering.forEach(item => {
        const template = elTemplate.cloneNode(true)
        const { movie__categories, movie__img, movie__rating, movie__title} = item

        template.querySelector('.movie__img').src = `https://img.youtube.com/vi/${movie__img}/mqdefault.jpg`
        template.querySelector('.movie__title').textContent = movie__title
        template.querySelector('.movie__category').textContent = movie__categories.split('|').join(', ')
        template.querySelector('.movie__rating').textContent = movie__rating
        
        fragment.appendChild(template)
    })
    elCounter.textContent = arrForRendering.length
    placeForRendering.appendChild(fragment)
}
render(movieArr, elList)





// rendering codes for all filtered categories to HTML
function renderingFilteredCategories(movieList, renderingPlace){
     
    renderingPlace.innerHTML = null
    filteredCategoryList = []
    const fragment = document.createDocumentFragment()

    movieList.forEach(item => {
        const { movie__categories } = item

        const splittedCategories = movie__categories.split('|')

        splittedCategories.forEach(item => {
            if(!filteredCategoryList.includes(item)){
                filteredCategoryList.push(item)
            }
        })       
    })

    filteredCategoryList.sort()
    filteredCategoryList.unshift('All')

    filteredCategoryList.forEach(item => {
        const option = document.createElement('option')

        option.textContent = item
        option.value = item
    
        fragment.appendChild(option)
    }) 

    renderingPlace.appendChild(fragment)
}
renderingFilteredCategories(movieArr, elCategoriesSelect)






elFilterButton.addEventListener('click', (evt) =>  {
    eventFunction()
})

document.addEventListener('keydown', (evt) =>  {
    if(evt.code == 'Enter'){
        eventFunction()
    }
})

function eventFunction(){
    const movieName = elMovieName.value.trim()
    const movieRating = elRating.value
    const movieCategory = elCategoriesSelect.value

    const pattern = new RegExp(movieName, 'gi')

    const filtredMovies = filteringByNameRatingAndCategories(pattern, movieRating, movieCategory)

    if(elSortingType.value == 'high') {
        filtredMovies.sort((b, a) => {
            return a.movie__rating - b.movie__rating 
        })
    }
    if(elSortingType.value == 'low') {
        filtredMovies.sort((a, b) => {
            return a.movie__rating - b.movie__rating 
        })
    }



    renderingFilteredCategories(filtredMovies, elCategoriesSelect)
    elCounter.textContent = filtredMovies.length
    render(filtredMovies, elList)
}


function filteringByNameRatingAndCategories(movieName, movieRating, movieCategory) {
    
    return movieArr.filter(item => {

        const { movie__categories, movie__rating, movie__title} = item
      

        const filteredCategory = movieCategory == 'All' || movie__categories.slice('|').includes(movieCategory)
       
        return filteredCategory && movie__rating >= movieRating && movie__title.match(movieName)
    })
}