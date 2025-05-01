import { useContext } from "react"
import { Link, useNavigate } from "react-router"
import SearchBar from "./Searchbar"
import supabase from "../supabase/supabase-client"
import SessionContext from "../context/SessionContext"

function Header() {
    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error);
        alert("Signed out 👋")
        navigate("/");
    }

    
    

    return (
        <nav className="nav-custom">
            <div className="logo-nav"><a className="d-flex justify-content-end" href="/"><img src="./logo.png" className="logo-nav-img" alt="Logo HelixBit" /></a></div>
            <div className="search-nav">
                <SearchBar />
            </div>
            <div className="list-nav">
                {session ? (
                    <div className="d-flex flex-column align-items-center">
                        <ul className="d-flex p-0 m-0 aling-items-center">
                        <li className="mx-2 d-flex align-items-center">
                            <img src="" alt="" />
                            </li>
                            <li className="mx-2 d-flex align-items-center">
                            <p className="m-0">Hey {session?.user.user_metadata.first_name} ✌️</p>
                            </li>
                            <li className="mx-2 d-flex align-items-center">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="mx-2 d-flex align-items-center">
                                <Link to="/account">Account Setting</Link>
                            </li>
                            <li className="mx-2">
                                <button className="btn btn-outline-danger " onClick={signOut}>Logout</button>
                            </li>
                        </ul>
                    </div>

                ) : (
                <ul className="d-flex p-0 m-0 aling-items-center">
                    <li className="mx-2 d-flex align-items-center">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="mx-2 d-flex align-items-center">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>)}

            </div>
        </nav>
    )
}

export default Header