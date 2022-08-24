import React from 'react';
import '../App.css';

const List=({list,onRemoveItem})=>
{
  
  return(
    <div>
      { list.map((item)=>{
          return (
             <Item key={item.objectID} item={item} 
                    onRemoveItem={onRemoveItem}/>
   
          );
        })}
    </div>
  );
};

const Item=({item,onRemoveItem})=>{
  // const handleRemoveItem=(item)=>{
  //   onRemoveItem(item);
  // }
  return(<div className='item'>
        <span style={{width: '50%'}}>
                <a href={item.url}>
                {item.title}
                </a>
            </span>
            <span style={{width: '30%'}}>{item.author}</span>
            <span style={{width: '20%'}}>{item.points}</span>
            <button className='button button-small' type="button" onClick={()=>onRemoveItem(item)}>
              Dismiss
            </button>
  </div>);
};

export default List;