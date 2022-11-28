window.addEventListener("DOMContentLoaded", ()=>{
    const menu = document.querySelector(".menu")
    const menuBtn = document.querySelectorAll("#btnMenu")
    const scroll = document.querySelector(".space-scroll")

    for (let index = 0; index < menuBtn.length; index++) {
        menuBtn[index].addEventListener("click", ()=>{
            menu.classList.toggle("menu-open")
        })
    }

})
