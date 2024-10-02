import '../App.css'
import { Link } from "react-router-dom"
import { Bot, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Home = ()=>{
    return (
        <>
        <div className="flex flex-col items-center justify-center h-5/6 gap-5 w-4/5 mx-auto">
        <Link to={'/game'}><Button className="p-5 h-14 w-52 gap-5 hover:bg-slate-300 hover:text-black slide-to-right">VS AI<Bot size={30}></Bot></Button></Link>
        {/* <Link to={'/online'}><Button className="w-52 h-14 p-5 gap-5 hover:bg-slate-300 hover:text-black">Local multiplayer<Users size={30}></Users></Button></Link> */}
        <Link to={'/online-lobby'}><Button className="w-52 h-14 p-5 gap-5 hover:bg-slate-300 hover:text-black slide-to-left">Online multiplayer<Globe size={30}></Globe></Button></Link>
        </div>
        </>
    )
}

export default Home