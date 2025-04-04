import { Outlet } from "react-router";
import Header from "../components/header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
function Layout() {
    return (
        <div className="layout-system container-fluid p-0">
            <Header />
            <video autoPlay muted loop className="background-video">
                <source src='/test10.mp4' type="video/mp4" />
                Il tuo browser non supporta il formato video.
            </video>

            <div className=" w-100 d-flex content">

                <div className="main-container">
                    <div className="col-1 side-container p-0">
                        <Sidebar />
                    </div>

                    <main className=" main-content p-0">
                        <Outlet />
                    </main>
                </div>

                <Footer />
            </div>



        </div>
    )
}

export default Layout