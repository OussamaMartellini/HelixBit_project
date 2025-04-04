import { useSearchParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import { useEffect } from "react";
import CardGame from "../../components/Card";


function SearchPage() {
    const [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const initialUrl = `${apiUrl}games?key=${apiKey}&search=${game}`;

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl])

    return (
        <div className="container-fluid p-0">
            <h1 className="text-center my-5">Results for: {game}</h1>
            <div className="row justify-content-center w-100">
                {loading && <p>Loading...</p>}
                {error && <h1> Error status: {error}</h1>}
                {data && data.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage