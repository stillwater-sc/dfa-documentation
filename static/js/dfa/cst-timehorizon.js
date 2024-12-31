
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
let count = 0;

let timeLast = 0;

let run = true;

let timeElapsed = 0;

let periodOfTenthOfSeconds = 8;

class IndexSpaceGeometry extends THREE.BufferGeometry {

    constructor( constraints, radius ) {

        super();

        this.type = 'IndexSpaceGeometry';

        this.parameters = {
            width: radius,
            height: radius,
            depth: radius
        };

        const scope = this;

        // segments

        //widthSegments = Math.floor( widthSegments );
        //heightSegments = Math.floor( heightSegments );
        //depthSegments = Math.floor( depthSegments );

        // buffers

        const indices = [];
        const vertices = [];
        //const normals = [];
        //const uvs = [];
        const signatures = [];
        // helper variables

        let numberOfVertices = 0;
        let groupStart = 0;

        buildIndexSpace( constraints, radius, 0 );

        // build each side of the box geometry

        //buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
        //buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
        //buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
        //buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
        //buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
        //buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

        // build geometry

        this.setIndex( indices );

        this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        this.setAttribute( 'signature', new THREE.Float32BufferAttribute( signatures, 3 ) );
        //this.setAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
        //this.setAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );

        function buildIndexSpace( constraints, radius, materialIndex ) {

            const xl = constraints[ 0 ];
            const xh = constraints[ 1 ];
            const yl = constraints[ 2 ];
            const yh = constraints[ 3 ];
            const zl = constraints[ 4 ];
            const zh = constraints[ 5 ];
            const width = xh - xl;
            const height = yh - yl;
            const depth = zh - zl;
            const halfRadius = radius / 2;

            const cellSize = radius / ( width - 2 );

            let vertexCounter = 0;
            let groupCount = 0;

            const vector = new THREE.Vector3();

            // generate index points

            for ( let i = xl; i < xh; i ++ ) {

                for ( let j = yl; j < yh; j ++ ) {

                    for ( let k = zl; k < zh; k ++ ) {

                        console.log( i + ', ' + j + ', ' + k );
                        signatures.push( i, j, k );

                        // set values to correct vector component

                        vector.x = i * cellSize - halfRadius;
                        vector.y = j * cellSize - halfRadius;
                        vector.z = k * cellSize - halfRadius;

                        console.log( vector );

                        // now apply vector to vertex buffer

                        vertices.push( vector.x, vector.y, vector.z );

                        // counters

                        vertexCounter += 1;

                    }

                }

            }

            // add a group to the geometry. this will ensure multi material support

            scope.addGroup( groupStart, groupCount, materialIndex );

            // calculate new start value for groups

            groupStart += groupCount;

            // update total number of vertices

            numberOfVertices += vertexCounter;

        }


    }

    copy( source ) {

        super.copy( source );

        this.parameters = Object.assign( {}, source.parameters );

        return this;

    }

    static fromJSON( data ) {

        return new IndexSpaceGeometry( data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments );

    }

}

let  stats;
let indexSpace, length1;

init();
animate();

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
    camera.position.set( 0, 0, 100);
    scene.add( camera );

    // controls

    const controls = new OrbitControls( camera, renderer.domElement );

    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.1;
    controls.target = new THREE.Vector3(6.5,6.5,6.5);
    controls.enabled = false;

    const geometry = makeGeo();


    const material = makeMaterial();


    indexSpace = new THREE.Points( geometry, material );

    scene.add( indexSpace );


}

function makeGeo(){

    const radius = 50;
    const constraints = [ 0, 15, 0, 15, 0, 1 ];

    const latticeGeometry = new IndexSpaceGeometry( constraints, radius );

    const positionAttribute = latticeGeometry.getAttribute( 'position' );
    const signatureAttribute = latticeGeometry.getAttribute( 'signature' );

    const colors = new Float32Array(positionAttribute.count * 3);

    const sizes = [];

    const color = new THREE.Color();
    const vertex = new THREE.Vector3();

    length1 = latticeGeometry.getAttribute( 'position' ).count;


    for ( let i = 0, l = positionAttribute.count; i < l; i ++ ) {

        vertex.fromBufferAttribute( positionAttribute, i );


        color.setRGB( 1 ,1 ,1 );
        color.toArray(colors, i * 3 + 1);

        sizes[ i ] = i < length1 ? 100 : 40;

    }




    const wavefront = [
        14, 13, 12, 11, 10,  9,  8,  7,  8,  9, 10, 11, 12, 13, 14,  // First row
        13, 12, 11, 10,  9,  8,  7,  6,  7,  8,  9, 10, 11, 12, 13,  // Second row
        12, 11, 10,  9,  8,  7,  6,  5,  6,  7,  8,  9, 10, 11, 12,  // Third row
        11, 10,  9,  8,  7,  6,  5,  4,  5,  6,  7,  8,  9, 10, 11,  // Fourth row
        10,  9,  8,  7,  6,  5,  4,  3,  4,  5,  6,  7,  8,  9, 10,  // Fifth row
        9,  8,  7,  6,  5,  4,  3,  2,  3,  4,  5,  6,  7,  8,  9,  // Sixth row
        8,  7,  6,  5,  4,  3,  2,  1,  2,  3,  4,  5,  6,  7,  8,  // Seventh row
        7,  6,  5,  4,  3,  2,  1,  0,  1,  2,  3,  4,  5,  6,  7,  // Eighth row
        8,  7,  6,  5,  4,  3,  2,  1,  2,  3,  4,  5,  6,  7,  8,  // Ninth row
        9,  8,  7,  6,  5,  4,  3,  2,  3,  4,  5,  6,  7,  8,  9,  // Tenth row
        10,  9,  8,  7,  6,  5,  4,  3,  4,  5,  6,  7,  8,  9, 10,  // Eleventh row
        11, 10,  9,  8,  7,  6,  5,  4,  5,  6,  7,  8,  9, 10, 11,  // Twelfth row
        12, 11, 10,  9,  8,  7,  6,  5,  6,  7,  8,  9, 10, 11, 12,  // Thirteenth row
        13, 12, 11, 10,  9,  8,  7,  6,  7,  8,  9, 10, 11, 12, 13,  // Fourteenth row
        14, 13, 12, 11, 10,  9,  8,  7,  8,  9, 10, 11, 12, 13, 14,  // Fifteenth row
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', positionAttribute );
    geometry.setAttribute( 'signature', signatureAttribute );
    geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
    geometry.setAttribute('wavefront', new THREE.Float32BufferAttribute(wavefront, 1));
    const colorsAttribute = new THREE.Float32BufferAttribute(colors, 3);
    geometry.setAttribute('ca', colorsAttribute);

    return geometry;

}
function makeMaterial(){


    const texture = new THREE.TextureLoader().load( '../../textures/sprites/ball.png' );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.ShaderMaterial( {



        uniforms: {
            color: { value: new THREE.Color( 0xffffff ) },
            pointTexture: { value: texture }
        },
        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        transparent: true,
        vertexColors: true


    } );

    return material;

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
function sortPoints() {

    const vector = new THREE.Vector3();

    // Model View Projection matrix

    const matrix = new THREE.Matrix4();
    matrix.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    matrix.multiply( indexSpace.matrixWorld );

    //

    const geometry = indexSpace.geometry;

    let index = geometry.getIndex();
    const positions = geometry.getAttribute( 'position' ).array;
    const length = positions.length / 3;

    if ( index === null ) {

        const array = new Uint16Array( length );

        for ( let i = 0; i < length; i ++ ) {

            array[ i ] = i;

        }

        index = new THREE.BufferAttribute( array, 1 );

        geometry.setIndex( index );

    }

    const sortArray = [];

    for ( let i = 0; i < length; i ++ ) {

        vector.fromArray( positions, i * 3 );
        vector.applyMatrix4( matrix );

        sortArray.push( [ vector.z, i ] );

    }

    function numericalSort( a, b ) {

        return b[ 0 ] - a[ 0 ];

    }

    sortArray.sort(numericalSort);

    const indices = index.array;

    for ( let i = 0; i < length; i ++ ) {

        indices[ i ] = sortArray[ i ][ 1 ];

    }

    geometry.index.needsUpdate = true;

}

function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    // time is in tenths of seconds
    const time = Date.now() * 0.01;

    console.log("the time" ,time);

    console.log("the timeLast" ,timeLast);

    const diff = time - timeLast;

    renderer.render( scene, camera );

    timeElapsed += diff;

    if (timeElapsed < periodOfTenthOfSeconds)
        return;

    timeElapsed = 0;

    timeLast = Date.now() * 0.01;

    nextAnimationFrame();

    sortPoints();


    if ( resizeRendererToDisplaySize( renderer ) ) {

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

    }

    renderer.render( scene, camera );

    requestAnimationFrame( render );

}
function nextAnimationFrame(){

    const geometry = indexSpace.geometry;
    const attributes = geometry.attributes;

    //grabs the highest wavefront value
    const high = geometry.getAttribute('wavefront').array[attributes.wavefront.array.length - 1] + 1;


    for (let i = 0; i < attributes.size.array.length; i++) {



        if (geometry.getAttribute('wavefront').array[i] == count) {

            attributes.size.array[i] = 14;

            attributes.ca.array[i * 3] = 0.3;
            attributes.ca.array[i * 3 + 1] = 1;
            attributes.ca.array[i * 3 + 2] = 0.5;
        }
        else{
            attributes.size.array[i] = 6;

            attributes.ca.array[i * 3] = 1;
            attributes.ca.array[i * 3 + 1] = 1;
            attributes.ca.array[i * 3 + 2] = 1;

        }
    }
    count++;
    if (count == high)
        count = 0;


    console.log(count);

    attributes.size.needsUpdate = true;

    attributes.ca.needsUpdate = true;

}



requestAnimationFrame(render);


