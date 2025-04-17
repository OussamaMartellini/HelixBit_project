import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";

function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div className="container-fluid">
            <h2>hey {session?.user.user_metadata.first_name} 👌</h2>
            <details>
                <summary>Preferiti</summary>
                {favorites.length === 0 && <p>Non ci sono preferiti al momento...</p> }
                <ul>
                    {favorites.map((game) => (
                        <li key={game.id} className=" d-flex align-items-center justi">
                            <div className="d-flex">
                                <img width={50} height={50} src={game.game_image} alt={`image of ${game.game_name}`} />
                                <p>{game.game_name}</p>
                            </div>
                            <button onClick={() => removeFavorite(game.game_id)}>Elimina</button>
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    )
}

export default ProfilePage