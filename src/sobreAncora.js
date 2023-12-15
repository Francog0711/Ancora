
const subTitle = document.querySelector(".underline2");
const imgSubTitle2 = document.querySelector(".img-servicios-2")

activateScrollSubTitle = () => {
    subTitle.classList.add("animation")
    imgSubTitle2.classList.add("animation")
}

window.addEventListener("scroll",()=> {

    if (scrollY > 600) { 
        activateScrollSubTitle()
    }
    
})
