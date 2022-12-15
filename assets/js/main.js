let checkFullPlanet = false
let color;
let planetImg;
let currentImage;
const universe = document.querySelector("#universe")
const navBtnContainer = document.querySelectorAll(".data-container")
const navBtn = document.querySelectorAll(".data-container a")
const closePlanet = document.querySelector(".close-full-planet")
const btnPlanet = document.querySelectorAll(".planet")
const sectionTexts = document.querySelector(".section-info p")
const sectionTextsContainer = document.querySelector(".section-info")
const btnViewMore = document.querySelector(".section-info a")
const sectionSubtitle = document.querySelector(".section-info--subtitle")
const sunImg = document.querySelector(".sun-img")
const planetShadow = document.querySelector(".shadow")
//let currentPlanet = "earth active";

$(window).load(function(){

    var body = $("body"),
        universe = $("#universe")
        solarsys = $("#solar-system");
  
    var init = function() {
      body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
        $(this).removeClass('hide-UI').addClass("set-speed");
        $(this).dequeue();
      });
    };

    var setView = function(view) { 
      universe.removeClass().addClass(view);
      if (checkFullPlanet) {
        closeFullPlanet()
      }
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
      //currentPlanet = ref;
      e.preventDefault();
    });
    
  
    $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
    $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
    $(".set-distance").click(function() { setView("scale-d set-distance"); });
  
    init();
  
  });

const createConfig = (pos) =>{
  switch (pos) {
    case 0:
      color = "rgb(188, 125, 106)"
      colorShadow = "rgb(188, 125, 106, 0.5)"
      planet = "mercury"
      sectionTitle = "Home"
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_makemake_fictional.jpg"
      textInfo = "";
      break;
    case 1:
      color = "#F0CB8C"
      colorShadow = "rgb(240, 203, 140,0.3)"
      planet = "venus"
      sectionTitle = "Services"
      planetImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Solarsystemscope_texture_4k_venus_atmosphere.jpg/800px-Solarsystemscope_texture_4k_venus_atmosphere.jpg?20201026210237"
      textInfo = ""
      break;
    case 2:
      color = "#4a92f7"
      colorShadow = "rgb(74, 146, 247, 0.5)"
      planet = "earth"
      sectionTitle = "Portfolio"
      planetImg = "https://img00.deviantart.net/04ef/i/2009/114/3/e/new_earth_texture_map_by_lightondesigns.jpg"
      textInfo = ""
      break;
    case 3:
      color = "#CB543D"
      colorShadow = "rgb(203, 84, 61, 0.5)"
      planet = "mars"
      sectionTitle = "About Us"
      planetImg = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mars_texture.jpg"
      textInfo = ""
      break;
    case 4:
      color = "#6E645E"
      colorShadow = "rgb(110, 100, 94, 0.5)"
      planet = "jupiter"
      sectionTitle = "contact us"
      planetImg = "/assets/planets/jupiter2_1k.jpg"
      textInfo = ""
      break;
    case 5:
      color = "#9D8B72"
      colorShadow = "rgb(157, 130, 114, 0.5)"
      planet = "saturn"
      sectionTitle = "team"
      planetImg = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2115d5b9-b53e-4f1d-81e4-1d21461eeb45/dc6s6fu-e7a08936-a250-4df0-b25d-e9c3024e4423.jpg/v1/fill/w_1312,h_609,q_75,strp/saturn__mixed__texture_for_celestia__remastered__by_roanalcorano_dc6s6fu-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjA5IiwicGF0aCI6IlwvZlwvMjExNWQ1YjktYjUzZS00ZjFkLTgxZTQtMWQyMTQ2MWVlYjQ1XC9kYzZzNmZ1LWU3YTA4OTM2LWEyNTAtNGRmMC1iMjVkLWU5YzMwMjRlNDQyMy5qcGciLCJ3aWR0aCI6Ijw9MTMxMiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.lQA7oNa_ogvkEUjjxT7AWjC9wpNCVWrCvgmzDZJ_yPI"
      textInfo = "";
      break;
    case 6:
      color = "#7CB4BE"
      colorShadow = "rgb(124,180,190, 0.5)"
      planet = "uranus"
      sectionTitle = "section 1"
      planetImg= "https://img00.deviantart.net/957c/i/2017/165/4/9/uranus_texture_map_by_jcpag2010-db7yjwb.png"
      textInfo = ""
      break;
    case 7:
      color = "#4471C2"
      colorShadow = "rgb(68,113,194, 0.5)"
      planet = "neptune"
      sectionTitle = "section 2"
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_neptune.jpg";
      textInfo = ""
      break;
  }
  setView(pos, planetImg, "scale-s", "set-size");
}
for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", ()=>{
    createConfig(i)
    //document.querySelector(".btn-view-full-planet button").style.background = color;
  })
}

/*
for (let containerPos = 0; containerPos < btnFullPlanet.length; containerPos++) {
  btnFullPlanet[containerPos].addEventListener("click", ()=>{
    currentSplit = currentPlanet.split(" ")[0]
    switch (currentSplit){
      case "mercury":
        planetPos = 0
        break
      case "venus":
        planetPos = 1
        break
      case "earth":
        planetPos = 2
        break
      case "mars":
        planetPos = 3
        break
      case "jupiter":
        planetPos = 4
        break
      case "saturn":
        planetPos = 5
        break
      case "uranus":
        planetPos = 6
        break
      case "neptune":
        planetPos = 7
        break
    }
    createConfig(planetPos)
  })
}

*/


for (let planetPos = 0; planetPos < btnPlanet.length; planetPos++) {
  btnPlanet[planetPos].addEventListener("click", ()=>{
    createConfig(planetPos)
  })
}

const setView = (pos, img, scale, size) =>{
  if (currentImage == `url("${img}")`) {
    return
  }
  sectionTexts.textContent = textInfo
  sectionTextsContainer.classList.add("open-section-info--texts")
  openFullPlanet(pos, img, scale, size)
}

const openFullPlanet = (pos, img, scale, size)=>{
  if (checkFullPlanet) {
    universe.className = ""
    universe.classList.add("scale-stretched")
    sectionTextsContainer.classList.remove("open-section-info--texts")
    closePlanet.style.opacity = "0"
    setTimeout(()=>{
      planetShadow.style.opacity = 0;
      document.querySelector("#sun").style.background = ""
      sunImg.style.boxShadow = "0 0 60px rgba(255, 160, 60, 0.4)"
    },500)
    setTimeout(()=>{
      sectionTexts.textContent = textInfo
      sectionTextsContainer.classList.add("open-section-info--texts")
      openFullPlanetFunc(pos, img, scale, size)
    }, 800)
    return
  }
  openFullPlanetFunc(pos, img, scale, size)
  checkFullPlanet = true
}

const openFullPlanetFunc = (pos, img, scale, size)=> {
  const checkActive = document.querySelector("#data .data-container .active")
  planetShadow.style.opacity = 1;
  universe.className = ""
  universe.classList.add(scale)
  universe.classList.add(size)
  sunImg.style.background = `url(${img})`;
  currentImage = document.querySelector(".sun-img").style.getPropertyValue("background-image")
  sectionSubtitle.style.color = color;
  sectionSubtitle.textContent = planet;
  document.querySelector(".section-info--title").textContent = sectionTitle;
  sunImg.style.boxShadow = `0 -7px 40px ${colorShadow}`;
  closePlanet.style.backgroundColor = color;
  closePlanet.style.opacity = "1"

  if (checkActive) {
    checkActive.classList.remove("active")
  }

  navBtn[pos].classList.add("active")
  navBtn[pos].firstChild.style.backgroundColor = color;

  btnViewMore.style.color = color;
  btnViewMore.style.borderColor = color;
}

closePlanet.addEventListener("click", ()=>{
  checkFullPlanet = false
  universe.className = ""
  universe.classList.add("scale-stretched")
  closeFullPlanet()
})

const closeFullPlanet = () =>{
  setTimeout(()=>{
    planetShadow.style.opacity = 0;
    document.querySelector("#sun").style.background = ""
    sunImg.style.boxShadow = "0 0 60px rgba(255, 160, 60, 0.4)"
  },500)
  sectionTextsContainer.classList.remove("open-section-info--texts")
  closePlanet.style.opacity = "0"
}

document.querySelector(".set-zoom").addEventListener("click", ()=>{
  sectionTextsContainer.classList.toggle("texts--top")
})

document.querySelector(".set-view").addEventListener("click", ()=>{
  planetShadow.classList.toggle("opacity-100")
})

if (window.innerWidth < 1000){
  planetShadow.classList.add("opacity-100")
  document.querySelector(".shadow2").style.opacity = "0"
} else {
  planetShadow.classList.remove("opacity-100")
}