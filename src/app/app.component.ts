import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import scene from './basic/Scene';
import camera from './basic/Camera';
import renderer from './basic/Renderer';
import cube from './basic/shapes/Cube';
import light from './basic/Light';
import resize from './basic/Resize';
import plane from './basic/shapes/Plane';
import loopMachine from './basic/LoopMachine';
import keyListener from './basic/KeyListener';
import { keyCode } from './basic/KeyCode';
import characterController from './controllers/CharacterController';
import keyController from './controllers/KeyController';
import moveController from './controllers/MoveController';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    scene.add(cube);

    scene.add(light);

    scene.add(plane);

    camera.position.set(2, 2, -2);

    characterController.addCharacter(cube)
    characterController.addController(keyController)
    characterController.addController(moveController)

    loopMachine.addCallback(() => {
      camera.lookAt(cube.position);
      if(keyListener.isPressed(keyCode.ENTER)) cube.rotation.y += 0.01;
      renderer.render(scene, camera);

    });

    resize.start(renderer);

    loopMachine.start();
    keyListener.start();
    characterController.start()

  }
  title = 'test1';
}


