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
*   **Game Board:** A visually clear grid with distinct lines and intersections.
*   **Stones:** Circular black and white stones with subtle depth.
*   **Controls:**
    *   **"New Game" Button:** To restart the game.
    *   **Theme Toggle:** Switch between 🌙 Dark and ☀️ Light modes.
    *   **Status Display:** Shows game state and turns.
*   **Visual Style:** Modern aesthetics with CSS variables for theming, responsive design, and smooth transitions.

### Computer AI
*   Heuristic scoring function to evaluate offensive and defensive moves, identifying patterns like open-threes and fours.

## Features & Improvements

1.  **Theme Support:** Implemented Dark and Light modes using CSS variables and `localStorage` for persistence.
2.  **Grid System:** Board rendered with intersecting lines using CSS gradients.
3.  **Heuristic AI:** Intelligent move selection based on pattern recognition.
4.  **Responsive UI:** Centered layout that works across different screen sizes.

