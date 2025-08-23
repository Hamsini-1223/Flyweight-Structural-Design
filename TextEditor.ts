import { Character } from "./Character";
import { CharacterFactory } from "./CharacterFactory";

/**
 * TextEditor - Client class
 * Manages document and uses flyweight pattern for memory efficiency
 */
export class TextEditor {
  private characters: Character[] = [];

  /**
   * Add a single character to the document
   */
  addCharacter(
    character: string,
    row: number,
    column: number,
    font: string = "Arial",
    size: number = 12
  ): void {
    const char = new Character(character, row, column, font, size);
    this.characters.push(char);
  }

  /**
   * Add a string of text to the document
   */
  addText(
    text: string,
    row: number,
    startColumn: number,
    font: string = "Arial",
    size: number = 12
  ): void {
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== " ") {
        // Skip spaces for cleaner output
        this.addCharacter(text[i], row, startColumn + i, font, size);
      }
    }
  }

  /**
   * Display the entire document
   */
  showDocument(): void {
    console.log("\n📄 Document Content:");
    console.log("-".repeat(40));
    this.characters.forEach((char) => char.display());
  }

  /**
   * Show statistics about memory usage
   */
  showStats(): void {
    const totalCharacters = this.characters.length;
    const flyweightCount = CharacterFactory.getCreatedCount();
    const memorySaved = totalCharacters - flyweightCount;

    console.log("\n📊 Memory Statistics:");
    console.log("-".repeat(40));
    console.log(`Total characters in document: ${totalCharacters}`);
    console.log(`Flyweight objects created: ${flyweightCount}`);
    console.log(`Memory objects saved: ${memorySaved}`);
    console.log(
      `Memory efficiency: ${((memorySaved / totalCharacters) * 100).toFixed(
        1
      )}%`
    );
  }

  /**
   * Show which flyweights were created
   */
  showFlyweights(): void {
    console.log("\n🎭 Created Flyweights:");
    console.log("-".repeat(40));
    CharacterFactory.getAllKeys().forEach((key, index) => {
      console.log(`${index + 1}. ${key}`);
    });
  }

  /**
   * Clear the document
   */
  clear(): void {
    this.characters = [];
    console.log("📄 Document cleared");
  }

  /**
   * Get document text representation
   */
  getText(): string {
    // Group characters by row
    const rows: { [key: number]: Character[] } = {};

    this.characters.forEach((char) => {
      const row = char.getRow();
      if (!rows[row]) rows[row] = [];
      rows[row].push(char);
    });

    // Build text representation
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
  }

  // Getter
  getCharacterCount(): number {
    return this.characters.length;
  }
}
