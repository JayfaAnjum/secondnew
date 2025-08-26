import { useState,useEffect } from "react";

export default  function Demo(){
const [count,setCount]=useState(0);

const updateCount=()=>{
    
    
    
    setCount((previous)=>previous+1)};

    useEffect(()=>{

        console.log(`screen render ${count}`);
    },[count]);



return (
    <div>
        i have render {count} times.

        <button onClick={updateCount}>
        click here
    </button>
    </div>
    
)
    
}








// const [list1,setList]=useState([]);
//     const [count,setCount]=useState(1);


//     const add=()=>{
//         const itemName="item"+count;
//    setList((previous)=>(

//  [
//     ...previous,itemName
// ]

//    ))

//    setCount((previous1)=>(

    
//         previous1+1
    
//    ))

// }

//  return(
// <div>
//    {
// list1.map((l1,index)=>(

//     <li key={index}>
//         {l1}
//     </li>
// ))

//    }

//    <button onClick={add}>
//     add item
//    </button>


// </div>
//  )
    