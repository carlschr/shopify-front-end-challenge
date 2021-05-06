import './css/App.css';
import Title from './components/Title';
import Search from './components/Search';
import MovieList from './components/MovieList';

import {useState, useEffect} from 'react';

function App() {
  //States
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  //Function to handle input value change
  const handleChange = e => {
    const val = e.target.value;
    setInput(val);
    //If the input value is an empty string
    //the results are reset to empty
    if (!val) {
      setResults([]);
    }
  }

  //Function to push a nomination to the nominations state
  const addNomination = e => {
    e.preventDefault();
    const id = e.target.dataset.id;
    //If nominations already contains the id of the new nomination
    //then the function stops
    if (nominations.indexOf(id) !== -1) return;
    setNominations([...(nominations || []), id]);
  }

  //Effect that occurs on input state change
  useEffect(() => {
    const apiCall = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${input}&type=movie`;
    const fetchMovies = async () => {

      const data = await fetch(apiCall);
      const movies = await data.json();

      //If their is a bad response the function is stopped
      //and the results are reset to empty
      if (movies.Response === 'False') {
        setResults([]);
        return;
      };

      //Initialize empty array to copy results into
      let newResults = [];
      //Function to check for duplicates
      const hasId = (arr, id) => {
        let returnVal = false;
        arr.forEach(entry => {
            if (entry.imdbID === id) returnVal = true;
        })
        return returnVal;
      }

      //Loops through results to remove duplicates
      movies.Search.forEach(movie => {
        console.log(hasId(newResults, movie.imdbID));
        if (hasId(newResults, movie.imdbID)) return;
        newResults.push(movie);
      })

      //Sets non-duplicate results
      setResults(newResults);
    };

    fetchMovies();

  }, [input])

  useEffect(() => {
    console.log(nominations);
  }, [nominations])

  return (
    <div className="App">
      <Title/>
      <Search handleChange={handleChange}/>
      <MovieList results={results} addNomination={addNomination}/>
    </div>
  );
}

export default App;