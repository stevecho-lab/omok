# Gomoku Game Blueprint

## Overview

This document outlines the plan for creating a 17x17 Gomoku (Omok) game where a user can play against a computer AI. The application will be built using modern HTML, CSS, and JavaScript, following the principles of clean, modular, and maintainable code.

## Features & Design

### Core Gameplay
*   **Board:** A 17x17 grid.
*   **Players:** User (Black) vs. Computer (White).
*   **Turns:** The user starts first. Players alternate turns.
*   **Objective:** Be the first to get five stones in a row (horizontally, vertically, or diagonally).
*   **Interaction:** The user clicks on an intersection to place a stone.

### User Interface
*   **Layout:** A clean, centered layout with the game board as the main focus.
*   **Game Board:** A visually clear grid with distinct lines and intersections. Stones are placed on the intersections of the lines, not within the cells.
*   **Stones:** Circular black and white stones. When a stone is placed, it should appear with a smooth animation.
*   **Controls:**
    *   **"New Game" Button:** To restart the game at any point.
    *   **Status Display:** A message area to show whose turn it is, if a player wins, or if the game is a draw.
*   **Visual Style:** Modern aesthetics with a balanced color palette, good spacing, and subtle drop shadows on UI elements to create depth.

### Computer AI
*   An improved AI that uses a heuristic scoring function to find the best move. The AI evaluates potential moves for both offensive (creating its own lines) and defensive (blocking the player) value.

## Current Plan

This section outlines the plan to improve the AI and the visual representation of the game board.

1.  **GUI Update (`style.css`):**
    *   Modify the CSS to render the board as a set of intersecting lines rather than a grid of cells.
    *   Use CSS background properties to draw the grid on the main board container.
    *   Ensure that when a user clicks, the stone is visually placed on the intersection of the grid lines.
    *   The clickable areas will be transparent elements representing the intersections.

2.  **AI Improvement (`main.js`):**
    *   Replace the simple AI logic with a more advanced heuristic-based algorithm.
    *   The new `findBestMove` function will iterate through all empty cells on the board.
    *   For each potential move, it will calculate a score based on both its offensive and defensive potential.
    *   **Offensive Score:** How good the move is for the computer (e.g., creates a line of 3 or 4).
    *   **Defensive Score:** How good the move is for blocking the player's potential wins.
    *   The AI will choose the move with the highest combined score.
    *   The scoring will be determined by evaluating patterns (like open-ended threes, fours, etc.) for each possible move.

3.  **HTML (`index.html`):**
    *   No changes are required for the HTML structure.
