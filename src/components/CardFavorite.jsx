import { Link } from "react-router";
import LazyLoadGameImage from "./LazyLoadGameImage";

function CardFavorite({ game, removeFavorite }) {
    return (

        <article className="col-12 col-md-6
    col-xxl-4 d-flex justify-content-center">
            <div className="card-custom my-3">
                <LazyLoadGameImage image={game.game_image} title={game.game_name} />
                <div className="body-card-custom">
                    <h3 className="fw-bold my-4 text-center">{game.game_name}</h3>
                </div>
                <div className="d-flex w-100 justify-content-evenly">

                    <button className="btn btn-success  mb-4"><Link to={`/games/${game.game_slug}/${game.game_id}`} >show game</Link></button>
                    <button className="btn btn-danger mb-4" onClick={() => removeFavorite(game.game_id)}>Elimina</button>
                </div>
            </div>
        </article>
    )
}

export default CardFavorite