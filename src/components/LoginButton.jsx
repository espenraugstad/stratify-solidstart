import "../styles/components/LoginButton.scss";

export default function LoginButton() {
  function login() {
    console.log("Logging in");
  }

  return <button onClick={login}>Login with Spotify</button>;
}
