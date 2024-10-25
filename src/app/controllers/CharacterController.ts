import { KeyListener } from '../basic/KeyListener';
import loopMachine from '../basic/LoopMachine';

interface Controller {
  init(controller: CharacterController): void;
  tick(): void;
  stop?(controller: CharacterController): void;
}

class CharacterController {
  private controllers: { [key: string]: Controller };
  private character: any;
  public state: any = {};

  constructor() {
    this.controllers = {};
    this.character = null;
    this.state = {};
  }

  addController(controller: any) {
    this.controllers[controller.constructor.name] = controller;
  }

  removeController(controller: any) {
    delete this.controllers[controller.constructor.name];
  }

  addCharacter(character: any) {
    this.character = character;
  }

  start() {
    Object.values(this.controllers).forEach((controller) =>
      controller.init(this)
    );
    loopMachine.addCallback(this.tick);
  }

  private tick = () => {
    Object.values(this.controllers).forEach((controller) => controller.tick());
  };

  stop() {
    Object.values(this.controllers).forEach((controller) => {
      controller.stop?.(this);
    });
    loopMachine.removeCallback(this.tick);
    this.controllers = {};
  }
}

const characterController = new CharacterController();

export default characterController;
export { CharacterController };
