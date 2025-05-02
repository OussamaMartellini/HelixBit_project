import { useEffect, useState, useRef, useCallback } from "react";
import supabase from "../supabase/supabase-client";

function RealtimeChat({ data, session }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);



    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase.from("messages")
            .select("id, content, created_at, profile_id, profiles:profile_id(avatar_url), profile_username").eq("game_id", data?.id).order("created_at", { ascending: true });
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        const channel = supabase.channel("messages").on(
            "postgres_changes",
            { event: "*", schema: "public", table: "messages" },
            () => getInitialMessages()
        ).subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
    }, [data, getInitialMessages]);

    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);

    // Funzione per ottenere l'URL pubblico dell'avatar
    const getAvatarUrl = (avatarPath) => {
        if (avatarPath) {
            const { data, error } = supabase.storage.from('avatars').getPublicUrl(avatarPath);
            if (error) {
                console.error('Errore nel recupero dell\'avatar:', error.message);
                return ''; // Restituisci un URL vuoto in caso di errore
            }
            return data?.publicUrl;
        }
        return ''; // Restituisci un URL vuoto se non c'è un avatar
    }


    const formatTimestamp = (isoString) => {
        const date = new Date(isoString);
    
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
    
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
    
        if (isToday) {
            return `oggi alle ${hours}:${minutes}`;
        }
    
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
    
        return `${day}/${month}/${year} alle ${hours}:${minutes}`;
    };


    return (
        <div ref={messageRef} className="chatContainerContent">
            {loadingInitial && <progress></progress>}
            {error && <article>{error}</article>}
            {messages &&
                messages.map((message) => (
                    <article key={message.id} className={session?.user?.user_metadata?.username === message.profile_username ? `d-flex justify-content-end me-3  my-2` 
                    : "d-flex justify-content-start my-2"}>
                        {session?.user?.user_metadata?.username === message.profile_username ? 
                        <>
                        <div className="d-flex flex-column text-end me-2 my-message-container">
                            <p className="m-0 mb-2 me-2 fw-bolder lift">{message.profile_username}</p>
                            <small>{message.content}</small>
                            <p className="text-start ms-1 mt-2">{formatTimestamp(message.created_at)}</p>
                        </div>
                        <img src={getAvatarUrl(message.profiles?.avatar_url)} alt="avatar" className="avatar-chat" /> 
                        </> :
                        <>
                        <img src={getAvatarUrl(message.profiles?.avatar_url)} alt="avatar" className="avatar-chat" />
                        <div className="d-flex flex-column ms-2 message-container">
                            <p className="m-0 mb-2 ms-2 fw-bolder lift">{message.profile_username}</p>
                            <small className="">{message.content}</small>
                            <p className="text-end me-1 mt-2">{formatTimestamp(message.created_at)}</p>
                        </div>
                        </>
                        }
                        
                    </article>
                ))}
        </div>
    )
}

export default RealtimeChat