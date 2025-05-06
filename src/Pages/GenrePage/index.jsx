import useFetchSolution from "../../hook/useFetchSolution";
import { useParams } from "react-router";
import CardGame from "../../components/Card";
import { useEffect, useState } from "react";

function GenrePage() {
    const { genre } = useParams();
    const formattedGenre = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : "";

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const [page, setPage] = useState(1); // Inizia dalla pagina 1
    const [currentUrl, setCurrentUrl] = useState("");  // Partiamo da un URL vuoto

    // Gestisci il primo URL con pagina 1
    useEffect(() => {
        if (genre) {
            const newUrl = `${apiUrl}games?key=${apiKey}&genres=${genre}&page=1`;
            setCurrentUrl(newUrl); // Imposta correttamente l'URL iniziale
        }
    }, [genre, apiUrl, apiKey]); // Si esegue solo una volta, quando genre cambia

    // Effettua il fetch dei dati ogni volta che l'URL cambia
    const { data, loading, error, updateUrl } = useFetchSolution(currentUrl);

    useEffect(() => {
        if (currentUrl) {
            updateUrl(currentUrl); // Esegui fetch ogni volta che currentUrl cambia
        }
    }, [currentUrl, updateUrl]);

    // Gestione del cambio di pagina
    const totalPages = data ? Math.ceil(data.count / 20) : 1;

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setPage(pageNumber); // Solo aggiorna la pagina
        }
    };

    // Cambia URL quando la pagina cambia
    useEffect(() => {
        if (genre) {
            const newUrl = `${apiUrl}games?key=${apiKey}&genres=${genre}&page=${page}`;
            setCurrentUrl(newUrl);  // Cambia l'URL quando la pagina cambia
        }
    }, [page, genre, apiUrl, apiKey]);

    const renderPageNumbers = () => {
        const pages = [];

        let start = Math.max(1, page - 1);
        let end = Math.min(totalPages, page + 1);

        if (page === 1) end = Math.min(3, totalPages);
        if (page === totalPages) start = Math.max(1, totalPages - 2);

        for (let i = start; i <= end; i++) {
            pages.push(
                <li key={i} className={`pagination-item ${i === page ? "active" : ""}`}>
                    <a onClick={() => goToPage(i)}
                        style={{
                            pointerEvents: "auto",
                            opacity: 1,
                            cursor: "pointer",
                            width: "100%"
                        }}
                    >{i}</a>
                </li>
            );
        }

        return pages;
    };

    return (
        <div className="container-fluid p-0 d-flex align-items-center flex-column">
            <h1 className="text-center my-5">{formattedGenre} Games </h1>
            {data && (
                <div className="d-flex justify-content-center my-3">
                    <ul className="pagination-list">
                        <li className="pagination-item-prev">
                            <a
                                onClick={() => goToPage(page - 1)}
                                style={{
                                    pointerEvents: page === 1 ? "none" : "auto",
                                    opacity: page === 1 ? 0.5 : 1,
                                    cursor: page === 1 ? "not-allowed" : "pointer",
                                    width: "100%"

                                }}
                            >
                                prev
                            </a>
                        </li>

                        {renderPageNumbers()}

                        <li className="pagination-item-next">
                            <a
                                onClick={() => goToPage(page + 1)}
                                style={{
                                    pointerEvents: page === totalPages ? "none" : "auto",
                                    opacity: page === totalPages ? 0.5 : 1,
                                    cursor: page === totalPages ? "not-allowed" : "pointer",
                                    width: "100%"

                                }}
                            >
                                next
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            {loading && (
                <div className="text-center my-5">
                    <progress className="w-100" />
                </div>
            )}

            <div className="row justify-content-center w-100">
                {error && (
                    <article className="col-12 text-center text-danger">
                        Error status: {error}
                    </article>
                )}

                {data &&
                    data.results.map((game) => (
                        <CardGame key={game.id} game={game} />
                    ))}
            </div>
            <h3 className="text-center my-5" >page: {page}</h3>

            {data && (
                <div className="d-flex justify-content-center my-3">
                    <ul className="pagination-list">
                        <li className="pagination-item-prev">
                            <a
                                onClick={() => goToPage(page - 1)}
                                style={{
                                    pointerEvents: page === 1 ? "none" : "auto",
                                    opacity: page === 1 ? 0.5 : 1,
                                    cursor: page === 1 ? "not-allowed" : "pointer",
                                    width: "100%"
                                }}
                            >
                                prev
                            </a>
                        </li>

                        {renderPageNumbers()}

                        <li className="pagination-item-next">
                            <a
                                onClick={() => goToPage(page + 1)}
                                style={{
                                    pointerEvents: page === totalPages ? "none" : "auto",
                                    opacity: page === totalPages ? 0.5 : 1,
                                    cursor: page === totalPages ? "not-allowed" : "pointer",
                                    width: "100%"

                                }}
                            >
                                next
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default GenrePage;
