class AnimationLoader {
  model: any;
  urlModel: string;
  urlAnimations: any;
  promiseLoader!: any;

  constructor(urlModel: string, urlAnimations: any) {
      this.model = null;
      this.urlModel = urlModel;
      this.urlAnimations = urlAnimations;
  }

  addPromiseLoader(promiseLoader: any) {
      this.promiseLoader = promiseLoader;
  }

  getModelWithAnimations(): any {
      return new Promise((res, rej) => {
          const animationAndModelPromises: any[] = [];


          animationAndModelPromises.push(this.promiseLoader.load(this.urlModel));

          Object.keys(this.urlAnimations).forEach(stringIndex => {
              animationAndModelPromises.push(this.promiseLoader.load(this.urlAnimations[stringIndex]));
          });

          Promise.all(animationAndModelPromises).then(payload => {
              const model = payload.shift();
              const animationEmptyModels = payload;
              const animations: any[] = [];

              Object.keys(this.urlAnimations).forEach( (stringIndex:any) => {
                animations[stringIndex*1] = animationEmptyModels.shift().animations[0]
              });

              model.animations = animations;
              res(model);
          }).catch((err) =>{
            console.log('aqui me mori')
          });
      });
  }
}

export default AnimationLoader;
