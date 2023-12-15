// WHATSAPP BUTTOM
const wspBtn = document.querySelector(".wsp-msg");

function showWspBtn() {
    wspBtn.style.display = "flex";
  }

setTimeout(showWspBtn, 2500);



//Servicios Title

const titleService = document.querySelector(".servicios-seccion");
const underlineService = document.querySelector(".divisor");

activateScrollAnimation = () => {
  titleService.classList.add("animation")
  underlineService.classList.add("animation")
}

window.addEventListener("scroll",() => {
  if (scrollY > 500) {
    activateScrollAnimation()
  }
})


//Servicios Items
const serviceItems = document.querySelectorAll(".servicio-icono");

animationItems = (icono) => {
  icono.style.opacity = 0;
  let opacity = 0;
  let interval = setInterval(function () {
    if (opacity < 1) {
      opacity += 0.1;
      icono.style.opacity = opacity;
    } else {
      clearInterval(interval);
    }
  }, 140);
}

serviceItems.forEach(function (icono) {
  animationItems(icono);
});
