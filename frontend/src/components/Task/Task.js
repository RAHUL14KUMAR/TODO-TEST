import React,{useEffect,useState} from 'react'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import {useSearchParams} from 'react-router-dom'
import axios from 'axios'

function Task() {
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const[Todo,setTodo]=useState([]);

    let todosdata=searchParams.get("todos")

    let filterData=Todo;

    if(todosdata=="active"){
      filterData=Todo.filter(task=>!task.completed)
    }
    if(todosdata=="completed"){
      filterData=Todo.filter(task=>task.completed)
    }

    useEffect(()=>{
        const a =JSON.parse(localStorage.getItem("user"))

        if(!a){
            navigate('/login');
            return;
        }else{
            navigate('/')
            getRes();
            return;
        }
    },[Todo])

    

    async function getRes(){

      const tokens=JSON.parse(localStorage.getItem("user")).token

      let config = {
        headers: { 
          'Authorization': `Bearer ${tokens}`
        }
      };
      const res=await axios.get(`${process.env.REACT_APP_SERVER_BASE}/task/get`,(config))
      
      if(res.data.message==="no task has benn added by user"){
        setTodo([]);
      }else{
        setTodo(res.data.message);
      }
    }

    const ToDoCompleted=async(id)=>{
      const tokens=JSON.parse(localStorage.getItem("user")).token
      let data = JSON.stringify({
        "completed": true
      });
      
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER_BASE}task/update/${id}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${tokens}`
        },
        data : data
      };
      
      const res=await axios.request(config)
    
    }
    const handleDeleteToDo=async(id)=>{
    
      const tokens=JSON.parse(localStorage.getItem("user")).token
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_SERVER_BASE}task/delete/${id}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${tokens}`
        },
      };
      
      const res=await axios.request(config);
      console.log(res)
    }

  return (
    <div className=''>
      {Todo.length>0?
        <ul className='list-none'>
          {filterData.map((todo)=>{
            return <li key={todo._id} className='border-b-2 border-b-violet-300 p-2 m-2'>
              <input type="checkbox" id={`${todo._id}`} checked={todo.completed}
                onChange={()=>ToDoCompleted(todo._id)}
                className='border-b-2 border-b-violet-300'
              />
               <label htmlFor="" className={`ml-5 text-violet-950 font-mono ${todo.completed? 'line-through' : ''}`}>{todo.description}</label>
                {
                  todo.completed&&<button className='bg-violet-200 font-mono p-1 font-black hover:bg-violet-300 rounded-sm ml-5'
                   onClick={()=>handleDeleteToDo(todo._id)}
                  >Delete</button>
                }
            </li>
          })}
        </ul>
      :
      <div className='p-2'>
        <p className="font-bold font-mono text-violet-600">No Task Has been added ByUser</p>
      </div>

      }
    </div>
  )
}

export default Task
