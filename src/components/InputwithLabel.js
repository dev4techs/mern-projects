import {React, useRef,useEffect} from "react";
import '../App.css';


const InputwithLabel=({id,value, type='text',onInputChange, isFocused,children})=>{
  
    const inputRef= useRef("");
    useEffect(()=>{
      if(isFocused && inputRef.current)
      {
        inputRef.current.focus();
        
      }
    });


return(
    <>
          <label htmlFor="search" className='label'>{children} </label>
          &nbsp;
          <input 
            ref={inputRef}
            id= {id}
            type={type}
            value={value}
            onChange={onInputChange} className="input" />
          {/* <p>Searching for {value}</p> */}
    </>
);
};

export default InputwithLabel;