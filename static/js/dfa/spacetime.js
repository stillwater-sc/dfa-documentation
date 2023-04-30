/**
 * Created by tomtz on 2/24/2017.
 */
function createSpacetimeLattice( N, M, K, cellSize) {
    let lattice = { vertices: [] };

    for ( let i = -N/2; i <= N/2; i++ ) {
        for ( let j = -M/2; j <= M/2; j++ ) {
            for ( let k = -K/2; k <= K/2; k++ ) {
                lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
            }
        }
    }
    return lattice;
}

/**
 * Created by tomtz on 2/24/2017.
 */
function createSpacetimeScene( lattice, pointSize, vrtxShader, pxlShader, uniforms, timingFunction ) {
    let scene = new THREE.Scene();
    let vertices = lattice.vertices;

    let positions = new Float32Array( vertices.length );
    let colors    = new Float32Array( vertices.length );
    let sizes     = new Float32Array( vertices.length );
    let timing    = new Float32Array( vertices.length );

    let vertex;
    let color = new THREE.Color();

    for ( let i = 0, l = vertices.length; i < l; i++ ) {
        vertex = vertices[i];
        vertex.toArray( positions, i * 3 );

        color.setHSL( 0.11, 1.0, 0.5 );
        color.toArray( colors, i * 3 );

        // size is the same
        sizes[ i ]   = pointSize;

        // timing is not
        timing[ i ]   = timingFunction([ vertex.x, vertex.y, vertex.z ]);
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    geometry.setAttribute( 'schedule', new THREE.BufferAttribute( timing, 1 ) );

    let material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( vrtxShader ).textContent,
        fragmentShader: document.getElementById( pxlShader ).textContent,

        alphaTest: 0.9
    } );

    particles = new THREE.Points( geometry, material );
    scene.add( particles );

    return scene;
}

/**
 * Created by tomtz on 2/24/2017.
 */
function sphericalWavefront( vertex ) {
    return Math.abs(vertex[0]) + Math.abs(vertex[1]) + Math.abs(vertex[2])
}