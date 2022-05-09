const DarkModeToggle= document.querySelector("#DarkModeToggle");
const obj = {
    darkMode: localStorage.getItem("darkMode"),
    date: new Date().getTime() / (1000*60*60*24),
};

document.addEventListener('DOMContentLoaded',() => {
    if (obj.darkMode == null){
        enableDarkMode();
    }else if (obj.darkMode == "enabled"){
        enableDarkMode();
    }else{
        disableDarkMode();
    }
})

const enableDarkMode = () => {
    document.body.classList.add("bootstrap-dark");
    document.body.classList.remove("bootstrap");
    localStorage.setItem('darkMode','enabled');
    localStorage.setItem('date',obj.date);
}

const disableDarkMode = () => {
    document.body.classList.remove("bootstrap-dark");
    document.body.classList.add("bootstrap");
    localStorage.setItem('darkMode','disabled');
    localStorage.setItem('date',obj.date);
}

DarkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    console.log(darkMode);
    if (darkMode == "enabled"){
        disableDarkMode();
    }else{
        enableDarkMode();
    } 
})
