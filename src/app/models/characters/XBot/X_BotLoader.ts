import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { fileList } from './Filelist';
import * as THREE from 'three';
import PromiseLoader from '../../../basic/PromiseLoader';
import AnimationLoader from '../../../basic/animations/AnimationLoader';

const folder = 'assets/models/characters/XBot/';
const urlAnimations: any = {};

for (const [key, value] of Object.entries(fileList)) {
  urlAnimations[key] = folder + 'animations/' + value;
}

const urlModel = folder + 'X_Bot.fbx';
const X_BotLoader = () => {

  new FBXLoader().load


  const animationLoader = new AnimationLoader(urlModel, urlAnimations);
  const promiseLoader = new PromiseLoader(FBXLoader, (object: any) => {
    const scale = 0.005;
    object.scale.set(scale, scale, scale);
    object.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    object.castShadow = true;
    object.receiveShadow = true;
    return object;
  });

  animationLoader.addPromiseLoader(promiseLoader);
  return animationLoader.getModelWithAnimations();
};

export default X_BotLoader;
