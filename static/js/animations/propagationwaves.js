
import * as THREE from 'three';
import {
    BufferGeometry,
    Float32BufferAttribute
} from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { LatticeGeometry } from 'three/addons/geometries/LatticeGeometry.js';
import * as Lattice from 'three/addons/geometries/lattices.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

let group, camera, scene, renderer, params;

function init() {

    scene = new THREE.Scene();

    const canvas = document.querySelector( '#c' );
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // camera
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 1;
    const far = 1000;
    camera = new THREE.PerspectiveCamera( fov, aspect, near, far);
    camera.position.set( 15, 20, 30 );
    scene.add( camera );

    // controls

    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 20;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // ambient light

    scene.add( new THREE.AmbientLight( 0x222222 ) );

    // point light

    const light = new THREE.PointLight( 0xffffff, 1 );
    camera.add( light );

    // helper
    // disable the Axes as we generate the index space with the center ot 0
    // scene.add( new THREE.AxesHelper( 20 ) );

    // textures

    const loader = new THREE.TextureLoader();
    const texture = loader.load( '../../textures/sprites/disc.png' );

    group = new THREE.Group();
    scene.add( group );

    // points

    const latticeGeometry = new LatticeGeometry(5, 5, 5, 4);
    const vertices = [];
    const positionAttribute = latticeGeometry.getAttribute( 'position' );

    for ( let i = 0; i < positionAttribute.count; i ++ ) {

        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute( positionAttribute, i );
        vertices.push( vertex );

    }

    const pointsMaterial = new THREE.PointsMaterial( {
        color: 0x0080ff,
        map: texture,
        size: 1,
        alphaTest: 0.5
    } );

    const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

    const points = new THREE.Points( pointsGeometry, pointsMaterial );
    group.add( points );


}


function indexSpace() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
    geometry.setAttribute( 'ca', new THREE.Float32BufferAttribute( colors, 3 ) );

    console.log( geometry );

    //

    const texture = new THREE.TextureLoader().load( 'textures/sprites/disc.png' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.ShaderMaterial( {

        uniforms: {
            color: { value: new THREE.Color( 0xffffff ) },
            pointTexture: { value: texture }
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        transparent: true

    } );
}
function AddComputationalSpaceTime() {

}

function setupGUI() {
    const computationalSpacetimes = {
        linearOne: new Lattice.LinearRight(10),
        linearBi: new Lattice.LinearBi(10),
        grid2D: new Lattice.Grid2D(10),
        grid3D: new Lattice.Grid3D(5)
    };

    params = {
        lattice: 'linearBi',
        size: 10,
        metallic: true
    };

    let h;

    const gui = new GUI();

    // material (attributes)

    h = gui.addFolder( 'Computational Spacetime' );
    h.add( params, 'lattice', Object.keys( computationalSpacetimes ) ).onChange( function() {
        AddComputationalSpaceTime();
    });

    h = gui.addFolder( 'Spacetime extent' );

    h.add( params, 'size', 5.0, 20.0, 1.0 ).name( 'size' ).onChange( render );
}

function animate() {

    requestAnimationFrame( animate );

    //group.rotation.y += 0.005;

    render();

}

function resizeRendererToDisplaySize( renderer ) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {

        renderer.setSize( width, height, false );

    }

    return needResize;

}

function render( time ) {

    time *= 0.001;

    if ( resizeRendererToDisplaySize( renderer ) ) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }

    renderer.render( scene, camera );

    requestAnimationFrame( render );

}


init();
setupGUI();
requestAnimationFrame(render);


