// src/factories/characterFactory.ts
import { CharacterType } from "../models/characterType";

export class CharacterFactory {
  private static flyweights = new Map<string, CharacterType>();

  static getCharacterType(
    character: string,
    font: string,
    size: number
  ): CharacterType {
    try {
      if (!character || !font || !size) {
        throw new Error("Invalid character parameters");
      }

      const key = `${character}-${font}-${size}`;

      if (!this.flyweights.has(key)) {
        this.flyweights.set(key, new CharacterType(character, font, size));
      }

      const flyweight = this.flyweights.get(key);
      if (!flyweight) {
        throw new Error("Failed to retrieve flyweight");
      }

      return flyweight;
    } catch (error) {
      console.error("Error in CharacterFactory:", error);
      throw error;
    }
  }

  static getCreatedCount(): number {
    return this.flyweights.size;
  }

  static getAllKeys(): string[] {
    return Array.from(this.flyweights.keys());
  }

  static clearAll(): void {
    this.flyweights.clear();
  }
}
