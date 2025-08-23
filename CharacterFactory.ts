import { CharacterType } from "./CharacterType";

/**
 * CharacterFactory - Factory class for managing flyweights
 * Ensures that flyweights are shared and not duplicated
 */
export class CharacterFactory {
  // Static map to store created flyweights
  private static flyweights = new Map<string, CharacterType>();

  /**
   * Get a flyweight for the given character properties
   * Creates new one if doesn't exist, otherwise returns existing one
   */
  static getCharacterType(
    character: string,
    font: string,
    size: number
  ): CharacterType {
    const key = `${character}-${font}-${size}`;

    if (!this.flyweights.has(key)) {
      console.log(`✨ Creating new flyweight: ${key}`);
      this.flyweights.set(key, new CharacterType(character, font, size));
    } else {
      console.log(`♻️  Reusing existing flyweight: ${key}`);
    }

    return this.flyweights.get(key)!;
  }

  /**
   * Get the number of created flyweights
   */
  static getCreatedCount(): number {
    return this.flyweights.size;
  }

  /**
   * Get all created flyweight keys (for debugging)
   */
  static getAllKeys(): string[] {
    return Array.from(this.flyweights.keys());
  }

  /**
   * Clear all flyweights (useful for testing)
   */
  static clearAll(): void {
    this.flyweights.clear();
    console.log("🗑️  All flyweights cleared");
  }
}
