function Movie({movieData}) {
    const poster = (movieData.Poster !== 'N/A') ? movieData.Poster : 'https://via.placeholder.com/300/000/FFF?text=No+Poster+Available'
    return (
        <div className='Movie'>
            <h5>{movieData.Title}</h5>
            <p>Released: {movieData.Year}</p>
            <img src={poster}/>
        </div>
    )
}

export default Movie;