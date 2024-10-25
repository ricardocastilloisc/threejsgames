import * as THREE from 'three';

const renderer: THREE.WebGLRenderer  = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export default renderer;
