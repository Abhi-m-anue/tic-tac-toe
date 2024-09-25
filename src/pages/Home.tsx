import { Link } from "react-router-dom"

const Home = ()=>{
    return (
        <>
        <h1>choose game type</h1>
        <Link to={'/game'}>VS AI</Link>
        </>
    )
}

export default Home