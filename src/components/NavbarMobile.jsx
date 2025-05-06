import { Link, useNavigate } from "react-router"
import SessionContext from "../context/SessionContext";
import { useContext } from "react";
import supabase from "../supabase/supabase-client"
function NavbarMobile() {

    const navigate = useNavigate();
    const { session } = useContext(SessionContext);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) console.log(error);
        alert("Signed out 👋")
        navigate("/");
    }

    return (
        <div className="navbar-mobile d-lg-none ">
            <ul className="w-25 d-flex justify-content-center align-items-center">
                <li className="d-flex justify-content-center">
                    <a href="/">
                        <img src="./logo.png" className="logo-nav-img-mobile" alt="Logo HelixBit" />
                    </a>
                </li>
            </ul>
            <ul className="w-25 d-flex justify-content-center align-items-center">
                <li className="d-flex justify-content-center">
                    <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                        <img src="./category.png" className="logo-nav-img-mobile" alt="Logo HelixBit" />
                    </a>
                </li>
            </ul>
            <ul className="w-25 d-flex justify-content-center align-items-center">
                <li className="">
                    {session ?
                        <Link to="/profile">
                            <img src="./favorite.png" className="logo-nav-img-mobile" alt="Logo HelixBit" />
                            </Link>
                        :
                        <Link to="/register">
                            <img src="./favorite.png" className="logo-nav-img-mobile" alt="Logo HelixBit" />
                            </Link>
                    }
                </li>
            </ul>
            <ul className="w-25 d-flex justify-content-center align-items-center">
                <li className="d-flex justify-content-center">
                    <div className="dropdown">
                        <a className=" " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="./account.png" className="logo-nav-img-mobile" alt="Logo HelixBit" />
                        </a>
                        {session ?
                            <ul className="dropdown-menu blur-dropdown"
                                style={{ padding: '10px' }}>
                                <li className="py-2 my-1 blur-dropdown">
                                    <Link to="/account">Account Setting</Link>
                                </li>
                                <li className="py-2 my-1 justify-content-center d-flex ">
                                    <button className="btn btn-outline-danger blur-dropdown " onClick={signOut}>Logout</button>
                                </li>

                            </ul> :
                            <ul className="dropdown-menu blur-dropdown"
                                style={{ padding: '10px' }}>
                                <li className="py-2 my-1 blur-dropdown">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="py-2 my-1 blur-dropdown">
                                    <Link to="/register">Register</Link>
                                </li>

                            </ul>
                        }

                    </div>

                </li>
            </ul>
        </div>
    )
}

export default NavbarMobile