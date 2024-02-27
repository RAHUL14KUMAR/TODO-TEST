import {useState} from "react"
import axios from 'axios'
import { toast } from "react-toastify";

function AddToDo() {
    const [todo,setToDo]=useState("");

    const handleSubmit=async(e)=>{
        const tokens=JSON.parse(localStorage.getItem("user")).token
    
        e.preventDefault();

        console.log(tokens)

        let data = JSON.stringify({
            "description": todo
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_SERVER_BASE}/task/add`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${tokens}`
            },
            data : data
          };
          console.log(config.url)
          
          const res=await axios.request(config)
          setToDo("");
          window.location.reload(); 
          toast.info(res.data.message)
          
    }
  return (
    <form onSubmit= {handleSubmit}>
        <input type="text" value={todo} onChange={(e)=>setToDo(e.target.value)} className="mx-2 w-fit bg-violet-300 p-2 font-mono text-black placeholder-violet-800 focus:outline-none"/>

        <button type="submit" className="bg-violet-400 p-2 rounded-lg hover:bg-violet-800 hover:text-white
        ">Add</button>
    </form>
  )
}

export default AddToDo
