type KeyMap = { [key: number]: boolean }; // Define un tipo para mapear los códigos de teclas con booleanos

class KeyListener {
    keys: KeyMap;
    caster: (data: [number, boolean, KeyMap]) => void;

    constructor(caster?: (data: [number, boolean, KeyMap]) => void) {
        this.keys = {};
        this.caster = caster || console.log;
    }

    setCaster(caster: (data: [number, boolean, KeyMap]) => void): void {
        this.caster = caster;
    }

    down = (e: KeyboardEvent): void => {
        if (this.keys[e.keyCode]) return;
        this.keys[e.keyCode] = true;
        this.caster([e.keyCode, true, this.keys]);
        // e.preventDefault();
        // e.stopPropagation();
    };

    up = (e: KeyboardEvent): void => {
        this.keys[e.keyCode] = false;
        this.caster([e.keyCode, false, this.keys]);
        // e.preventDefault();
        // e.stopPropagation();
    };

    isPressed(keyCode: number): boolean {
        return this.keys[keyCode] ? this.keys[keyCode] : false;
    }

    start(): void {
        this.stop();
        window.addEventListener('keydown', this.down);
        window.addEventListener('keyup', this.up);
    }

    stop(): void {
        window.removeEventListener('keydown', this.down);
        window.removeEventListener('keyup', this.up);
    }
}

// Instancia por defecto de KeyListener
const keyListener = new KeyListener();

export default keyListener;
export { KeyListener };
