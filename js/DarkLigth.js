const DarkModeToggle= document.querySelector("#DarkModeToggle");
darkMode = localStorage.getItem("darkMode");
localStorage.setItem('darkMode','enabled');

const enableDarkMode = () => {
    document.body.classList.add("bootstrap-dark");
    document.body.classList.remove("bootstrap");
    localStorage.setItem('darkMode','enabled');

}

const disableDarkMode = () => {
    document.body.classList.remove("bootstrap-dark");
    document.body.classList.add("bootstrap");
    localStorage.setItem('darkMode',null);
}

DarkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode == "enabled"){
        disableDarkMode();
    }else{
        enableDarkMode();
    }
})