/**
 * CharacterType - Flyweight class
 * Stores intrinsic state (shared data) that can be reused across multiple characters
 */
export class CharacterType {
  private character: string; // The actual character (a, b, c, etc.)
  private font: string; // Font name (Arial, Times, etc.)
  private size: number; // Font size (12, 14, 16, etc.)

  constructor(character: string, font: string, size: number) {
    this.character = character;
    this.font = font;
    this.size = size;
  }

  /**
   * Display method that accepts extrinsic state (position) as parameters
   * This is the key pattern - flyweight uses its internal data + external data
   */
  display(row: number, column: number): void {
    console.log(
      `'${this.character}' at (${row},${column}) - ${this.font} ${this.size}px`
    );
  }

  /**
   * Get unique identifier for this flyweight
   */
  getKey(): string {
    return `${this.character}-${this.font}-${this.size}`;
  }

  // Getters for intrinsic state
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
