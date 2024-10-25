import camera from './Camera';

class Resize {
  renderer: THREE.WebGLRenderer | null; // El tipo ahora acepta WebGLRenderer o null

  constructor() {
    this.renderer = null;
  }

  start(renderer: THREE.WebGLRenderer) {
    // Define que el renderer debe ser de tipo THREE.WebGLRenderer
    this.renderer = renderer;
    window.addEventListener('resize', this.resize.bind(this));
  }

  stop() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.renderer?.setSize(window.innerWidth, window.innerHeight); // Usando el operador de encadenamiento opcional
  }

}

const resize = new Resize();

export default resize;
