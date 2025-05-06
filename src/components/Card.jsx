import LazyLoadGameImage from "./LazyLoadGameImage";
import { Link } from "react-router";

function CardGame({ game }) {

    const genres = game.genres.map((genre) => genre.name).join(", ");

    return (
        <article className="col-12 col-md-6
     col-xxl-4 d-flex justify-content-center">
            <div className="card-custom my-3">
                <LazyLoadGameImage image={game.background_image} title={game.name} />
                <div className="body-card-custom">
                    <h3 className="fw-bold">{game.name}</h3>
                    <small>{`Genres: ${genres}`}</small>
                    <p>{`Release date: ${game.released}`}</p>
                </div>
                <button className="btn btn-success w-50 mb-4"><Link to={`/games/${game.slug}/${game.id}`} >show game</Link></button>
            </div>
        </article>
    )
}

export default CardGame