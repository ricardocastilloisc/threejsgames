import * as THREE from 'three';
import loopMachine from '../LoopMachine';

export class TransitionHandler {
  peerId: any;
  mixer: any;
  clock: any;
  mesh: any;
  clips: any;
  lastClip: any;
  interpolationTime: any;
  inProgress: any;
  callback: any;

  constructor(mesh: any, peerId?: any) {
    this.peerId = peerId;
    this.mixer = new THREE.AnimationMixer(mesh);
    this.clock = new THREE.Clock();
    this.mesh = mesh;
    this.clips = mesh.animations.map((animation: any) =>
      this.mixer.clipAction(animation)
    );
    this.lastClip = null;
    this.interpolationTime = 0.2;
    this.inProgress = false;
    this.callback = null;
  }

  run = () => {
    this.mixer.update(this.clock.getDelta());
  };

  start() {
    loopMachine.addCallback(this.run);
  }

  stop() {
    loopMachine.removeCallback(this.run);
    console.log('Stopping TransitionHandler from', this.peerId);
  }

  onCycleFinished = () => {
    this.inProgress = false;
    if (this.callback !== null) {
      this.callback(this.lastClip);
      this.callback = null;
    }
  };

  action(animationId:any, timeScale = 1, cycleFlag = false) {
    if (this.inProgress) {
      return;
    }
    if (cycleFlag) {
      this.mixer.addEventListener('loop', this.onCycleFinished);
      this.inProgress = true;
    }
    this.mixer.timeScale = timeScale;
    if (this.lastClip === animationId) {
      return;
    }
    if (this.lastClip === null) {
      this.clips[animationId].play();
    } else {
      this.clips[animationId].reset().play();
      this.clips[this.lastClip].crossFadeTo(this.clips[animationId], 0.2, true);
    }
    this.lastClip = animationId;
  }
}

export default TransitionHandler;
