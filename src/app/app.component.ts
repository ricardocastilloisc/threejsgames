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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    scene.add(cube)

    scene.add(light)

    camera.position.set(2,2,2)

    camera.lookAt(cube.position)

    setInterval(() => {
      cube.rotation.y += 0.01


      renderer.render(scene, camera)
      //console.log(cube.rotation)
    },1000/60)

    resize.start(renderer)

    //renderer.render(scene, camera);
    //console.log(scene, camera, renderer, cube)
  }
  title = 'test1';

}
