# Flyweight Design Pattern - Text Editor Implementation

A TypeScript implementation of the Flyweight structural design pattern using an interactive text editor example.

## Overview

The Flyweight pattern minimizes memory usage by sharing common data (intrinsic state) among multiple objects while keeping unique data (extrinsic state) separate. This implementation demonstrates the pattern through a text editor where character formatting is shared between multiple character instances.

## Problem Solved

In a text editor, storing complete formatting information for each character would be memory-intensive:

- **Without Flyweight**: 1000 characters = 1000 complete objects (~150MB)
- **With Flyweight**: 1000 characters = ~50 shared flyweights + 1000 contexts (~150KB)
- **Result**: 99.9% memory reduction

## Project Structure

```
├── CharacterType.ts      # Flyweight - stores shared character data
├── CharacterFactory.ts   # Factory - manages flyweight instances
├── Character.ts          # Context - stores position and flyweight reference
├── TextEditor.ts         # Client - manages the document
├── main.ts              # Interactive console interface
├── package.json
├── tsconfig.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- TypeScript

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/flyweight-pattern-text-editor.git
cd flyweight-pattern-text-editor

# Install dependencies
npm install

# Run the application
npm run dev
```

## Usage

The application provides an interactive console menu:

```
1. Add text to document
2. View document content
3. Show memory statistics
4. Show flyweight details
5. Clear document
6. Run auto demo
7. Help & Pattern explanation
0. Exit
```

### Example Output

```
Enter text: hello

Creating new flyweight: h-Arial-12
Creating new flyweight: e-Arial-12
Creating new flyweight: l-Arial-12
Reusing existing flyweight: l-Arial-12
Creating new flyweight: o-Arial-12

Memory Statistics:
Total characters: 5
Flyweight objects: 4
Memory efficiency: 20.0%
```

## Pattern Implementation

### CharacterType (Flyweight)

Stores intrinsic state that can be shared:

- Character symbol
- Font family
- Font size

### CharacterFactory (Factory)

Manages flyweight instances and ensures reuse:

- Creates new flyweights when needed
- Returns existing flyweights when available
- Tracks created instances

### Character (Context)

Stores extrinsic state and flyweight reference:

- Row and column position
- Reference to shared CharacterType

### TextEditor (Client)

Uses the flyweight pattern:

- Manages document characters
- Provides statistics and operations

## Key Benefits

1. **Memory Efficiency**: Significant reduction in memory usage for large documents
2. **Performance**: Faster object creation through reuse
3. **Scalability**: Handles large numbers of similar objects effectively

## When to Use

**Use the Flyweight pattern when:**

- You have large numbers of similar objects
- Memory usage is a concern
- Objects contain data that can be shared
- You can separate intrinsic from extrinsic state

**Avoid when:**

- You have few objects
- Memory is not constrained
- Objects don't share common data

## Learning Objectives

This implementation helps understand:

- Separation of intrinsic and extrinsic state
- Factory pattern for object management
- Memory optimization techniques
- Interactive demonstration of pattern benefits

## Scripts

```bash
npm run dev     # Run with ts-node
npm run build   # Compile TypeScript
npm start       # Run compiled version
npm run clean   # Remove build files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

Built by Ms Hamsini S

## References

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)
- [Flyweight Pattern - Refactoring Guru](https://refactoring.guru/design-patterns/flyweight)
