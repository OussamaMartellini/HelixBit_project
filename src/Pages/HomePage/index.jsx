import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/Card";
import Carousel from "../../components/Carousel";
import { useEffect, useState } from "react";

function HomePage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [page, setPage] = useState(1);
  const [currentUrl, setCurrentUrl] = useState(
    `${apiUrl}games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`
  );

  const { data, loading, error, updateUrl } = useFetchSolution(currentUrl);

  useEffect(() => {
    const newUrl = `${apiUrl}games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=${page}`;
    setCurrentUrl(newUrl);
    updateUrl(newUrl);
  }, [page]);

  const totalPages = data ? Math.ceil(data.count / 20) : 1;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  };

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
      <div className="row justify-content-center my-5 w-100 ">
        <Carousel />
      </div>

      <h1 className="text-center my-5">Home Page</h1>
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
          <progress />
        </div>
      )}

      <div className="row justify-content-center w-100 ">
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

export default HomePage;
