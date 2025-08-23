import { CharacterType } from "./CharacterType";
import { CharacterFactory } from "./CharacterFactory";

/**
 * Character - Context class
 * Stores extrinsic state (unique data) and holds reference to flyweight
 */
export class Character {
  // Extrinsic state - unique to each character instance
  private row: number; // Row position in document
  private column: number; // Column position in document

  // Reference to shared flyweight object
  private characterType: CharacterType;

  constructor(
    character: string,
    row: number,
    column: number,
    font: string = "Arial",
    size: number = 12
  ) {
    // Store extrinsic state
    this.row = row;
    this.column = column;

    // Get flyweight from factory (this ensures sharing)
    this.characterType = CharacterFactory.getCharacterType(
      character,
      font,
      size
    );
  }

  /**
   * Display this character using its flyweight and position
   */
  display(): void {
    // Pass extrinsic state to flyweight's method
    this.characterType.display(this.row, this.column);
  }

  /**
   * Move character to new position (modifying extrinsic state)
   */
  moveTo(row: number, column: number): void {
    this.row = row;
    this.column = column;
  }

  /**
   * Get character information
   */
  getInfo(): string {
    return `${this.characterType.getCharacter()} at (${this.row}, ${
      this.column
    })`;
  }

  // Getters for extrinsic state
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
