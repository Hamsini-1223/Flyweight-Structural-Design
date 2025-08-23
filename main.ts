import { TextEditor } from "./TextEditor";
import { CharacterFactory } from "./CharacterFactory";
import * as prompt from "prompt-sync";

// Initialize prompt for console input
const input = prompt();

/**
 * Interactive Console Interface for Flyweight Pattern Demo
 */
class InteractiveDemo {
  private editor: TextEditor;
  private running: boolean = true;

  constructor() {
    this.editor = new TextEditor();
  }

  /**
   * Display the main menu
   */
  private showMenu(): void {
    console.clear();
    console.log("🎭 Interactive Flyweight Pattern Demo - Text Editor");
    console.log("=".repeat(55));
    console.log("");
    console.log("📋 Choose an option:");
    console.log("");
    console.log("  1️⃣  Add text to document");
    console.log("  2️⃣  View document content");
    console.log("  3️⃣  Show memory statistics");
    console.log("  4️⃣  Show flyweight details");
    console.log("  5️⃣  Clear document");
    console.log("  6️⃣  Run auto demo");
    console.log("  7️⃣  Help & Pattern explanation");
    console.log("  0️⃣  Exit");
    console.log("");
    console.log("=".repeat(55));
  }

  /**
   * Add text to the document
   */
  private addText(): void {
    console.clear();
    console.log("📝 Add Text to Document");
    console.log("-".repeat(30));

    const text = input("Enter text: ");
    if (!text) {
      console.log("❌ No text entered!");
      this.waitForEnter();
      return;
    }

    const rowInput = input("Enter row number (default: 1): ") || "1";
    const row = parseInt(rowInput);
    if (isNaN(row) || row < 1) {
      console.log("❌ Invalid row number!");
      this.waitForEnter();
      return;
    }

    const columnInput = input("Enter starting column (default: 1): ") || "1";
    const column = parseInt(columnInput);
    if (isNaN(column) || column < 1) {
      console.log("❌ Invalid column number!");
      this.waitForEnter();
      return;
    }

    console.log("");
    console.log("🎨 Font options:");
    console.log("  1. Arial (default)");
    console.log("  2. Times");
    console.log("  3. Courier");
    const fontChoice = input("Choose font (1-3): ") || "1";

    let font = "Arial";
    switch (fontChoice) {
      case "2":
        font = "Times";
        break;
      case "3":
        font = "Courier";
        break;
    }

    const sizeInput = input("Enter font size (default: 12): ") || "12";
    const size = parseInt(sizeInput);

    console.log("");
    console.log("⏳ Adding text...");
    console.log("");

    // Add the text and show flyweight creation in real-time
    this.editor.addText(text, row, column, font, size);

    console.log("");
    console.log(`✅ Added "${text}" at position (${row}, ${column})`);
    console.log(`   Font: ${font}, Size: ${size}px`);

    this.waitForEnter();
  }

  /**
   * View document content
   */
  private viewDocument(): void {
    console.clear();
    console.log("📄 Document Content");
    console.log("-".repeat(30));

    if (this.editor.getCharacterCount() === 0) {
      console.log("📭 Document is empty. Add some text first!");
    } else {
      this.editor.showDocument();

      console.log("\n📝 Text representation:");
      console.log("-".repeat(30));
      console.log(this.editor.getText());
    }

    this.waitForEnter();
  }

  /**
   * Show memory statistics
   */
  private showStatistics(): void {
    console.clear();
    console.log("📊 Memory Statistics & Flyweight Efficiency");
    console.log("-".repeat(45));

    if (this.editor.getCharacterCount() === 0) {
      console.log("📭 No characters in document yet!");
    } else {
      this.editor.showStats();

      // Additional insights
      const totalChars = this.editor.getCharacterCount();
      const flyweights = CharacterFactory.getCreatedCount();
      const reuseFactor = totalChars / flyweights;

      console.log("\n💡 Flyweight Insights:");
      console.log(
        `   • Average reuse per flyweight: ${reuseFactor.toFixed(1)}x`
      );
      console.log(
        `   • Memory efficiency: ${(
          (1 - flyweights / totalChars) *
          100
        ).toFixed(1)}%`
      );

      if (reuseFactor > 2) {
        console.log("   🎉 Great! High flyweight reuse detected!");
      } else {
        console.log(
          "   💭 Try adding repeated characters to see more benefits"
        );
      }
    }

    this.waitForEnter();
  }

  /**
   * Show flyweight details
   */
  private showFlyweightDetails(): void {
    console.clear();
    console.log("🎭 Flyweight Objects Created");
    console.log("-".repeat(35));

    if (CharacterFactory.getCreatedCount() === 0) {
      console.log("🔍 No flyweights created yet!");
      console.log("    Add some text to see flyweight objects.");
    } else {
      this.editor.showFlyweights();

      console.log("\n📋 Pattern Explanation:");
      console.log("   • Each unique char+font+size combination = 1 flyweight");
      console.log("   • Same combinations reuse existing flyweights");
      console.log("   • Position data is stored separately in each Character");
    }

    this.waitForEnter();
  }

  /**
   * Clear document
   */
  private clearDocument(): void {
    console.clear();
    console.log("🗑️  Clear Document");
    console.log("-".repeat(20));

    const confirm = input(
      "Are you sure? This will clear all text (y/N): "
    ).toLowerCase();

    if (confirm === "y" || confirm === "yes") {
      this.editor.clear();
      CharacterFactory.clearAll();
      console.log("✅ Document cleared successfully!");
    } else {
      console.log("❌ Clear operation cancelled.");
    }

    this.waitForEnter();
  }

  /**
   * Run automatic demonstration
   */
  private runAutoDemo(): void {
    console.clear();
    console.log("🚀 Automatic Flyweight Demo");
    console.log("-".repeat(30));
    console.log("");

    // Clear everything first
    this.editor.clear();
    CharacterFactory.clearAll();

    console.log('Step 1: Adding "Hello World"...');
    this.editor.addText("Hello", 1, 1, "Arial", 12);
    this.editor.addText("World", 2, 1, "Arial", 12);
    this.pause(1000);

    console.log("\nStep 2: Adding repeated characters...");
    this.editor.addText("aaa", 3, 1, "Arial", 12);
    this.editor.addText("bbb", 4, 1, "Arial", 12);
    this.pause(1000);

    console.log("\nStep 3: Adding different font...");
    this.editor.addText("Hello", 5, 1, "Times", 14);
    this.pause(1000);

    console.log("\nStep 4: Adding more repeated text...");
    this.editor.addText("aaabbb", 6, 1, "Arial", 12);
    this.pause(1000);

    console.log("\n🎯 Demo Complete! Here are the results:\n");
    this.editor.showStats();

    console.log("\n💡 Notice how:");
    console.log("   • Repeated characters reuse existing flyweights");
    console.log("   • Different fonts create new flyweights");
    console.log("   • Memory usage is optimized automatically");

    this.waitForEnter();
  }

  /**
   * Show help and pattern explanation
   */
  private showHelp(): void {
    console.clear();
    console.log("❓ Help & Flyweight Pattern Explanation");
    console.log("=".repeat(45));
    console.log("");
    console.log("🎯 What is Flyweight Pattern?");
    console.log("   The Flyweight pattern saves memory by sharing common");
    console.log("   data among multiple objects instead of storing it");
    console.log("   separately in each object.");
    console.log("");
    console.log("📝 Text Editor Example:");
    console.log("   • SHARED (Flyweight): Character + Font + Size");
    console.log("   • UNIQUE (Context): Position (row, column)");
    console.log("");
    console.log("💾 Memory Benefits:");
    console.log("   • Without Flyweight: 1000 chars = 1000 objects");
    console.log("   • With Flyweight: 1000 chars = ~50 flyweights");
    console.log("   •                              + 1000 contexts");
    console.log("   • Result: Massive memory savings!");
    console.log("");
    console.log("🎮 How to Use This Demo:");
    console.log("   1. Add different text with various fonts");
    console.log("   2. Add repeated characters (a, b, c)");
    console.log("   3. Check statistics to see flyweight reuse");
    console.log("   4. Notice how memory is optimized automatically");
    console.log("");
    console.log("💡 Try This:");
    console.log('   • Add "aaaa" then "aaaa" again');
    console.log('   • See how the same "a" flyweight is reused!');
    console.log("");

    this.waitForEnter();
  }

  /**
   * Wait for user to press Enter
   */
  private waitForEnter(): void {
    console.log("");
    input("Press Enter to continue...");
  }

  /**
   * Pause execution for given milliseconds
   */
  private pause(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
      // Busy wait
    }
  }

  /**
   * Process user menu choice
   */
  private processChoice(choice: string): void {
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
        this.showFlyweightDetails();
        break;
      case "5":
        this.clearDocument();
        break;
      case "6":
        this.runAutoDemo();
        break;
      case "7":
        this.showHelp();
        break;
      case "0":
        this.running = false;
        console.clear();
        console.log("👋 Thanks for exploring the Flyweight Pattern!");
        console.log(
          "   Remember: Share common data, store unique data separately!"
        );
        break;
      default:
        console.log("❌ Invalid option. Please choose 0-7.");
        this.waitForEnter();
    }
  }

  /**
   * Start the interactive demo
   */
  start(): void {
    console.log("🎭 Welcome to Interactive Flyweight Pattern Demo!");
    console.log("   Loading...\n");

    this.pause(1500);

    while (this.running) {
      this.showMenu();
      const choice = input("Enter your choice (0-7): ");
      this.processChoice(choice);
    }
  }
}

/**
 * Start the interactive demonstration
 */
function main(): void {
  const demo = new InteractiveDemo();
  demo.start();
}

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n\n👋 Goodbye! Thanks for learning about Flyweight Pattern!");
  process.exit(0);
});

// Execute interactive demo
main();
