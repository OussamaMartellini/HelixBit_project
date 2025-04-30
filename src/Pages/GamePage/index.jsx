import { useParams } from "react-router"
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import { useState } from "react";

function GamePage() {
    const { id } = useParams();

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    const initialUrl = `${apiUrl}games/${id}?key=${apiKey}`
    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
    console.log(data);

    const [extended, setExstended] = useState(false);

    const toggleReadMore = () => setExstended(!extended);

    


    return (
        <div className="container-fluid p-0  w-100">
            <h1 className="text-center my-5 fw-bold"> {data && data.name} </h1>
            <div className="row justify-content-center w-100 ">
                <div className="col-7">
                    <div className="container-img-game">
                        <img src={data && data.background_image} alt={`image of ${data && data.name}`}
                            className="img-game" />
                        <div className="toggleFavorite">

                            <ToggleFavorite data={data} />
                        </div>
                    </div>
                    <div className="my-3">
                        { extended ?  data?.description_raw : data?.description_raw.slice(0,500)+" ..." }
                        <button onClick={toggleReadMore}>
                            {extended ? "Show less": "Read more"}
                        </button>
                    </div>
                </div>
                <div className="col-5">
                    <Chatbox data={data && data} />
                </div>

            </div>
        </div>
    )
}

export default GamePage