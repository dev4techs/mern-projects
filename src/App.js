
import { React, useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import './App.css';
import List from './components/List';
import SearchForm from './components/SearchForm';


const API_ENDPOINTS = 'https://hn.algolia.com/api/v1/search?query=';

//Reducers
const storiesReducer = (state,action)=>{
  switch(action.type)
  {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
      
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
      
      case 'STORIES_FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true
        };
      
      case 'REMOVE_STORY':
        return {
          ...state,
          data: state.data.filter(
        (story)=>action.payload.objectID !== story.objectID)
          };
      default:
        throw new Error();
  }
}


//building a custom hook
const useSemiPersistentState = (key,initialSate)=>{
    const [value,setValue] = useState(
    localStorage.getItem(key) || initialSate);
  
    useEffect(()=>{
      localStorage.setItem(key,value)
    },[value,key]);

    return [value,setValue];
};

const App=()=> {
  const initialStories = [
    {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
    },
    {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
    },
    ];

    const getAsyncStories =()=>{
      return new Promise((resolve)=>{
        setTimeout(()=>resolve({data: {stories: initialStories}}),2000)});
      // return new Promise((resolve,reject)=>setTimeout(reject,2000));
    }
    const [searchTerm,setSearchTerm] = useSemiPersistentState('search','React');
    const [url,setUrl] = useState(`${API_ENDPOINTS}${searchTerm}`);
    // const [stories,setStories] = useState([]);

    const [stories,dispatchStories] = useReducer(storiesReducer,
      {data: [], isLoading: false, isError: false});

    // const [isLoading, setIsLoading] = useState(false);

    // const [isError, setIsError] = useState(false);

    const handleFetchStories = useCallback(async()=>{
      // if(!searchTerm) 
      // {return;}

      dispatchStories({type: 'STORIES_FETCH_INIT'});
      
      // getAsyncStories()
      // fetch(url)
      try{
        const result= await axios.get(url);
        dispatchStories(
          {
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.hits
            // payload: result.data.stories
          }
          );
      }
      catch
      {
        dispatchStories({type: 'STORIES_FETCH_FAILURE'});
      }
      
        // .then((resp)=>resp.json())
        // .then((result)=>{
          
        },[url]);
        

    useEffect(()=>{
      handleFetchStories();
    },[handleFetchStories])


    //callback Handler function
    const handleSearchInput=(event)=>{
      setSearchTerm(event.target.value);
    };

    const handleSubmitSearch=(event)=>{
      setUrl(`${API_ENDPOINTS}${searchTerm}`);
      event.preventDefault();
    }

    // const searchedStories = stories.data.filter((story)=>{
    //   return story.title
    //   .toLowerCase()
    //   .includes(searchTerm.toLowerCase());
    // });

    const handleRemoveStory=(item)=>{
            dispatchStories({
              type: 'REMOVE_STORY',
              payload: item
            });
    };


  return (
    <div className="container">
      {/* <header className="App-header"> */}

          <h1 className='headline-primary'>My Hacker Stories </h1>
          
         <SearchForm 
            searchTerm={searchTerm}
            onSearchInput ={handleSearchInput}
            onSearchSubmit = {handleSubmitSearch}
         /> 

        {stories.isError && <p>Something went wrong ....</p>}
        {
          stories.isLoading ? (<p>Loading.....</p>) : (
                                              <List list={stories.data}
                                                    onRemoveItem={handleRemoveStory}/>)
        }
        
      {/* </header> */}
    </div>
  );
};

export default App;
