import React from "react";
import '../App.css';
import InputwithLabel from "./InputwithLabel";


const SearchForm = ({searchTerm,onSearchInput,onSearchSubmit})=>
{
  return(
    <form className='search-form' onSubmit={onSearchSubmit}>
                <InputwithLabel 
                id="search"
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput} 
                >
                  <strong>Search Here:</strong> 
                </InputwithLabel>

                <button
                type="submit"
                disabled={!searchTerm}
                className='button button-large'
                >
                    Submit
                </button>
          </form>
  );
  

};

export default SearchForm;