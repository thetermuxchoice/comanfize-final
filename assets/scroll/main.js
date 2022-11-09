let needRender = true;

const globalRotation = { value: 0.001 };

const darkTextureRotation = { value: 0.0006 };
const darkMoveForward = { value: 0.0006 };
const darkOpacity = { value: 0.4 };

const colorFullTextureRotation = { value: 0.0006 };
const colorFullMoveForward = { value: 0.0016 };
const colorFullOpacity = { value: 0.4 };

const scene = new THREE.Scene();
window.scene = scene;

const renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: false,
  stencil: false,
  depth: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);
document.querySelector(".space").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 0;
camera.lookAt(0, 0, 0);

const commonCylinderGeometry = new THREE.CylinderBufferGeometry(
  1,
  1,
  20,
  12,
  0,
  true
);

// dark space full of stars - background cylinder
const darkCylinderTexture = new THREE.TextureLoader().load("/assets/scroll/images/dark.jpg");
darkCylinderTexture.wrapS = THREE.RepeatWrapping;
darkCylinderTexture.wrapT = THREE.MirroredRepeatWrapping;
darkCylinderTexture.repeat.set(1, 1);
const darkCylinderMaterial = new THREE.MeshLambertMaterial({
  side: THREE.BackSide,
  map: darkCylinderTexture,
  blending: THREE.AdditiveBlending,
  opacity: darkOpacity.value
});
const darkCylinder = new THREE.Mesh(
  commonCylinderGeometry,
  darkCylinderMaterial
);

// colourfull space full of nebulas - main universe cylinder
const colorFullCylinderTexture = new THREE.TextureLoader().load(
  "/assets/scroll/images/colorfull.jpg"
);
colorFullCylinderTexture.wrapS = THREE.RepeatWrapping;
colorFullCylinderTexture.wrapT = THREE.MirroredRepeatWrapping;
colorFullCylinderTexture.repeat.set(1, 1);
const colorFullCylinderMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide,
  map: colorFullCylinderTexture,
  blending: THREE.AdditiveBlending,
  opacity: colorFullOpacity.value
});
const colorFullCylinder = new THREE.Mesh(
  commonCylinderGeometry,
  colorFullCylinderMaterial
);

const light = new THREE.AmbientLight(0xffffff, 1);

scene.add(darkCylinder);
scene.add(colorFullCylinder);
scene.add(light);

// handling horizon => this will be highly animated by godrays effect at post processing
const horizonMaterial = new THREE.MeshBasicMaterial({ opacity: 1 });
const horizonGeometry = new THREE.SphereBufferGeometry(0.25, 32, 32);
const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
horizon.frustumCulled = false;
horizon.matrixAutoUpdate = false;
scene.add(horizon);

// handling post processing process
// godrays and bloom effects are added to the renderer
const godRaysEffectOptions = {
  height: 480,
  blendFunction: POSTPROCESSING.BlendFunction.ADD,
  color: 0x000000,
  kernelSize: POSTPROCESSING.KernelSize.SMALL,
  density: 1.2,
  decay: 0.92,
  weight: 1,
  exposure: 0.8,
  samples: 60,
  clampMax: 1.0
};
const godRaysEffect = new POSTPROCESSING.GodRaysEffect(
  camera,
  horizon,
  godRaysEffectOptions
);
const bloomEffect = new POSTPROCESSING.BloomEffect({
  blendFunction: POSTPROCESSING.BlendFunction.ADD,
  kernelSize: POSTPROCESSING.KernelSize.SMALL
});
bloomEffect.blendMode.opacity.value = 4;

// using a global variable because effects will be highly animated during the experience
effectPass = new POSTPROCESSING.EffectPass(camera, bloomEffect, godRaysEffect);
effectPass.renderToScreen = true;

const composer = new POSTPROCESSING.EffectComposer(renderer);
composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));
composer.addPass(effectPass);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  composer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
});

function animate() {
  if (needRender) {
    darkCylinder.rotation.y += 0.01
    darkCylinderTexture.offset.x -= darkTextureRotation.value;
    colorFullCylinder.rotation.y += 0.01
    colorFullCylinderTexture.offset.x -= colorFullTextureRotation.value;
    composer.render();

    window.addEventListener("wheel", (e)=>{
      if (e.deltaY < 0)
      {
       darkCylinderTexture.offset.y += 0.00050
       colorFullCylinderTexture.offset.y += 0.00050
      }
      else if (e.deltaY > 0)
      {
        darkCylinderTexture.offset.y -= 0.00001
        colorFullCylinderTexture.offset.y -= 0.00001
      }
    
    })
  }
  requestAnimationFrame(animate);
}

animate();
