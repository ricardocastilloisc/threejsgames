import { animationBehaviour } from '../basic/animations/AnimationBehaviour.js';
import TransitionHandler from '../basic/animations/TransitionHandler.js';
import { mode } from './ModeController.js';

// Define una interfaz para el estado del controlador de personajes
export interface CharacterState {
  mode: any; // Representa el modo actual
  translation: {
    x: number; // Movimiento en el eje X
    y: number; // Movimiento en el eje Y
  };
}

// Define una interfaz para el controlador de personajes
export interface CharacterController {
  state: CharacterState; // El estado del personaje
  character: any; // Puedes especificar un tipo más concreto si es necesario
}

export class AnimationController {
  private state!: CharacterState; // Estado inicializado más tarde
  private transitionHandler: any;

  constructor() {
    this.transitionHandler = null; // Inicializa la propiedad como null
  }

  init(characterController: CharacterController) {
    this.state = characterController.state; // Se asigna el estado del controlador de personajes
    if (!this.transitionHandler) {
      this.transitionHandler = new TransitionHandler(
        characterController.character
      ); // Se crea el manejador de transición
    }
    this.transitionHandler.start(); // Inicia las transiciones
  }

  stop() {
    if (this.transitionHandler) {
      this.transitionHandler.stop(); // Detiene las transiciones si el manejador existe
    }
  }

  tick() {
    const speed = 1.2; // Velocidad para las acciones de transición
    if (this.state.mode === mode.IDLE) {
      if (false) {
        // Placeholder para lógica futura
      } else if (this.state.translation.x === 1) {
        this.transitionHandler.action(animationBehaviour.strafeLeft, speed);
      } else if (this.state.translation.x === -1) {
        this.transitionHandler.action(animationBehaviour.strafeRight, speed);
      } else if (this.state.translation.y === 1) {
        this.transitionHandler.action(animationBehaviour.runForward, speed);
      } else if (this.state.translation.y === -1) {
        this.transitionHandler.action(animationBehaviour.runBackward, speed);
      } else {
        this.transitionHandler.action(animationBehaviour.idle);
      }
    } else if (this.state.mode === mode.SHOOTER) {
      if (false) {
        // Placeholder para lógica futura
      } else if (this.state.translation.x === 1) {
        this.transitionHandler.action(
          animationBehaviour.shooterStrafeLeft,
          speed
        );
      } else if (this.state.translation.x === -1) {
        this.transitionHandler.action(
          animationBehaviour.shooterStrafeRight,
          speed
        );
      } else if (this.state.translation.y === 1) {
        this.transitionHandler.action(
          animationBehaviour.shooterRunForward,
          speed
        );
      } else if (this.state.translation.y === -1) {
        this.transitionHandler.action(
          animationBehaviour.shooterRunBackward,
          speed
        );
      } else {
        this.transitionHandler.action(animationBehaviour.shooterIdle);
      }
    }
  }
}

export const animationController = new AnimationController();
