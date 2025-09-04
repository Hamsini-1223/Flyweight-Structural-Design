// src/models/characterType.ts
export class CharacterType {
  private character: string;
  private font: string;
  private size: number;

  constructor(character: string, font: string, size: number) {
    this.character = character;
    this.font = font;
    this.size = size;
  }

  display(row: number, column: number): void {
    console.log(
      `'${this.character}' at (${row},${column}) - ${this.font} ${this.size}px`
    );
  }

  getKey(): string {
    return `${this.character}-${this.font}-${this.size}`;
  }

  getCharacter(): string {
    return this.character;
  }

  getFont(): string {
    return this.font;
  }

  getSize(): number {
    return this.size;
  }
}
