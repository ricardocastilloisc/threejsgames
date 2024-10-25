interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  y: number;
}

interface Character {
  position: Position;
  rotation: Rotation;
}

interface CharacterState {
  translation: { x: number; y: number };
}

class MoveController {
  private peerId: string | undefined;
  private state: CharacterState | null;
  private character: Character | null;
  private speed: number;

  constructor(peerId?: string) {
    this.peerId = peerId;
    this.state = null;
    this.character = null;
    this.speed = 0.09;
  }

  init(characterController: { state: CharacterState; character: Character }) {
    this.state = characterController.state;
    this.character = characterController.character;
  }

  tick() {
    if (!this.character || !this.state) return;

    const position = this.character.position;
    const rotation = this.character.rotation;
    const { translation } = this.state;

    const HALF_PI = Math.PI / 2;

    if (translation.y === 1) {
      position.x += Math.sin(rotation.y) * this.speed;
      position.z += Math.cos(rotation.y) * this.speed;
    } else if (translation.y === -1) {
      position.x -= Math.sin(rotation.y) * this.speed;
      position.z -= Math.cos(rotation.y) * this.speed;
    }

    if (translation.x === 1) {
      position.x += Math.sin(rotation.y + HALF_PI) * this.speed;
      position.z += Math.cos(rotation.y + HALF_PI) * this.speed;
    } else if (translation.x === -1) {
      position.x += Math.sin(rotation.y - HALF_PI) * this.speed;
      position.z += Math.cos(rotation.y - HALF_PI) * this.speed;
    }
  }
}

const moveController = new MoveController();

export default moveController;
export { MoveController };
