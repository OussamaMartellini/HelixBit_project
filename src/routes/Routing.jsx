import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import HomePage from "../Pages/HomePage";
import ErrorPage from "../Pages/error";
import GenrePage from "../Pages/GenrePage";
import GamePage from "../Pages/GamePage";
import SearchPage from "../Pages/SearchPage";
import RegisterPage from "../Pages/Register";
import LoginPage from "../Pages/Login";
import AccountPage from "../Pages/Account";
import ProfilePage from "../Pages/Profile";

function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />} >
                    {/* pagina di errore */}
                    <Route path="*" element={<ErrorPage />} />

                    {/* pagina home */}
                    <Route path="/" element={<HomePage />} />

                    {/* pagina dettaglio genere */}
                    <Route path="/games/:genre" element={<GenrePage />} />

                    {/*  pagina dettaglio gioco */}
                    <Route path="/games/:slug/:id" element={<GamePage />} />

                    {/* pagina delle ricerche */}
                    <Route path="/search" element={<SearchPage />} />
                    
                    {/* pagina di registrazione */}
                    <Route path="/register" element={<RegisterPage />}/>

                    {/* pagina di accesso */}
                    <Route path="/login" element={<LoginPage />}/>

                    {/* pagina del modifica profilo */}
                    <Route path="/account" element={<AccountPage />}/>

                    {/* pagina Profilo */}
                    <Route path="/profile" element={<ProfilePage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Routing