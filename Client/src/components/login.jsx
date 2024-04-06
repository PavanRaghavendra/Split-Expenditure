import axios from "axios";
import {useState } from "react"
import {useNavigate} from 'react-router-dom';
import image from './images/4957136.jpg'
import { Popup } from "./popup";
export function LoginPage()
{
    return <>
    <div className="h-full">
    <Main></Main>
    </div>
    </>
}
function Main()
{
    return <>
    <div className="bg-gray h-screen md:flex">
       <div id="leftpart" className="md:w-1/2">
        <img src={image} className="h-screen w-full"></img>
       </div>
       <div id="rightpart" className="md:w-1/2">
       <Input_details></Input_details>
       </div>
    </div>
    </>
}
function Input_details()
{
    const [userMail,setusername]=useState("");
    const [userPassword,setPassword]=useState("");
    const navigate = useNavigate();
    return <>
    <div className="bg-slate-300  flex h-screen justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-babypink w-80 text-center p-2 h-max px-4 border-2 border-black">
            <p className="text-center text-2xl pt-3 font-bold">Login</p>
            <p className="text-center">Enter your information</p>
                <p className="text-left pb-1 font-semibold">Email</p>
                <input  onChange={(e)=>
                {
                    setusername(e.target.value);
                }}placeholder="johndoe@example.com" className="border-2 border-black rounded-sm w-full pl-2 pt-2 pb-1"></input>
                <p className="text-left pb-1 font-semibold">Password</p>
                <input  onChange={(e)=>
                {
                    setPassword(e.target.value);
                }}placeholder="" type="password"className="border-2 border-black rounded-sm w-full pl-2 pt-2 pb-1"></input>
                <button onClick={ async ()=>
                {
                    try{
                    const response= await axios.get(`http://localhost:3001/api/user/getuser?userMail=${userMail}&userPassword=${userPassword}`);
        if(response.data.token!=null)
        {
        localStorage.setItem("token",response.data.token);
        Popup({title:"Success",text:"Signin Successfully",icon:"success"});
        navigate("/dashboard");
        }
    }catch(error)
    {
        if(error.response)
        {
            Popup({title:"error",text:"Enter Valid Credentials",icon:"error"});
        }
        else if(error.request)
        {
            Popup({title:"error",text:"Enter Valid Credentials",icon:"error"});
        }
        else{
            Popup({title:"error",text:"Enter Valid Credentials",icon:"error"});
        }
    }
                }}type="button" className="bg-third my-2 text-white bg-gray-800 font-medium rounded-lg text-xl px-5 py-2.5 me-2 mb-2 w-full">Login</button>
            </div>
        </div>
    </div>
    </>
}