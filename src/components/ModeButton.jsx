import { createSignal, createEffect } from "solid-js";

export default function ModeButton() {
    
    function setMode(mode) {
        // Change body class
        const body = document.querySelector("body");
        if(mode === "dark" && !body.classList.contains("dark")){
            body.classList.add("dark");
        }
        
        if(mode === "light" && body.classList.contains("dark")){
            body.classList.remove("dark");
        }

        // Change mode button
        const modeBtn = document.getElementById("mode-btn");
        mode === "light" ? modeBtn.src = "../../assets/darkmode.png" : modeBtn.src = "../../assets/lightmode.png";

        // Change logo icon
        const headerLogo = document.getElementById("header-logo");
        mode === "light" ? headerLogo.src = "../../assets/logo_on_light.png" : headerLogo.src = "../../assets/logo_on_dark.png";

        // Update localstorage and signal.
        localStorage.setItem("mode", mode);
        setCurrentMode(mode);
    }

    // Initiate mode signal
    const [currentMode, setCurrentMode] = createSignal("light");

    // Get current mode from the window and set it in darkMode. Also watch for changes.
    createEffect(() => {
        
        // Check to see if a mode has been set in localstorage.
        let localMode = localStorage.getItem("mode");
        
        if(!localMode){
            // Use system preferences.
            setCurrentMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark"  : "light");
            localStorage.setItem("mode", currentMode());
            setMode(currentMode());
        }
        
        else {
            setCurrentMode(localMode);
            setMode(currentMode());
        }
    });
    
    return (

        <img id="mode-btn" onClick={()=>{setMode(currentMode() === "light" ? "dark" : "light");}} style="cursor: pointer; width: 24px;" src="../../assets/darkmode.png"/>

    )
}