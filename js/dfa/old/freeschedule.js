/**
 * Created by tomtz on 2/14/2017.
 */
function createFreeScheduleWavefrontScene( lattice, pointSize, vrtxShader, pxlShader, uniforms, timingFunction ) {
    const scene = new THREE.Scene();
    const vertices = lattice.vertices;

    const positions = new Float32Array( vertices.length * 3 );
    const colors    = new Float32Array( vertices.length * 3 );
    const sizes     = new Float32Array( vertices.length );
    const timing    = new Float32Array( vertices.length );

    let vertex;
    const color = new THREE.Color();

    // Set up the data for the THREE.js BufferGeometry API call
    for ( let i = 0, l = vertices.length; i < l; i = i + 3 ) {
        // vertex coordinates of a, b, and c points are the same
        vertex = vertices[i];
        vertex.toArray( positions, i * 3 );
        vertex = vertices[i+1];
        vertex.toArray( positions, (i+1) * 3 );
        vertex = vertices[i+2];
        vertex.toArray( positions, (i+2) * 3 );

        // color of the points are the same
        // color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
        color.setHSL( 0.75, 1.0, 0.5);
        color.toArray( colors, i * 3 );
        color.setHSL( 0.5, 1.0, 0.5);
        color.toArray( colors, (i+1) * 3 );
        color.setHSL( 0, 1.0, 0.5);
        color.toArray( colors, (i+2) * 3 );

        // size is the same
        sizes[ i ]   = pointSize;
        sizes[ i+1 ] = pointSize;
        sizes[ i+2 ] = pointSize;

        // timing is not
        timing[ i ]   = timingFunction( [0,1,0], [ vertex.x, vertex.y, vertex.z ]);
        timing[ i+1 ] = timingFunction( [1,0,0], [ vertex.x, vertex.y, vertex.z ]);
        timing[ i+2 ] = timingFunction( [1,1,1], [ vertex.x, vertex.y, vertex.z ]);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    geometry.setAttribute( 'schedule', new THREE.BufferAttribute( timing, 1 ) );

    const material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( vrtxShader ).textContent,
        fragmentShader: document.getElementById( pxlShader ).textContent,

        alphaTest: 0.9
    } );

    particles = new THREE.Points( geometry, material );
    scene.add( particles );

    return scene;
}