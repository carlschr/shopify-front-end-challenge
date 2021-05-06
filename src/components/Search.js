function Search({handleChange}) {
    return (
        <form className='Search'>
            <label htmlFor='movie'>Enter a Movie Title to Make a Nomination</label>
            <input onChange={handleChange} id='movie' type='text' />
        </form>
    )
}

export default Search;