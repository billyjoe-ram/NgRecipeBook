export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, dsc: string, imgPath: string) {
        this.name = name;
        this.description = dsc;
        this.imagePath = imgPath;
    }
}