/**
 * Created by tomtz on 2/14/2017.
 */
function createIndexSpaceGeometry( N, M, K, cellSize, center, matmul ) {
    let lattice = { vertices: [] };

    if (center) {
        for ( let i = -N/2; i <= N/2; i++ ) {
            for ( let j = -M/2; j <= M/2; j++ ) {
                for ( let k = -K/2; k <= K/2; k++ ) {
                    lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
                }
            }
        }
    } else {
        for ( let i = 0; i < N; i++ ) {
            for ( let j = 0; j < M; j++ ) {
                for ( let k = 0; k < K; k++ ) {
                    if (matmul) {
                        // create the lattices for a, b, and c recurrences
                        lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
                        lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
                        lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
                    } else {
                        lattice.vertices.push( new THREE.Vector3( i * cellSize, j * cellSize, k * cellSize ) );
                    }
                }
            }
        }
    }

    return lattice;
}

function createIndexSpaceScene( lattice, pointSize ) {
    let scene = new THREE.Scene();
    // var geometry1 = new THREE.BoxGeometry( 200, 200, 200, 16, 16, 16 );
    let vertices = lattice.vertices;

    let positions = new Float32Array( vertices.length * 3 );
    let colors    = new Float32Array( vertices.length * 3 );
    let sizes     = new Float32Array( vertices.length );

    let vertex;
    let color = new THREE.Color();

    let hue = 0.11;
    for ( let i = 0, l = vertices.length; i < l; i++ ) {
        vertex = vertices[i];
        vertex.toArray( positions, i * 3 );

        // color.setHSL( 0.01 + 0.1 * ( i / l ), 1.0, 0.5 );
        color.setHSL( hue, 1.0, 0.5 );
        color.toArray( colors, i * 3 );

        sizes[ i ] = pointSize;
    }

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

    let material = new THREE.ShaderMaterial( {
        uniforms: {
            color:    { value: new THREE.Color( 0xffffff ) },
            texture:  { value: new THREE.TextureLoader().load( "../../textures/sprites/ball.png" ) }
        },

        vertexShader: document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,

        alphaTest: 0.9
    } );

    particles = new THREE.Points( geometry, material );
    scene.add( particles );

    return scene;
}