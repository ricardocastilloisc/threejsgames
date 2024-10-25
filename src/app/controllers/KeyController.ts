import keyListener, { KeyListener } from '../basic/KeyListener';
import { keyCode } from '../basic/KeyCode';

interface CharacterState {
  translation: { x: number; y: number };
  rotation: { y: number };
  angle: { y: number };
}

class KeyController {
  private peerId: string | undefined;
  private keyListener: KeyListener;
  private state: Partial<CharacterState> = {};

  constructor(peerId?: string) {
    this.peerId = peerId;
    this.keyListener = keyListener;
  }

  setKeyListener(keyListener: KeyListener) {
    this.keyListener = keyListener;
  }

  init(characterController: { state: Record<string, any> }) {
    this.state = characterController.state;
    this.state.translation = { x: 0, y: 0 };
    this.state.rotation = { y: 0 };
    this.state.angle = { y: 0 };
  }

  tick() {
    const { translation, rotation, angle } = this.state;
    if (translation && rotation && angle) {
      translation.x = 0;
      translation.y = 0;
      rotation.y = 0;
      angle.y = 0;

      if (this.keyListener.isPressed(keyCode.KEY_W)) translation.y = 1;
      if (this.keyListener.isPressed(keyCode.KEY_S)) translation.y = -1;
      if (this.keyListener.isPressed(keyCode.KEY_A)) translation.x = 1;
      if (this.keyListener.isPressed(keyCode.KEY_D)) translation.x = -1;
      if (this.keyListener.isPressed(keyCode.LEFT_ARROW)) rotation.y = 1;
      if (this.keyListener.isPressed(keyCode.RIGHT_ARROW)) rotation.y = -1;
    }
  }
}

const keyController = new KeyController();

export default keyController;
export { KeyController };
