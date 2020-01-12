/**
 * @author kcshin 2020-01-07
 */

class ThreeHelper {
	// ThreeHelper 
  constructor(canvas) 
	{

    this.renderer = ( canvas !== undefined ) ? new THREE.WebGLRenderer({canvas}) : new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();
    
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    this.camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5);
    this.camera.position.z = 10;
  }

	get_renderer()
	{
		return this.renderer;
	}

	get_scene()
	{
		return this.scene;
	}

	get_camera()
	{
		return this.camera;
	}

	add_scean_object(obj)
	{
	  this.scene.add(obj);
	}

	set_camera_position(x, y, z)
	{
		this.camera.position.x = x;
		this.camera.position.y = y;
		this.camera.position.z = z;
	}


	render_once(updater)
	{
		if ( updater !== undefined )			{
			updater();
		}
       
		this.renderer.render(this.scene, this.camera);
	}


	render_animate(updater)
	{
		var renderer = this.renderer;
		var scene = this.scene;
		var camera = this.camera;

		var _animate = function (time) {

			if ( updater !== undefined )			{
				updater(time);
			}

			renderer.render(scene, camera);

			requestAnimationFrame( _animate );
		};
	  
    requestAnimationFrame( _animate );
	}


	getSceneAsJSONString()
	{
		var NUMBER_PRECISION = 6;
		function parseNumber( key, value ) {
			return typeof value === 'number' ? parseFloat( value.toFixed( NUMBER_PRECISION ) ) : value;
		}

		var output = this.scene.toJSON();
		output = JSON.stringify( output, parseNumber, '\t' );
		//output = output.replace( /[\n\t]+([\d\.e\-\[\]]+)/g, '$1' );
		//output = JSON.stringify( output, null, 4 );
		return output;
	}

}


/*
class ThreeHelper {
	// ThreeHelper 생성자와 동일합니다.
	constructor(msg) {
	this.msg = ( msg !== undefined ) ? msg : '';
    }

	set(msg) {
        this.msg = msg;
    }
	get(){
		return this.msg;
	}
}



var ThreeHelper = {
	version: '1.0.0',

	params: {
		width: 0,
		height: 0,
		user_canvas: null       // user provided canvas for snapshot (used if no user_canvas parameter given to snap function)
	},

	_msg: '',
	
	set: function(msg) {
		_msg = msg;	
	},

	get: function(msg) {
		return _msg;	
	}

}
*/