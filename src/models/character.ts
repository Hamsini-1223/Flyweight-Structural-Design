// src/models/character.ts
import { CharacterType } from "./characterType";
import { CharacterFactory } from "../factories/characterFactory";

export class Character {
  private row: number;
  private column: number;
  private characterType: CharacterType;

  constructor(
    character: string,
    row: number,
    column: number,
    font: string = "Arial",
    size: number = 12
  ) {
    try {
      if (!character || row < 1 || column < 1 || size < 1) {
        throw new Error("Invalid character parameters");
      }

      this.row = row;
      this.column = column;
      this.characterType = CharacterFactory.getCharacterType(
        character,
        font,
        size
      );
    } catch (error) {
      console.error("Error creating Character:", error);
      throw error;
    }
  }

  display(): void {
    try {
      this.characterType.display(this.row, this.column);
    } catch (error) {
      console.error("Error displaying character:", error);
    }
  }

  moveTo(row: number, column: number): void {
    try {
      if (row < 1 || column < 1) {
        throw new Error("Invalid position coordinates");
      }
      this.row = row;
      this.column = column;
    } catch (error) {
      console.error("Error moving character:", error);
      throw error;
    }
  }

  getInfo(): string {
    return `${this.characterType.getCharacter()} at (${this.row}, ${
      this.column
    })`;
  }

  getRow(): number {
    return this.row;
  }

  getColumn(): number {
    return this.column;
  }

  getCharacterSymbol(): string {
    return this.characterType.getCharacter();
  }
}
