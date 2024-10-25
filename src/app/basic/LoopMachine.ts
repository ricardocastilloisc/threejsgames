type Callback = () => void;

class LoopMachine {
  private callbacks: Set<Callback>; // Usamos Set para evitar duplicados automáticamente
  private flag: boolean;

  constructor() {
    this.flag = false;
    this.callbacks = new Set();
  }

  addCallback(callback: Callback) {
    this.callbacks.add(callback); // Set se encarga de evitar duplicados
  }

  removeCallback(callback: Callback) {
    this.callbacks.delete(callback); // Usamos delete para remover del Set
  }

  private run = () => { // Usamos arrow function para preservar el contexto de 'this'
    if (!this.flag) return;
    this.callbacks.forEach(callback => callback());
    window.requestAnimationFrame(this.run);
  };

  start() {
    if (this.flag) return;
    this.flag = true;
    this.run();
  }

  stop() {
    this.flag = false;
  }
}

const loopMachine = new LoopMachine();

export default loopMachine;
export { LoopMachine };
