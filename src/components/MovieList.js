import Movie from './Movie';

function MovieList({results}) {
    const movies = (results) ? results.map(result =>{
        return <Movie key={result.imdbID} movieData={result}/>
    }) : <p>No results found.</p>
    return (
        <div className='MovieList'>
            {movies}
        </div>
    )
}

export default MovieList;