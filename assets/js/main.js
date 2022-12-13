let checkFullPlanet = false
const universe = document.querySelector("#universe")
let currentPlanet = "earth active";

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
      currentPlanet = ref;
      e.preventDefault();
    });
    
  
    $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
    $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
    $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
    $(".set-distance").click(function() { setView("scale-d set-distance"); });
  
    init();
  
  });


let color;
let planetImg;
const navBtn = document.querySelectorAll(".data-container a")
const closePlanet = document.querySelector(".close-full-planet")
const btnPlanet = document.querySelectorAll(".planet")
const btnFullPlanet = document.querySelectorAll(".data-container")
const sectionTexts = document.querySelector(".section-info p")
const sectionTextsContainer = document.querySelector(".section-info")
const btnViewMore = document.querySelector(".section-info a")

const createConfig = (pos) =>{
  switch (pos) {
    case 0:
      color = "#C67D6A"
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_makemake_fictional.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? Home";
      break;
    case 1:
      color = "#9E5212"
      planetImg = "https://nasa3d.arc.nasa.gov/shared_assets/images/ven0aaa2/ven0aaa2-copy-428-321.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? Services"
      break;
    case 2:
      color = "#22C096"
      planetImg = "https://img00.deviantart.net/04ef/i/2009/114/3/e/new_earth_texture_map_by_lightondesigns.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? Portfolio"
      break;
    case 3:
      color = "#CB543D"
      planetImg = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mars_texture.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? About Us"
      break;
    case 4:
      color = "#6E645E"
      planetImg = "https://www.jpl.nasa.gov/spaceimages/images/largesize/PIA07782_hires.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? Contact Us"
      break;
    case 5:
      color = "#9D8B72"
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_saturn.jpg"
      textInfo = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam cumque eum optio exercitationem. Doloremque corrupti officiis delectus culpa possimus maiores quod voluptas dolores dolorum? Obcaecati possimus rem iste consequatur? Team";
      break;
    case 6:
      color = "#7CB4BE"
      planetImg= "https://img00.deviantart.net/957c/i/2017/165/4/9/uranus_texture_map_by_jcpag2010-db7yjwb.png"
      break;
    case 7:
      color = "#4471C2"
      planetImg = "https://www.solarsystemscope.com/images/textures/full/2k_neptune.jpg";
      break;
  }
  setView(pos, planetImg, "scale-s", "set-size");
}
for (let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", ()=>{
    checkActive = document.querySelector("#data .data-container .active")
    createConfig(i)
    //document.querySelector(".btn-view-full-planet button").style.background = color;
  })
}

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

for (let planetPos = 0; planetPos < btnPlanet.length; planetPos++) {
  btnPlanet[planetPos].addEventListener("click", ()=>{
    createConfig(planetPos)
  })
}

const setView = (pos, img, scale, size) =>{
  sectionTexts.textContent = textInfo
  sectionTextsContainer.classList.add("open-section-info--texts")
  openFullPlanet(pos, img, scale, size)
  if (checkFullPlanet) {
    checkFullPlanet = false
    return
  }
  checkFullPlanet = true
}

const openFullPlanet = (pos, img, scale, size)=>{
  const checkActive = document.querySelector("#data .data-container .active")
  universe.className = ""
  universe.classList.add(scale)
  universe.classList.add(size)
  document.querySelector(".sun-img").style.background = `url(${img})`
  document.querySelector(".sun-img").style.boxShadow = `0 0 60px ${color}`
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
  universe.className = ""
  universe.classList.add("scale-stretched")
  checkFullPlanet = false
  setTimeout(()=>{
    document.querySelector("#sun").style.background = ""
  },500)
  sectionTextsContainer.classList.remove("open-section-info--texts")
  document.querySelector(".sun-img").style.boxShadow = "0 0 60px rgba(255, 160, 60, 0.4)"
  closePlanet.style.opacity = "0"
})