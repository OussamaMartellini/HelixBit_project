import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import NavbarMobile from "../components/NavbarMobile";
import GenresDropdown from "../components/GenresDropdown";
function Layout() {
    return (
        <div className="layout-system container-fluid p-0">
            <Header />
            <NavbarMobile />
            <video autoPlay muted loop className="background-video">
                <source src='/bg.mp4' type="video/mp4" />
                Il tuo browser non supporta il formato video.
            </video>

            <div className=" w-100 d-flex content">

                <div className="main-container">
                    <div className="col-1 side-container p-0 d-lg-block d-none">
                        <Sidebar />
                    </div>

                    <main className=" main-content p-0 d-flex justify-content-center">
                        <Outlet />
                    </main>
                </div>

                <Footer />
            </div>

            {/* category */}
            <div className="offcanvas offcanvas-start " tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"
            data-bs-scroll="false">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Category</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <GenresDropdown/>
                    </div>
                   
                </div>
            </div>

        </div>
    )
}

export default Layout