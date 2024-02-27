import {Link}from "react-router-dom"
function Navbar() {
  return (
    <div className="flex justify-space-between items-center border-b-4 border-b-violet-800 w-full">
        <Link to="/" className='m-5 text-violet-900 bg-violet-100 p-4 rounded-lg hover:bg-violet-300 font-bold font-mono active:bg-violet-300'>
            All
        </Link>
        <Link to="/?todos=active" className='m-5 text-violet-900 bg-violet-100 p-4 rounded-lg hover:bg-violet-300 font-bold font-mono active:bg-violet-300'>
            Active
        </Link>
        <Link to="/?todos=completed" className='m-5 text-violet-900 bg-violet-100 p-4 font-bold font-mono rounded-lg hover:bg-violet-300 active:bg-violet-300'>
            Completed
        </Link>
    </div>
  )
}

export default Navbar
