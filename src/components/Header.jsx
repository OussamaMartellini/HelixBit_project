import SearchBar from "./Searchbar"

function Header(){
    return(
        <nav className="nav-custom">
            <div className="logo-nav"><a href="/">Logo</a></div>
            <div className="search-nav">
                <SearchBar />
            </div>
            <div className="list-nav"> List</div>
        </nav>
    )
}

export default Header