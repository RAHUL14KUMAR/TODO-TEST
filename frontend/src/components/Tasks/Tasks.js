import React from 'react'
import AddToDo from '../addToTask';
import Tasking from '../Task/Task';
import Navbar from '../Navbar'

function Tasks() {
  return (
    <div className='flex flex-col items-center
    justify-center w-screen h-screen bg-violet-200'>
        <div className='p-5 text-center bg-white rounded-lg'>
            <div className='border-b-4 border-b-violet-800'>
            <h1 className='font-bold text-2xl text-violet-800'>TODO REACT APP !!!</h1>
            </div>
            

            <div className="m-1">
                <Navbar/> 
            </div>
            <div className="mt-2">
                <AddToDo/>
            </div>
        </div>
        <div className="mt-2 text-center bg-white rounded-lg w-96 h-1/4">
            <Tasking/>
        </div>
    </div>
  )
}

export default Tasks
