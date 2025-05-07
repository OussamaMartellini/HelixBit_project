import { useContext, useState, useEffect } from "react"
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

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          
          setShowNavbar(false);
        } else {
          
          setShowNavbar(true);
        }
  
        setLastScrollY(currentScrollY);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);




    return (
        <nav className={`nav-custom ${showNavbar ? `show` : `hide`}`}>
            <div className="logo-nav d-lg-block d-none">
                <a className="d-flex justify-content-end align-items-center" href="/">
                    <img src="./logo.png" className="logo-nav-img" alt="Logo HelixBit" />
                </a>
            </div>
            <div className="search-nav">
                <SearchBar />
            </div>
            <div className="list-nav d-lg-flex d-none">
                {session ? (
                    <div className="d-flex flex-column align-items-center">
                        <ul className="d-flex p-0 m-0 aling-items-center">
                            <li className="mx-2 d-flex align-items-center">
                                <p className="m-0">Hey {session?.user.user_metadata.first_name} ✌️</p>
                            </li>
                            <li className="mx-2 d-flex align-items-center">
                                <Link to="/profile">Favorite</Link>
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
                    <ul className="d-flex p-0 m-0 align-items-center">
                        <li className="mx-2 d-flex align-items-center fw-bolder">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="mx-2 d-flex align-items-center fw-bolder">
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>)}

            </div>
        </nav>
    )
}

export default Header