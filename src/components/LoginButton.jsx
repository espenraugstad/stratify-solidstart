import "../styles/components/LoginButton.scss";

export default function LoginButton() {
  const cid = "79aab9b8746344ebb0edb4367327f0fb";
  const redir = "http://localhost:3000/";
  //const redir = "https://stratify-app.com/";

  async function login() {
    console.log("Logging in");

    // Code verifier
    const codeVerifier = generateRandomString(128);

    // Code challenge
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    const state = generateRandomString(16);
    const scope =
      "playlist-read-collaborative playlist-read-private playlist-modify-private playlist-modify-public";

    localStorage.setItem("code_verifier", codeVerifier);
    const args = new URLSearchParams({
      response_type: "code",
      client_id: cid,
      scope: scope,
      redirect_uri: redir,
      state: state,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    });

    window.location = "https://accounts.spotify.com/authorize?" + args;
  }

  function generateRandomString(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
  }

  return <button onClick={login}>Login with Spotify</button>;
}
