import { createResource, createSignal, For } from "solid-js";
//import { getAllPlaylists } from "../modules/getAllPlaylists.js";

export default async function SAllPlaylists() {
    //const allPlaylists = await getAllPlaylists();
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
    /*     const [query, setQuery] = createSignal("");
        const [data] = createResource(query, getAllPlaylists);
    
        setQuery("Get all playlists");
        console.log(data); */
    const [playlists] = createResource(getAllPlaylists);
    console.log(playlists());

    return <div>
        {/* <For each={playlists()}>
            {(item) => (console.log(item))}
        </For> */}
       {playlists()}
    </div>;
}