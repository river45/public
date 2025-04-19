/**
 * @author kcshin 2020-01-07
 */

class ThreeHelper {
  constructor(canvas) {
    this.renderer = canvas ? new THREE.WebGLRenderer({ canvas }) : new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.z = 10;
  }

  get_renderer() {
    return this.renderer;
  }

  get_scene() {
    return this.scene;
  }

  get_camera() {
    return this.camera;
  }

  add_scene_object(obj) {
    if (!obj) {
      throw new Error("Invalid object: Cannot add undefined or null to the scene.");
    }
    this.scene.add(obj);
  }

  set_camera_position(x, y, z) {
    this.camera.position.set(x, y, z);
  }

  // 공통 렌더링 메서드
  _render(updater, time) {
    if (!this.renderer || !this.scene || !this.camera) {
      throw new Error("Renderer, scene, or camera is not initialized.");
    }

    if (updater) {
      updater(time);
    }

    this.renderer.render(this.scene, this.camera);
  }

  render_once(updater) {
    this._render(updater);
  }

  render_animate(updater) {
    const _animate = (time) => {
      this._render(updater, time);
      requestAnimationFrame(_animate);
    };

    requestAnimationFrame(_animate);
  }

  getSceneAsJSONString() {
    const NUMBER_PRECISION = 6;

    function parseNumber(key, value) {
      return typeof value === "number" ? parseFloat(value.toFixed(NUMBER_PRECISION)) : value;
    }

    if (!this.scene) {
      throw new Error("Scene is not initialized.");
    }

    const output = this.scene.toJSON();
    return JSON.stringify(output, parseNumber, "\t");
  }
}