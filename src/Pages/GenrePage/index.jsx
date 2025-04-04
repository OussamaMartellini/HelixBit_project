import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import CardGame from "../../components/Card";
import { useEffect } from "react";

function GenrePage() {
    const { genre } = useParams();
    const formattedGenre = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : "";


    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const initialUrl = `${apiUrl}games?key=${apiKey}&genres=${genre}&page=1`
    
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
    
    useEffect(()=> {
        updateUrl(initialUrl);
    },[initialUrl])


    return (
        <div className="container-fluid p-0">
            <h1 className="text-center my-5">{formattedGenre} Games</h1>
            <div className="row justify-content-center w-100">
                {error && <article className="col-12 text-center text-danger">Error status: {error}</article>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default GenrePage