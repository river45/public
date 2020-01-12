/**
 * @author kcshin 2020-01-07
 */

function ThreeHelper( autoStart ) {

	this.autoStart = ( autoStart !== undefined ) ? autoStart : true;
	this.startTime = 0;
	this.oldTime = 0;
	this.elapsedTime = 0;
	this.running = false;

	this.msg = "";

}

Object.assign( ThreeHelper.prototype, {

	set: function (msg) {

		this.msg = msg;

	},

	get: function () {

		return this.msg;

	}

} );


export { ThreeHelper };

/**

import { ThreeHelper } from './ThreeHelper.js';
*/