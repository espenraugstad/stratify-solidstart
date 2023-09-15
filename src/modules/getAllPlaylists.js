export async function getAllPlaylists(){
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