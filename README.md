# Flyweight Design Pattern

A TypeScript implementation of the Flyweight structural design pattern using a text editor example.

## Overview

The Flyweight pattern minimizes memory usage by sharing common data among multiple objects while keeping unique data separate.

## Project Structure

```
src/
├── models/
│   ├── characterType.ts    # Flyweight class
│   └── character.ts        # Context class
├── factories/
│   └── characterFactory.ts # Factory for flyweights
├── services/
│   └── textEditor.ts       # Client service
└── main.ts                 # Application entry point
```

## Installation

```bash
npm install
npm run dev
```

## Usage

Run the application and use the interactive menu to:

1. Add text to document
2. View document content
3. Show memory statistics
4. Clear document
5. Run demonstration

## Pattern Benefits

- Memory efficiency through object sharing
- Reduced object creation overhead
- Scalable for large numbers of similar objects

## Implementation

The pattern separates:

- **Intrinsic state** (shared): Character, font, size
- **Extrinsic state** (unique): Position coordinates

### Code Example

```typescript
// Creating flyweight for character 'a'
const charA1 = new Character("a", 1, 1, "Arial", 12);
const charA2 = new Character("a", 2, 5, "Arial", 12);

// Both characters share the same flyweight object
// Only position data is stored separately
```

### Key Classes

**CharacterType (Flyweight)**

```typescript
export class CharacterType {
  private character: string;
  private font: string;
  private size: number;

  display(row: number, column: number): void {
    console.log(
      `'${this.character}' at (${row},${column}) - ${this.font} ${this.size}px`
    );
  }
}
```

**Character (Context)**

```typescript
export class Character {
  private row: number;
  private column: number;
  private characterType: CharacterType;

  constructor(character: string, row: number, column: number) {
    this.row = row;
    this.column = column;
    this.characterType = CharacterFactory.getCharacterType(
      character,
      font,
      size
    );
  }
}
```

## Sample Output

```
Flyweight Pattern Demo - Text Editor
========================================
1. Add text
2. View document
3. Show statistics
4. Clear document
5. Demo
0. Exit
========================================

Running Demo
--------------------
'H' at (1,1) - Arial 12px
'e' at (1,2) - Arial 12px
'l' at (1,3) - Arial 12px
'l' at (1,4) - Arial 12px
'o' at (1,5) - Arial 12px

Memory Statistics:
----------------------------------------
Total characters: 5
Flyweight objects: 4
Memory saved: 1 objects
Efficiency: 20.0%
```

## Memory Efficiency

Without Flyweight: 1000 characters = 1000 objects  
With Flyweight: 1000 characters = ~50 flyweights + 1000 contexts  
**Result: ~95% memory reduction**

## Built By

Ms Hamsini S
