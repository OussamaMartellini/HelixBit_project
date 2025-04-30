import { useEffect, useState, useRef, useCallback } from "react";
import supabase from "../supabase/supabase-client";

function RealtimeChat({ data }) {
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
        const { data: messages, error } = await supabase.from("messages").select().eq("game_id", data?.id);
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

    return (
        <div ref={messageRef} className="chatContainerContent">
            {loadingInitial && <progress></progress>}
            { error && <article>{error}</article> }
            {messages && 
            messages.map((message) => (
                <article key={message.id}>
                    <p>{message.profile_username}</p>
                    <small>{message.content}</small>
                    <p>{message.created_at}</p>
                </article>
            ))}
        </div>
    )
}

export default RealtimeChat