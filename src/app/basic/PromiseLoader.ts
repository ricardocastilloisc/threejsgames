
export class PromiseLoader {
  loader: any; // Constructor type for the loader class; replace 'any' with a specific type if known
  callback: any; // Function type for the callback; replace 'any' with a specific type if known

  constructor(loader: any, callback:  any) {
    this.loader = loader;
    this.callback = callback;
  }

  load(url:any) { // Replace 'any' with the specific return type if known
    const loaderInstance = new this.loader();

    try {
      return new Promise((resolve, rej) => {
        loaderInstance.load(url, (object: any) => { // Replace 'any' with the specific type if known
          resolve(this.callback(object));
        },
        (xhr:any) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
        },

        (error:any) => {
          console.error('Error al cargar el modelo FBX:', error);
          console.error('Error al cargar el modelo FBX:', url);
        }

      );
      }).catch((error: any) => {
        console.log('esta es la url que no le gusto =>', url)
      });
    } catch (error) {
      console.log('esta es la url que no le gusto =>', url)
      return
    }

  }
}

export default PromiseLoader;
