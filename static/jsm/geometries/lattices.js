import {
    Vector3,
    BufferGeometry,
    Float32BufferAttribute
} from 'three';

// ComputationalSpaceTime contains the lattice points,
// communication vectors, and domain extents that define
// a computational spacetime environment
class ComputationalSpaceTime extends BufferGeometry {
    constructor( N, M, K, cellSize ) {

        super();

        // buffers

        this.indexPoints = [];
        this.type = 'CST';

        this.N = N;
        this.M = M;
        this.K = K;
    }

    clone() {

        return new this.constructor().copy( this );

    }

    copy( source ) {

        this.X = source.X;

        return this;

    }
}

class LinearRight extends ComputationalSpaceTime {
    constructor( indexPoints = 10 ) {
        super();

        this.X = indexPoints;
    }
}

class LinearBi extends ComputationalSpaceTime {
    constructor( indexPoints = 10 ) {
        super();

        this.X = indexPoints;
    }
}

class Grid2D extends ComputationalSpaceTime {
    constructor( X = 10, Y = 10 ) {
        super();

        this.X = X;
        this.Y = Y;
    }
}

class Grid3D extends ComputationalSpaceTime {
    constructor( N, M, K, cellSize ) {

        super();

        // generate indices of the index points such that
        // the center of gravity falls on the Origin
        // this will make the navigation with an OrbitController
        // more intuitive

        const point = new Vector3;
        for ( let i = -N/2; i <= N/2; i++ ) {
            for ( let j = -M/2; j <= M/2; j++ ) {
                for ( let k = -K/2; k <= K/2; k++ ) {
                    point.x = i * cellSize;
                    point.y = j * cellSize;
                    point.z = k * cellSize;
                    this.indexPoints.push( point.x, point.y, point.z );
                }
            }
        }

        // build geometry

        this.setAttribute( 'position', new Float32BufferAttribute( this.indexPoints, 3 ) );

    }
}

class Test extends ComputationalSpaceTime {
    constructor( N, M, K, cellSize ) {

        super();

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute( 'position', positionAttribute );
        this.geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ) );
        this.geometry.setAttribute( 'ca', new THREE.Float32BufferAttribute( colors, 3 ) );

        console.log( this.geometry );

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
}
export { LinearRight };
export { LinearBi };
export { Grid2D };
export { Grid3D };