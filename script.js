const elMovieName = document.querySelector('#movie__name')
const elRating = document.querySelector('#movie__rating-input')
const elCategoriesSelect = document.querySelector('#categories-select')
const elSortingType = document.querySelector('.select-sort')
const elFilterButton = document.querySelector('.movie__filter-button')
const elList = document.querySelector('#movie__list')
const elBookmarkList = document.querySelector('.bookmark__list')
const elTemplate = document.querySelector('#movie__item-template').content
const elBookmarkTemplate = document.querySelector('#bookmark__template').content



// taking normalized movie list from data base
const movieArr = movies.slice(0, 10).map((item, index) => {
    const {Title, Categories, imdb_rating, ytid, summary, imdb_id} = item

    return {
        movie__id: imdb_id,
        movie__title: Title.toString(),
        movie__categories: Categories,
        movie__rating: imdb_rating,
        movie__img: ytid,
        movie__summary: summary,
        movie__isBookmarked: false
    }
})


function settingIsBookmarkedProperties (){

const storege = window.localStorage
const items = JSON.parse(storege.getItem('items'))

items.forEach(itemBookmark => {
    const movieItemIndex = movieArr.findIndex(itemMovie => {
        return itemBookmark.movie__id == itemMovie.movie__id
    })

    movieArr[movieItemIndex].movie__isBookmarked = true
})
}
settingIsBookmarkedProperties()





// rendering codes for all movies to HTML
function render(arrForRendering, placeForRendering){

    placeForRendering.innerHTML = null

    const fragment = document.createDocumentFragment()

    arrForRendering.forEach(item => {
        const template = elTemplate.cloneNode(true)
        const { movie__categories, movie__img, movie__rating, movie__title, movie__id, movie__isBookmarked} = item

        template.querySelector('.movie__img').src = `https://img.youtube.com/vi/${movie__img}/mqdefault.jpg`
        template.querySelector('.movie__title').textContent = movie__title
        template.querySelector('.movie__category').textContent = movie__categories.split('|').join(', ')
        template.querySelector('.movie__rating').textContent = movie__rating
        template.querySelector('.trailer-link').href = `https://www.youtube.com/watch?v=${movie__img}`
        template.querySelector('.more-info-btn').dataset.moreInfoId  = movie__id
        template.querySelector('.bookmark-btn').dataset.movieId = movie__id
        
        const classForBookmark = movie__isBookmarked ? 'bookmarked' : 'm'
        template.querySelector('.bookmark-btn').classList.add(classForBookmark)
        
        fragment.appendChild(template)
    })
    
    elList.previousElementSibling.textContent = `There is only ${arrForRendering.length} movies to watch`
    elList.previousElementSibling.classList.add()

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




// bookmark side
const storage = window.localStorage
const gettingItemLocalStorage = JSON.parse(storage.getItem('items'))

bookmarkArr = gettingItemLocalStorage || []




function renderinForBookmark(bookmarkArr, renderingPlaceForBookmark){

    renderingPlaceForBookmark.innerHTML = null
    const fragment = document.createDocumentFragment()

    bookmarkArr.forEach(item => {
        const { movie__title, movie__id} = item

        const bookmarkTemplate = elBookmarkTemplate.cloneNode(true)

        bookmarkTemplate.querySelector('.bookmark__title').textContent = movie__title       
        bookmarkTemplate.querySelector('.bookmark__btn').dataset.bookmarkId = movie__id    
        

        fragment.appendChild(bookmarkTemplate)
    })
    renderingPlaceForBookmark.appendChild(fragment)
}
renderinForBookmark(bookmarkArr, elBookmarkList)



elList.addEventListener('click', (evt) => {
    const bookmarkId = evt.target.dataset.movieId
    if(bookmarkId){
        const bookmarkItem = movieArr.find(item => {
            return item.movie__id == bookmarkId
        })

        const bookmarkItemIndex = movieArr.findIndex(item => {
            return item.movie__id == bookmarkId
        })  
        
        movieArr[bookmarkItemIndex].movie__isBookmarked = true
        render(movieArr, elList)
        
        const doesInclude = bookmarkArr.findIndex(item => {
            return item.movie__id == bookmarkId
        })

        if(doesInclude == -1){
            bookmarkArr.push(bookmarkItem)
            storage.setItem('items', JSON.stringify(bookmarkArr))
        }
        renderinForBookmark(bookmarkArr, elBookmarkList)
    }


    const moreInfoId = evt.target.dataset.moreInfoId
    if(moreInfoId){
        const bookmarkItem = movieArr.find(item => {
            return item.movie__id == moreInfoId
        })
        document.querySelector('#exampleModalLabel').textContent = bookmarkItem.movie__title
        document.querySelector('#modal-summary').textContent = bookmarkItem.movie__summary
    }
})



elBookmarkList.addEventListener('click', (evt) => {
    const bookmarkId = evt.target.dataset.bookmarkId
    
    const removingIndex = bookmarkArr.findIndex(item => item.movie__id == bookmarkId)
    

    const movieIdForDisableBookmark = bookmarkArr[removingIndex].movie__id
    const movieItemIndex = movieArr.findIndex(item => item.movie__id == movieIdForDisableBookmark)
    movieArr[movieItemIndex].movie__isBookmarked = false
    render(movieArr, elList)


    bookmarkArr.splice(removingIndex, 1)
    renderinForBookmark(bookmarkArr, elBookmarkList)
    storage.setItem('items', JSON.stringify(bookmarkArr))
})















