import { useEffect, useState } from "react"
import { Link } from "react-router"
import SearchBar from "./Searchbar"
import supabase from "../supabase/supabase-client"

function Header() {
    const [session, setSession] = useState(null);

    const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
            console.log(data);
            setSession(data);
        } else {
            setSession(null);
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert("Signed out 👋")
        getSession();
    }


    useEffect(() => {
        getSession();
    }, []);

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
                        <Link to="#">Login</Link>
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