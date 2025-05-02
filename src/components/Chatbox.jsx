import { useContext } from "react"
import supabase from "../supabase/supabase-client"
import SessionContext from "../context/SessionContext"
import RealtimeChat from "./RealtimeChat";
import { Link } from "react-router";

function Chatbox({ data }) {
    const { session } = useContext(SessionContext);
    
    

    const hendleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase.from("messages").insert([
                {
                    profile_id: session?.user.id,
                    profile_username: session?.user.user_metadata.username,
                    game_id: data.id,
                    content: message,
                },
            ]).select();
            if (error) {
                console.log(error);
            } else {
                inputMessage.reset();
            }
        }
    };

    return (
        <div className="chatContainer">
            <h4>Games chat</h4>
            <div>
                <RealtimeChat data={data && data} session={session} />
            </div>
            {session ?
                (<form onSubmit={hendleMessageSubmit}>
                    <fieldset role="group" className="d-flex">
                        <input type="text" name="message" placeholder="Chat..." className="me-2 chatbar" />
                        <button type="submit" className="btn btn-outline-success">Invia</button>
                    </fieldset>
                </form>) :
                (<ul className="d-flex p-0 m-0 justify-content-center">
                    <li className="mx-2 d-flex align-items-center fw-bolder">
                        <Link to="/login">Login</Link>
                    </li>
                    <li className="mx-2 d-flex align-items-center  fw-bolder">
                        <Link to="/register">Register</Link>
                    </li>
                </ul>)}
        </div>
    );
}

export default Chatbox