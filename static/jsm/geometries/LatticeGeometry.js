import {
	Vector3,
	BufferGeometry,
	Float32BufferAttribute
} from 'three';

class LatticeGeometry extends BufferGeometry {

	constructor( N, M, K, cellSize ) {

		super();

		// buffers

		const indexPoints = [];

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
					indexPoints.push( point.x, point.y, point.z );
				}
			}
		}

		// build geometry

		this.setAttribute( 'position', new Float32BufferAttribute( indexPoints, 3 ) );

	}

}

export { LatticeGeometry };
