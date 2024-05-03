const elList = document.querySelector('#movie__list')
const elCounter = document.querySelector('#counter')
const elTemplate = document.querySelector('#template').content


let movieArr = movies.slice(0, 10)

counter.textContent = movieArr.length

const nomalizedMovieList = movieArr.map(item => {
    const {Title, movie_year,  ytid, imdb_rating} = item
    return {
        title: Title,
        year: movie_year,
        ytId: ytid,
        rating: imdb_rating
    }
})



function render(arr, renderingPlace){
    arr.forEach(item => {
        
        const {title, year,  ytId, rating} = item

        const newTemplate = elTemplate.cloneNode(true)

        console.log(newTemplate);

        
    
    })
    
}

render(nomalizedMovieList, elList)

