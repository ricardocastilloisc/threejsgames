export const mode = {
  IDLE: 0,
  STEALTH: 1,
  RUNNER: 2,
  SHOOTER: 3,
} ;

export type ModeType = typeof mode[keyof typeof mode]; // Define un tipo para los modos

export interface CharacterController {
  state: {
    mode: ModeType;
  };
}

export class ModeController {
  private state!: CharacterController['state'];

  constructor() {}

  init(characterController: CharacterController) {
    this.state = characterController.state;
    this.state.mode = mode.IDLE; // Se utiliza 'mode.IDLE'
  }

  tick() {
    // this.state.mode = mode.IDLE;
    // if (this.keyListener.isPressed("Shift")) {
    //   this.state.mode = mode.SHOOTER;
    // }
  }
}

export const modeController = new ModeController();
