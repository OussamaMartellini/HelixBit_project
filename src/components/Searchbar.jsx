import { useState } from "react";
import { useNavigate } from "react-router"

function SearchBar() {
    const navigate = useNavigate();
    const[ search, setSearch ]= useState("");
    const[ areaInvalid, SetAreaInvalid ]= useState(null);

    const handleSearch = (event) => {
        event.preventDefault();
        if (typeof search === 'string' && search.trim().length !== 0 ) {
            navigate(`search?query=${search}`)
            setSearch("")  
            
        } else {
            SetAreaInvalid(true.toString())
            
        }
    };
    

    return(
        <form onSubmit={handleSearch}>
            <fieldset role="group">
                <input type="text"
                name="search"
                placeholder={areaInvalid ? "devi cercare qualcosa" : "search a game"}
                onChange={(event => setSearch(event.target.value))}
                value={search}
                area-invalid={areaInvalid}
                />
                <input type="submit" value={"Go"} />
            </fieldset>
        </form>
    )
}

export default SearchBar