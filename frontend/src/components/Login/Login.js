import React,{useState,useEffect} from 'react'
import {BsHospital, BsListTask} from 'react-icons/bs'
import { MdOutlineMailOutline } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";


import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Loader/Loading';


function Login() {
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [load,setLoad]=useState(false);

    const loginMe=async()=>{

        if(email=="" || password==""){
            toast.warning("enter all details");
            return;
        }

        setLoad(true);

        const res=await axios.post(`${process.env.REACT_APP_SERVER_BASE}/user/login`,{email,password});

        if(res.status===200){
            toast.success("user logged in successfull");
            navigate('/')
            localStorage.setItem(
                "user",
                JSON.stringify({
                  id: res.data._id,
                  name: res.data.name,
                  email: res.data.email,
                  token:res.data.token,
                  role:res.data.role
                })
              );
              setLoad(false)
            return;
            
        } else if(res.status===203){
            toast.info(res.data);
            setLoad(false)
            return;
        }
    }
    useEffect(()=>{
        const a =JSON.parse(localStorage.getItem("user"))
        setLoad(true);

        if(!a){
            toast.dark("you are not logged in")
            navigate('/login');
            setLoad(false);
            return;
        }else{
            navigate('/')
            setLoad(false)
            return;
        }
    },[])

  return (
    <div className={`flex h-screen w-screen items-center justify-center ${load === true ? 'bg-white' : 'bg-violet-200'}`}>
        {!load && <div className="flex-col rounded-lg bg-white text-center drop-shadow-2xl">
            <div className="flex-col p-2">
                <div className="mx-auto my-auto flex items-center justify-center h-24 w-24 rounded-full bg-violet-100">
                    <BsListTask className="text-4xl text-violet-600" />
                </div>
                <h1 className="font-sans font-bold text-violet-600">TODO-LIST</h1>
            </div>

            <div className="mb-5 text-2xl font-bold">
                <h1>Looking For Add Task !!!</h1>
                <p className="text-base font-normal text-violet-950">Login here</p>
            </div>

            <div className="m-2 flex-col">

                <div className="border-r-none m-5 flex rounded-lg border-l-4 border-l-violet-800 bg-violet-100 p-3 text-justify">
                    <div className="h-16 w-14 bg-violet-300 flex items-center justify-center">
                        <MdOutlineMailOutline className="text-4xl text-violet-600"/>
                    </div>
                    <form className="flex-col">
                    <label className="m-2 font-bold text-violet-800" htmlFor="email">Email</label>
                    <div><input type="text" placeholder="enter your email" className="mx-2 w-fit bg-violet-100 p-2 font-mono text-black placeholder-violet-500 focus:outline-none" id="email" name={email} value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
                    </form>
                </div>

                <div className="border-r-none m-5 flex rounded-lg border-l-4 border-l-violet-800 bg-violet-100 p-3 text-justify">
                    <div className="h-16 w-14 bg-violet-300 flex items-center justify-center">
                        <TbPasswordFingerprint className="text-4xl text-violet-600"/>
                    </div>
                    <form className="flex-col">
                    <label className="m-2 font-bold text-violet-800" htmlFor="password">Password</label>
                    <div><input type="password" placeholder="enter your password" className="mx-2 w-fit bg-violet-100 p-2 font-mono text-black placeholder-violet-500 focus:outline-none" id="password"  name={password} value={password} onChange={(e)=>setPassword(e.target.value)} /></div>
                    </form>
                </div>

                <div className="m-3 mb-2">
                    <button className="w-full rounded-lg bg-violet-600 p-3 font-sans text-xl font-medium text-white" onClick={loginMe}>Login</button>
                </div>

                <div className='font-medium hover:underline'>
                    <Link to='/register'>New User? Register Here</Link>
                </div>
            </div>
        </div>}
        {
            load && <div>
                <Loading/>
            </div>
        }
    </div>
  )
}

export default Login
