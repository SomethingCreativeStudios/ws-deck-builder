export class SearchModel {
  public name: string = '';
  public text: string = '';
  public souls: string[] = [];
  public types: string[] = [];
  public colors: string[] = [];
  public traits: string[] = [];
  public triggers: string[] = [];

  public minLevel: number = 0;
  public maxLevel: number = 0;
  public minCost: number = 0;
  public maxCost: number = 0;
  public minPower: number = 0;
  public maxPower: number = 0;

  constructor() {
    this.name = '';
    this.souls = [];
    this.colors = [];
    this.traits = [];
    this.types = [];
    this.triggers = [];
    this.text = '';
    this.minLevel = 0;
    this.maxLevel = 0;
    this.minCost = 0;
    this.maxCost = 0;
    this.minPower = 0;
    this.maxPower = 0;
  }
}
