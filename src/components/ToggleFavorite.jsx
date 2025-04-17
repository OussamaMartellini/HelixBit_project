import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);


    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);


    return (
        <div> {isFavorite() ? 
        <button onClick={()=> removeFavorite(data.id)}>
             <i className="bi bi-suit-heart-fill"></i>
             </button> : 
        <button onClick={()=> addFavorites(data)}> 
        <i className="bi bi-suit-heart"></i>
        </button> }
    </div > 
)

}

export default ToggleFavorite