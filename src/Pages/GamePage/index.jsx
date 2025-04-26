import { useParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

function GamePage() {
    const { id } = useParams();

    

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const initialUrl = `${apiUrl}games/${id}?key=${apiKey}`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

    

    return (
        <div className="container-fluid p-0  w-100">
            <h1 className="text-center my-5 fw-bold"> {data && data.name} </h1>
            <div className="row justify-content-centerw-100 ">
            <div className="col-7 bg-info vh-100">
                <div className="container-img-game">
                    <img src={data && data.background_image} alt={`image of ${data && data.name}`}
                    className="img-game" />
                </div>
                    <ToggleFavorite data={data} />
            </div>
            <div className="col-5 bg-warning vh-100">
            <Chatbox data={data && data} />
            </div>

            </div>
        </div>
    )
}

export default GamePage