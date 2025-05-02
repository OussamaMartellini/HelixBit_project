import { useState, useEffect, useContext } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";

function AccountPage() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore = false;
        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            const { data, error } = await supabase
                .from("profiles")
                .select("username, first_name, last_name, avatar_url")
                .eq("id", user.id)
                .single();


            if (!ignore) {
                if (error) {
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        }
    }, [session?.user?.id]);

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault();

        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error: updateError } = await supabase.from("profiles").upsert(updates);

        if (updateError) {
            alert(updateError.message);
            setLoading(false);
            return
         } 
        
        const { error: metadataError } = await supabase.auth.updateUser({
            data: {
                username,
                first_name,
                last_name,
                avatar_url: avatarUrl,
            },
        });
        if (metadataError) {
            alert(metadataError.message);
        }
    
        setAvatarUrl(avatarUrl);
        setLoading(false);
       
    }



    return (
        <div className="container-fluid d-flex  p-5 mt-5 justify-content-center">
            <form onSubmit={updateProfile} className="form-account">
        <h1 className="text-center pb-4">Profile Settings</h1>
                <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url);
                }}
                />
                <div className=" d-flex flex-column align-items-center text-center w-75 my-3">
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text" id="email" 
                    value={session?.user.email} disabled  className="input-account-setting"/>
                </div>
                <div className=" d-flex flex-column align-items-center text-center w-75 mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text" id="username"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                         className="input-account-setting"
                    />
                </div>
                <div className=" d-flex flex-column align-items-center text-center w-75 mb-3">
                    <label htmlFor="first_name">First Name</label>
                    <input
                        type="text" id="first_name"
                        value={first_name || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                         className="input-account-setting"
                    />
                </div>
                <div className=" d-flex flex-column align-items-center text-center w-75 mb-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                        type="text" id="last_name"
                        value={last_name || ""}
                        onChange={(e) => setLastName(e.target.value)}
                         className="input-account-setting"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-outline-success btnlogin"
                    >
                        {loading ? "Loading ..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AccountPage