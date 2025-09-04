// src/main.ts
import { TextEditor } from "./services/textEditor";
import { CharacterFactory } from "./factories/characterFactory";
import prompt from "prompt-sync";

const input = prompt();

class FlyweightDemo {
  private editor: TextEditor;

  constructor() {
    this.editor = new TextEditor();
  }

  private showMenu(): void {
    console.clear();
    console.log("Flyweight Pattern Demo - Text Editor");
    console.log("=".repeat(40));
    console.log("1. Add text");
    console.log("2. View document");
    console.log("3. Show statistics");
    console.log("4. Clear document");
    console.log("5. Demo");
    console.log("0. Exit");
    console.log("=".repeat(40));
  }

  private addText(): void {
    try {
      console.clear();
      console.log("Add Text");
      console.log("-".repeat(20));

      const text = input("Enter text: ");
      if (!text) {
        console.log("No text entered!");
        return;
      }

      const rowInput = input("Row (default: 1): ") || "1";
      const row = parseInt(rowInput);
      if (isNaN(row) || row < 1) {
        console.log("Invalid row number!");
        return;
      }

      const columnInput = input("Column (default: 1): ") || "1";
      const column = parseInt(columnInput);
      if (isNaN(column) || column < 1) {
        console.log("Invalid column number!");
        return;
      }

      this.editor.addText(text, row, column);
      console.log(`Added "${text}" at position (${row}, ${column})`);
    } catch (error) {
      console.error("Error adding text:", error);
    }

    this.waitForEnter();
  }

  private viewDocument(): void {
    try {
      console.clear();
      if (this.editor.getCharacterCount() === 0) {
        console.log("Document is empty");
      } else {
        this.editor.showDocument();
        console.log("\nText representation:");
        console.log("-".repeat(20));
        console.log(this.editor.getText());
      }
    } catch (error) {
      console.error("Error viewing document:", error);
    }

    this.waitForEnter();
  }

  private showStatistics(): void {
    try {
      console.clear();
      if (this.editor.getCharacterCount() === 0) {
        console.log("No characters in document");
      } else {
        this.editor.showStats();
      }
    } catch (error) {
      console.error("Error showing statistics:", error);
    }

    this.waitForEnter();
  }

  private clearDocument(): void {
    try {
      console.clear();
      const confirm = input("Clear document? (y/N): ").toLowerCase();

      if (confirm === "y" || confirm === "yes") {
        this.editor.clear();
        CharacterFactory.clearAll();
        console.log("Document cleared");
      } else {
        console.log("Clear cancelled");
      }
    } catch (error) {
      console.error("Error clearing document:", error);
    }

    this.waitForEnter();
  }

  private runDemo(): void {
    try {
      console.clear();
      console.log("Running Demo");
      console.log("-".repeat(20));

      this.editor.clear();
      CharacterFactory.clearAll();

      this.editor.addText("Hello", 1, 1, "Arial", 12);
      this.editor.addText("World", 2, 1, "Arial", 12);
      this.editor.addText("Test", 3, 1, "Times", 14);

      console.log("\nDemo complete:");
      this.editor.showStats();
    } catch (error) {
      console.error("Error running demo:", error);
    }

    this.waitForEnter();
  }

  private waitForEnter(): void {
    input("\nPress Enter to continue...");
  }

  private processChoice(choice: string): void {
    try {
      switch (choice) {
        case "1":
          this.addText();
          break;
        case "2":
          this.viewDocument();
          break;
        case "3":
          this.showStatistics();
          break;
        case "4":
          this.clearDocument();
          break;
        case "5":
          this.runDemo();
          break;
        case "0":
          console.clear();
          console.log("Goodbye!");
          process.exit(0);
        default:
          console.log("Invalid option");
          this.waitForEnter();
      }
    } catch (error) {
      console.error("Error processing choice:", error);
      this.waitForEnter();
    }
  }

  start(): void {
    try {
      while (true) {
        this.showMenu();
        const choice = input("Enter choice (0-5): ");
        this.processChoice(choice);
      }
    } catch (error) {
      console.error("Error in main loop:", error);
      process.exit(1);
    }
  }
}

function main(): void {
  try {
    const demo = new FlyweightDemo();
    demo.start();
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

process.on("SIGINT", () => {
  console.log("\n\nGoodbye!");
  process.exit(0);
});

main();
