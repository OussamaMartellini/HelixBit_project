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
            <div className="logo-nav"><a href="/">Rehactor</a></div>
            <div className="search-nav">
                <SearchBar />
            </div>
            <div className="list-nav">
                {session ? (
                    <ul>
                        <li>
                            <details className="dropdown">
                                <summary>Account</summary>
                                <ul dir="rtl">
                                    <li><a href="#">Settings</a></li>
                                    <li><button onClick={signOut}>Logout</button></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                ): (<ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>)}
                
            </div>
        </nav>
    )
}

export default Header