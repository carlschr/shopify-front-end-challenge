import './css/App.css';
import Title from './components/Title';
import Search from './components/Search';
import MovieList from './components/MovieList';

import {useState, useEffect} from 'react';

function App() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState([]);

  const handleChange = e => {
    const val = e.target.value;
    setInput(val);
    if (!val) {
      setResults([]);
    }
  }

  const addNomination = e => {
    e.preventDefault();
    const id = e.target.dataset.id;
    console.log(id);
    setNominations([...(nominations || []), id]);
  }

  useEffect(() => {
    console.log(input);
    const apiCall = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${input}&type=movie`;
    const fetchMovies = async () => {
      const data = await fetch(apiCall);
      const movies = await data.json();
      console.log(movies.Search);
      if (movies.Response === 'False') {
        setResults([]);
        return;
      };
      setResults(movies.Search);
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
