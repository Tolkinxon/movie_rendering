const elMovieName = document.querySelector('#movie__name')
const elRating = document.querySelector('#movie__rating-input')
const elCategoriesSelect = document.querySelector('#categories-select')
const elSortingType = document.querySelector('.select-sort')
const elFilterButton = document.querySelector('.movie__filter-button')
const elCounter = document.querySelector('#counter')
const elList = document.querySelector('#movie__list')
const elTemplate = document.querySelector('#template').content


// let movieArr = movies.slice(0, 50) // taking of part movie list

// elCounter.textContent = movieArr.length // counting length of movies




// // normalized list for using better ------------------------------------------------------
// const normalizedMovieList = movieArr.map(item => {
//     const {Title, movie_year,  ytid, imdb_rating, Categories} = item
//     return {
//         movie__title: Title.toString(),
//         movie__year: movie_year,
//         movie__ytId: ytid,
//         movie__rating: imdb_rating,
//         movie__categories: Categories
//     }
// })
// //----------------------------------------------------------------------------------------




// //rendering place for movie list  ---------------------------------------------------------------------------
// function render(arr, renderingPlace){

//     renderingPlace.innerHTML = null
    
//     const fragment = document.createDocumentFragment()

//     arr.forEach(item => {

//         const {movie__title,  movie__ytId, movie__rating, movie__categories} = item

//         const newTemplate = elTemplate.cloneNode(true)

//         newTemplate.querySelector('.movie__img').src = `https://img.youtube.com/vi/${movie__ytId}/mqdefault.jpg`
//         newTemplate.querySelector('.movie__title').textContent = movie__title
//         newTemplate.querySelector('.movie__category').textContent = movie__categories.split('|').join(', ')
//         newTemplate.querySelector('.movie__rating').textContent = movie__rating

//         fragment.appendChild(newTemplate)
//     })
//     renderingPlace.appendChild(fragment)
// }




// render(normalizedMovieList, elList) // rendering movie list
// //----------------------------------------------------------------------------------------





// // taking category list from movie list ------------------------------------------------------...

// function categoriesList (normal) {
//     const categoryListarr = []

//     normal.forEach(item => {
//        let oneItemCategory = item.movie__categories.split('|')
     
//        oneItemCategory.forEach(item => {
//          if(!(categoryListarr.includes(item))){
//             categoryListarr.push(item)
//          }
//        })
//      })

//      let sortedList = categoryListarr.sort()

//      sortedList.unshift('All')


 

//     renderCategoriesList(sortedList, elCategoriesSelect)
// }   

// categoriesList(normalizedMovieList) 

// // -------------------------------------------------------------------------------------------




// // rendering category list to select for choosing category -----------------------------------
// function renderCategoriesList(categoriesList, renderingPlace) {

 
//     renderingPlace.innerHTML = null
    
//     const fragment = document.createDocumentFragment()

//     categoriesList.forEach(item => {
//         const newOption = document.createElement('option')

//         newOption.value = item
//         newOption.textContent = item

//         fragment.appendChild(newOption)
//     })
//     renderingPlace.appendChild(fragment)
// }

//  // rendering category list to select tag
// //-------------------------------------------------------------------------------------------------






// elFilterButton.addEventListener('click', (evt) => {

//     const inputName = elMovieName.value.trim()
//     const rating = elRating.value
//     const category = elCategoriesSelect.value
    

//     const pattern = new RegExp(inputName, 'gi')


//      const filteredMovies = filterWithAllfeatures(pattern, rating, category)


//     if(elSortingType.value == 'high'){
//         filteredMovies.sort((a, b) => {
//            return b.movie__rating - a.movie__rating
//         })
//     }
//     if(elSortingType.value == 'low'){
//         filteredMovies.sort((a, b) => {
//            return a.movie__rating - b.movie__rating
//         })
//     }



//      render(filteredMovies, elList) 
//      categoriesList(filteredMovies) 
//      elCounter.textContent = filteredMovies.length 
// })

// function filterWithAllfeatures(inputName, rating, category){
//     return normalizedMovieList.filter(item => {
//         const filteredcategory = category === 'All' || item.movie__categories.split('|').includes(category)

//         return filteredcategory && item.movie__rating >= rating && item.movie__title.match(inputName)
//     })
// }


const somethign = 0





// taking normalized movie list from data base
const movieArr = movies.slice(0, 15).map(item => {
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
        template.querySelector('.movie__category').textContent = movie__categories
        template.querySelector('.movie__rating').textContent = movie__rating
        
        fragment.appendChild(template)
    })
    elCounter.textContent = arrForRendering.length
    placeForRendering.appendChild(fragment)
}
render(movieArr, elList)





// rendering codes for all filtered categories to HTML
function renderingFilteredCategories(movieList, renderingPlace){
     
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
    const movieName = elMovieName.value.trim()
    const movieRating = elRating.value
    const movieCategory = elCategoriesSelect.value

    filteringByNameRatingAndCategories(movieName, movieRating, movieCategory)
})

function filteringByNameRatingAndCategories(movieName, movieRating, movieCategory) {
    console.log(movieName, movieRating, movieCategory)
}