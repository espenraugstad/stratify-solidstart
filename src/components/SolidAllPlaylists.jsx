import { createResource } from "solid-js";

export default function SolidAllPlaylists(){
    const getAllPlaylists = async () => {
        const token = localStorage.getItem("access_token");
        console.log("WHata");
        const data = await fetch("https://api.spotify.com/v1/me/playlists", {
            method: "GET",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const results = await data.json();
        return results;
    }

    const [playlists] = createResource(getAllPlaylists)
    return <div>
        {playlists.loading && (<p>Loading playlists...</p>)}
        {playlists() && (
            <For each={playlists().items}>
                {(playlist) => (
                    playlist.name
                )}
            </For>
        )}
        </div>
}