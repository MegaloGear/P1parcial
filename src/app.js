
import * as THREE from '../../node_modules/three/build/three.module.js';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import * as dat from '../../node_modules/three/examples/jsm/libs/dat.gui.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const palette = {
    bgColor: '#2c3e50', // CSS string
    planeColor: 0xffff00, // HEX
    //wireframe =false,
    c3: "rgb(255, 0, 0) "

};
var planet= {
    wireframe: false,
    rotar: false,
    eje: 'x'
};
 var cubot = {
    wire : false,
    rotac : false,
    ejes: 'x',
    ejx: 0,
    ejy: 0,
    ejz: 10,
    luz: 0xffcb91,
    intensidad:1,
    sombra: true
 };
export let speed = 0.01;
let spotLight;
let objects = {};


document.body.onload = () => {
    main();
}

window.onresize = () => {
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight, true);

}

function main() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(palette.bgColor, 1);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 20;
    camera.position.y = 0;
    
    // Controles
const controls = new OrbitControls(camera, renderer.domElement);
    // GUI
    loadGUI2();
    // Lights
    setUpLights();

  
//crear plano
const geometry = new THREE.PlaneGeometry( 10,10,4 );
const material = new THREE.MeshPhongMaterial( {color: palette.planeColor, side: THREE.DoubleSide} );
const plane = new THREE.Mesh(geometry, material);
objects.plano = plane;
scene.add(plane);
console.log(objects);

//crear caja
const geo = new THREE.BoxGeometry( 1, 1, 1 );
const mate = new THREE.MeshPhongMaterial( {color: 0x00ff00,side: THREE.DoubleSide });
const cube = new THREE.Mesh( geo, mate );
objects.caja = cube;
scene.add( cube );
console.log(objects);

    // Animar escena
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    updateElements();
    renderer.render(scene, camera);
    
}

function updateElements() {
    renderer.setClearColor(palette.bgColor, 1);
    objects.plano.material.color = new THREE.Color(palette.planeColor);
    objects.plano.material.wireframe= planet.wireframe;
    if(planet.rotar){
        if(planet.eje =='x' ){
            objects.plano.rotation.x +=0.01;
        }
        if(planet.eje =='y' ){
            objects.plano.rotation.y +=0.01;
        }
        if(planet.eje =='z' ){
            objects.plano.rotation.z +=0.01;
        }
    }
    //rotar
    objects.caja.material.color = new THREE.Color(palette.c3);
    objects.caja.material.wireframe= cubot.wire;
    objects.caja.position.x = cubot.ejx;
    objects.caja.position.y = cubot.ejy;
    objects.caja.position.z = cubot.ejz;
    
    spotLight.color = new THREE.Color(cubot.luz);
    spotLight.intensity = cubot.intensidad;

    if(cubot.rotac){
    
        if(cubot.ejes =='x' ){
            objects.caja.rotation.x +=0.01;
            
        }
        if(cubot.ejes =='y' ){
            objects.caja.rotation.y +=0.01;
        }
        if(cubot.ejes =='z' ){
            objects.caja.rotation.z +=0.01;
        }
    }
    objects.caja.castShadow = true;
    objects.plano.receiveShadow= true;

}



function setUpLights() {
    const ambient = new THREE.AmbientLight( 0xffffff, 0.1 );
    scene.add( ambient );

    spotLight = new THREE.SpotLight( 0xffffff, 1 );
    spotLight.position.set( 0, 20, 0 );
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    scene.add( spotLight );
}

function loadGUI2(){

    const gui = new dat.GUI();
    const folder1 = gui.addFolder('Renderer');
    folder1.open();

    var person ={
        name:'Taller Gui'
    }
    //carpeta 1
    folder1.addColor(palette, "bgColor");
//carpeta 2
    const folder2 = gui.addFolder('plano');
    folder2.addColor(palette, "planeColor");

   folder2.add(planet, 'wireframe');
   folder2.add(planet, 'rotar');
   folder2.add(planet, 'eje',['x','y','z']);
  
   //carpeta 3
   const folder3 = gui.addFolder('Cubo');
  

   folder3.addColor(palette,'c3');
   folder3.add(cubot,'wire');
   folder3.add(cubot,'rotac');
   folder3.add(cubot,'ejes',['x','y','z']);
   folder3.add(cubot,'ejx',-100, 100);
   folder3.add(cubot,'ejy',-100, 100);
   folder3.add(cubot,'ejz',-20, 20);
 // carpeta 4
   const folder4 = gui.addFolder('luces');
   folder4.addColor(cubot,'luz');
   folder4.add(cubot,'intensidad',0, 2);
   folder4.add(cubot,'sombra');

 
 

}
