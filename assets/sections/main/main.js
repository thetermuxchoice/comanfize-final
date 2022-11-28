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

const btnMenu = document.querySelector("#open-menu"),
      menu = document.querySelector(".menu-container")

btnMenu.addEventListener("click", ()=>{
    menu.classList.toggle("open-menu")
})