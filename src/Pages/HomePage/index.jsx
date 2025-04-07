import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/Card";
import Carousel from "../../components/Carousel";

function HomePage() {


  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;


  const initialUrl = `${apiUrl}games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`


  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


  return (
    <div className="container-fluid p-0 ">

      <div className="row justify-content-center my-5 w-100">

        <Carousel />
      </div>
      <h1 className="text-center my-5">Home Page</h1>
      <div className="row justify-content-center w-100">
        {error && <article className="col-12 text-center text-danger">Error status: {error}</article>}
        {data && data.results.map((game) => (
          <CardGame key={game.id} game={game} />
        ))}
      </div>
    </div>
  )
}

export default HomePage