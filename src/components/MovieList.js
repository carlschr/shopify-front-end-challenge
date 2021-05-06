import Movie from './Movie';

function MovieList({results, addNomination}) {
    const movies = (results) ? results.map((result, i) =>{
        return (i < 6) ? <Movie key={result.imdbID} movieData={result} addNomination={addNomination}/> : '';
    }) : <p>No results found.</p>
    return (
        <div className='MovieList'>
            {movies}
        </div>
    )
}

export default MovieList;