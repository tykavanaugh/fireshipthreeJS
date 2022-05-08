import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
renderer.render(scene,camera);

const geometry = new THREE.TorusGeometry(10,3,16,100);
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry,material)
torus.position.set(5,5,20)

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 5, 10);

const ambientLight = new THREE.AmbientLight(0xffffff,.5);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
const controls = new OrbitControls(camera,renderer.domElement);
scene.add(lightHelper,gridHelper);

const spaceTexture = new THREE.TextureLoader().load('./images/spacebgTexture1.jpg');
scene.background = spaceTexture;

const tyTexture = new THREE.TextureLoader().load('./images/profile.jpeg');
const tyBox = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:tyTexture})
)
tyBox.position.set(0,0,2)
scene.add(tyBox)

const earthCloudTexture = new THREE.TextureLoader().load('./images/earthcloudmap.jpg');
const earthCloud = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:earthCloudTexture,
  })
)
earthCloud.position.set(-2,-5,-30)
scene.add(earthCloud)

const moonTexture = new THREE.TextureLoader().load('./images/moonMap.jpg')
const moonBumpTexture = new THREE.TextureLoader().load('./images/moonBump.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap:moonBumpTexture
  })
)
moon.position.set(15,15,15)
scene.add(moon)

function addStar(){
  const geometry = new THREE.SphereGeometry(0.1,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff,emissive:0xfffffff});
  const star = new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(500).fill().forEach(addStar)

scene.add(torus)

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  tyBox.rotation.x += .05
  tyBox.rotation.y += .023
  tyBox.rotation.z += .03
  camera.position.x = t * -0.05;
  camera.position.y = t * -0.03;
  camera.position.z = t * -0.02;
}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x += .01;
  torus.rotation.y += .005;
  torus.rotation.z += .01;
  controls.update()

  renderer.render(scene,camera);
}

animate()