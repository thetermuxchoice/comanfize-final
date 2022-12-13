let checkFullPlanet = false
const universe = document.querySelector("#universe")
$(window).load(function(){

    var body = $("body"),
        solarsys = $("#solar-system");
  
    var init = function() {
      body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
        $(this).removeClass('hide-UI').addClass("set-speed");
        $(this).dequeue();
      });
    };
  
    $("#toggle-data").click(function(e) {
      body.toggleClass("data-open data-close");
      e.preventDefault();
    });
  
    $("#toggle-controls").click(function(e) {
      body.toggleClass("controls-open controls-close");
      e.preventDefault();
    });
  
    $("#data a").click(function(e) {
      var ref = $(this).attr("class");
      solarsys.removeClass().addClass(ref);
      e.preventDefault();
    });
  
    $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
    $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
    $(".set-distance").click(function() { setView("scale-d set-distance"); });
  
    init();
  
  });


const navBtn = document.querySelectorAll(".data-container a")
let color;

for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", ()=>{
    const checkActive = document.querySelector("#data .data-container .active")

    switch (i) {
      case 0:
        color = "#E29200"
        break;
      case 1:
        color = "#C67D6A"
        break;
      case 2:
        color = "#9E5212"
        break;
      case 3:
        color = "#22C096"
        break;
      case 4:
        color = "#CB543D"
        break;
      case 5:
        color = "#6E645E"
        break;
      case 6:
        color = "#9D8B72"
        break;
      case 7:
        color = "#7CB4BE"
        break;
      case 8:
        color = "#4471C2"
        break;
      default:
        color = "#22C096"
        break;
    }

    if (checkActive) {
      checkActive.classList.remove("active")
    }
    navBtn[i].classList.add("active")
    navBtn[i].firstChild.style.backgroundColor = color;
  })
}

let planetImg;
const closePlanet = document.querySelector(".close-full-planet")
const btnPlanet = document.querySelectorAll(".planet")
const imgFullPlanet = document.querySelectorAll(".data-img")

for (let planetPos = 0; planetPos < btnPlanet.length; planetPos++) {
  btnPlanet[planetPos].addEventListener("click", ()=>{
    fullPlanet(planetPos)
  })
}

for (let planetPos2 = 0; planetPos2 < imgFullPlanet.length; planetPos2++) {
  imgFullPlanet[planetPos2].addEventListener("click", ()=>{
    fullPlanet(planetPos2)
  })
}

const setView = (img, scale, size) =>{
  if (checkFullPlanet) {
    universe.className = ""
    universe.classList.add("scale-stretched")
    checkFullPlanet = false
    setTimeout(()=>{
      document.querySelector("#sun").style.background = ""
    },500)
    closePlanet.style.opacity = "0"
    return
  }
  universe.className = ""
  universe.classList.add(scale)
  universe.classList.add(size)
  document.querySelector(".sun-img").style.background = `url(${img})`
  closePlanet.style.opacity = "1"
  checkFullPlanet = true
}

const  fullPlanet = (planetPos) =>{
  switch (planetPos) {
    case 0:
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_makemake_fictional.jpg"
      break;
    case 1:
      planetImg = "https://nasa3d.arc.nasa.gov/shared_assets/images/ven0aaa2/ven0aaa2-copy-428-321.jpg"
      break;
    case 2:
      planetImg = "https://img00.deviantart.net/04ef/i/2009/114/3/e/new_earth_texture_map_by_lightondesigns.jpg"
      break;
    case 3:
      planetImg = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mars_texture.jpg"
      break;
    case 4:
      planetImg = "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA07782_hires.jpg"
      break;
    case 5:
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_saturn.jpg"
      break;
    case 6:
      planetImg= "https://img00.deviantart.net/957c/i/2017/165/4/9/uranus_texture_map_by_jcpag2010-db7yjwb.png"
      break;  
    case 7:
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_neptune.jpg"  
      break;  
    default:
      break;
  }
  setView(planetImg, "scale-s", "set-size");
}

closePlanet.addEventListener("click", ()=>{
  universe.className = ""
  universe.classList.add("scale-stretched")
  checkFullPlanet = false
  setTimeout(()=>{
    document.querySelector("#sun").style.background = ""
  },500)
  closePlanet.style.opacity = "0"
})