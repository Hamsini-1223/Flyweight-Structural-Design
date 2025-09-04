// src/services/textEditor.ts
import { Character } from "../models/character";
import { CharacterFactory } from "../factories/characterFactory";

export class TextEditor {
  private characters: Character[] = [];

  addCharacter(
    character: string,
    row: number,
    column: number,
    font: string = "Arial",
    size: number = 12
  ): void {
    try {
      const char = new Character(character, row, column, font, size);
      this.characters.push(char);
    } catch (error) {
      console.error("Error adding character:", error);
      throw error;
    }
  }

  addText(
    text: string,
    row: number,
    startColumn: number,
    font: string = "Arial",
    size: number = 12
  ): void {
    try {
      if (!text || row < 1 || startColumn < 1) {
        throw new Error("Invalid text parameters");
      }

      for (let i = 0; i < text.length; i++) {
        if (text[i] !== " ") {
          this.addCharacter(text[i], row, startColumn + i, font, size);
        }
      }
    } catch (error) {
      console.error("Error adding text:", error);
      throw error;
    }
  }

  showDocument(): void {
    try {
      console.log("\nDocument Content:");
      console.log("-".repeat(40));
      this.characters.forEach((char) => char.display());
    } catch (error) {
      console.error("Error displaying document:", error);
    }
  }

  showStats(): void {
    try {
      const totalCharacters = this.characters.length;
      const flyweightCount = CharacterFactory.getCreatedCount();
      const memorySaved = Math.max(0, totalCharacters - flyweightCount);

      console.log("\nMemory Statistics:");
      console.log("-".repeat(40));
      console.log(`Total characters: ${totalCharacters}`);
      console.log(`Flyweight objects: ${flyweightCount}`);
      console.log(`Memory saved: ${memorySaved} objects`);

      if (totalCharacters > 0) {
        console.log(
          `Efficiency: ${((memorySaved / totalCharacters) * 100).toFixed(1)}%`
        );
      }
    } catch (error) {
      console.error("Error showing statistics:", error);
    }
  }

  clear(): void {
    try {
      this.characters = [];
      console.log("Document cleared");
    } catch (error) {
      console.error("Error clearing document:", error);
    }
  }

  getText(): string {
    try {
      const rows: { [key: number]: Character[] } = {};

      this.characters.forEach((char) => {
        const row = char.getRow();
        if (!rows[row]) rows[row] = [];
        rows[row].push(char);
      });

      let result = "";
      Object.keys(rows)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((rowNum) => {
          const sortedChars = rows[rowNum].sort(
            (a, b) => a.getColumn() - b.getColumn()
          );
          const line = sortedChars
            .map((char) => char.getCharacterSymbol())
            .join("");
          result += line + "\n";
        });

      return result;
    } catch (error) {
      console.error("Error getting text:", error);
      return "";
    }
  }

  getCharacterCount(): number {
    return this.characters.length;
  }
}
