export class Recipe {
  name: string;
  description: string;
  /* path to the image internet */
  imagePath: string;
  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }

}
