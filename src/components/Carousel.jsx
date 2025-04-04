import useFetchSolution from "../hook/useFetchSolution";

function Carousel() {



    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = import.meta.env.VITE_API_URL;

    // today
    const today = new Date().toISOString().split("T")[0];
    // 6 months ago
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoFormatted = sixMonthsAgo.toISOString().split("T")[0];

    
    const initialUrl = `${apiUrl}games?key=${apiKey}&dates=${sixMonthsAgoFormatted},${today}&ordering=-added&page_size=5`

    const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);
    


    return (
        <div id="carouselExample" className="carousel slide col-12" data-bs-ride="carousel">
            <div className="carousel-inner">
                {data && data.results.map((game, index) => (

                    <div key={game.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={game.background_image} className="slide-carousel" alt="Slide 1" />
                        <div className="p-3">
                            <h3 className="fw-bolder">{game.name}</h3>
                            <p>rating: {game.rating} / 5 </p>
                        </div>
                    </div>
                ))}


            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel