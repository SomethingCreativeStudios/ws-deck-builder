export class SearchModel {
  public name: string = '';
  public souls: string[] = [];
  public types: string[] = [];
  public colors: string[] = [];
  public traits: string[] = [];
  public triggers: string[] = [];

  constructor() {
    this.name = '';
    this.souls = [];
    this.colors = [];
    this.traits = [];
    this.types = [];
    this.triggers = [];
  }
}
