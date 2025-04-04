import useFetchSolution from "../hook/useFetchSolution";
import { useState } from "react";
import { Link } from "react-router";
import LazyLoadCategoryIcon from "./LazyLoadCategoryIcon";

function GenresDropdown() {
    

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const initialUrl = `${apiUrl}genres?key=${apiKey}`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
    

    const [isHidden, setIsHedden] = useState(true);

    const toggleVisibility = () => {
        setIsHedden((prev) => (!prev))
    }

    return (
        <div className="dropdown-genres">
            <h3 className="fw-bold">Genres</h3>
            {error && <small>{error}</small>}
            <ul className="genres-list">
                {data && data.results.slice(0, isHidden ? 3 : data.results.length).map((genre) => (
                    <li key={genre.id} >
                        <Link to={`/games/${genre.slug}`}  className="d-flex align-items-center my-2">
                            <div className="logo-category  me-2">
                                <LazyLoadCategoryIcon image={genre.image_background} title={genre.name} />
                            </div>
                            <p className="m-0" >{genre.name}</p>
                        </Link>
                    </li>
                ))}
                <li>
                    <a className="d-flex align-items-center my-2" onClick={toggleVisibility} >
                    <div className="logo-category me-2">
                    <i className={`bi  ${ isHidden ? "bi-caret-down" :"bi-caret-up"}`}></i>
                    </div>
                    <p className="m-0" >{isHidden ? "show all": " hide"}</p>
                    </a>
                </li>
            </ul>
            {/* className={`genres-list ${isHidden ? "hidden" : "visible"}`} */}
        </div>
    )
}

export default GenresDropdown