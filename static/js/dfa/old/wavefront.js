/**
 * Created by tomtz on 2/14/2017.
 */
function createWavefrontScene( lattice, pointSize, vrtxShader, pxlShader, uniforms, timingFunction ) {
    const scene = new THREE.Scene();
    const vertices = lattice.vertices;

    const positions = new Float32Array( vertices.length * 3 );
    const colors    = new Float32Array( vertices.length * 3 );
    const sizes     = new Float32Array( vertices.length );
    const timing    = new Float32Array( vertices.length );

    let vertex;
    const color = new THREE.Color();

    for ( let i = 0, l = vertices.length; i < l; i++ ) {
        vertex = vertices[i];
        vertex.toArray( positions, i * 3 );

        color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
        color.toArray( colors, i * 3 );

        // size is the same
        sizes[ i ]   = pointSize;

        // timing is not
        timing[ i ]   = timingFunction( [1,1,1], [ vertex.x, vertex.y, vertex.z ]);
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