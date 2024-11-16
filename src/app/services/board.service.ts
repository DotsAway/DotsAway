import { Injectable } from '@angular/core';
import { GameContext } from '../models/game-context.model';
import { Position } from '../models/position.model';
import { Cell } from '../models/cell.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor() { }

  generate(gameContext: GameContext, holes: number, walls: number): void {
    // TODO: Add logic - generate dots, walls, holes, etc.

    // gameContext.dots = this.generateBoard(gameContext.width, gameContext.height, gameContext.lines);
    gameContext.cells = Array.from({ length: gameContext.width * gameContext.height }, (_, index) => ({
      color: null,
      index: index
    }));

    console.log(gameContext);
  }

  // generateBoard(width: number, height: number, lines: number): Dot[] {
  //   function getRandomColor(): string {
  //     const letters = '0123456789ABCDEF';

  //     let color = '#';

  //     for (let i = 0; i < 6; i++) {
  //       color += letters[Math.floor(Math.random() * 16)];
  //     }

  //     return color;
  //   }

  //   function indexToPosition(index: number, width: number): Position {
  //     return {
  //       x: index % width,
  //       y: Math.floor(index / width)
  //     };
  //   }

  //   function positionToIndex(pos: Position, width: number): number {
  //     return pos.y * width + pos.x;
  //   }

  //   function getNeighbors(pos: Position, width: number, height: number): Position[] {
  //     const directions = [
  //       { x: 0, y: 1 },
  //       { x: 1, y: 0 },
  //       { x: 0, y: -1 },
  //       { x: -1, y: 0 }
  //     ];

  //     return directions
  //       .map(dir => ({
  //         x: pos.x + dir.x,
  //         y: pos.y + dir.y
  //       }))
  //       .filter(n => n.x >= 0 && n.x < width && n.y >= 0 && n.y < height); // Filtrujemy tylko te, które mieszczą się w zakresie planszy
  //   }

  //   function getShuffledNeighbors(pos: Position, width: number, height: number): Position[] {
  //     const directions = [
  //       { x: 0, y: 1 },
  //       { x: 1, y: 0 },
  //       { x: 0, y: -1 },
  //       { x: -1, y: 0 }
  //     ];

  //     for (let i = directions.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));

  //       [directions[i], directions[j]] = [directions[j], directions[i]];
  //     }

  //     return directions
  //       .map(dir => ({ x: pos.x + dir.x, y: pos.y + dir.y }))
  //       .filter(n => n.x >= 0 && n.x < width && n.y >= 0 && n.y < height);
  //   }

  //   function getRandomFreeIndex(board: Dot[]): number {
  //     const freeIndices = board.filter(dot => dot.color === null).map(dot => dot.index);

  //     if (freeIndices.length === 0) {
  //       return -1; // Zwrócenie wartości, która jest nieprawidłowa, żeby wskazać na błąd
  //     }

  //     return freeIndices[Math.floor(Math.random() * freeIndices.length)];
  //   }

  //   // Funkcja BFS do wypełniania ścieżki
  //   function fillPath(start: Position, end: Position, color: string, board: Dot[], width: number, height: number): boolean {
  //     const queue: Position[] = [start];
  //     const visited: Set<number> = new Set();
  //     visited.add(positionToIndex(start, width));

  //     // Iteracyjne BFS
  //     while (queue.length > 0) {
  //       const current = queue.shift()!;
  //       const currentIndex = positionToIndex(current, width);

  //       if (currentIndex === positionToIndex(end, width)) {
  //         return true; // Dotarliśmy do punktu końcowego
  //       }

  //       board[currentIndex].color = color; // Kolorujemy odwiedzoną komórkę

  //       // Sprawdzamy sąsiadów komórki
  //       const neighbors = getNeighbors(current, width, height);
  //       for (const neighbor of neighbors) {
  //         const neighborIndex = positionToIndex(neighbor, width);
  //         if (!visited.has(neighborIndex) && board[neighborIndex].color === null) {
  //           visited.add(neighborIndex);
  //           queue.push(neighbor);
  //         }
  //       }
  //     }

  //     return false; // Jeżeli nie udało się znaleźć ścieżki
  //   }

  //   const boardSize = width * height;
  //   const board: Dot[] = Array.from({ length: boardSize }, (_, index) => ({
  //     color: null,
  //     index: index,
  //   }));

  //   const points: { start: number; end: number; color: string }[] = [];

  //   for (let i = 0; i < lines; i++) {
  //     let color = getRandomColor();
  //     let startIdx = getRandomFreeIndex(board);
  //     board[startIdx].color = color;

  //     let endIdx;
  //     do {
  //       endIdx = getRandomFreeIndex(board);
  //     } while (endIdx === startIdx); // Unikamy, aby koniec był w tym samym miejscu co początek

  //     board[endIdx].color = color;
  //     points.push({ start: startIdx, end: endIdx, color });
  //   }

  //   // Wypełnianie planszy dla każdego punktu początek-koniec
  //   for (const { start, end, color } of points) {
  //     const startPos = indexToPosition(start, width);
  //     const endPos = indexToPosition(end, width);

  //     if (!fillPath(startPos, endPos, color, board, width, height)) {
  //       return this.generateBoard(width, height, lines); // Ponowne generowanie
  //     }
  //   }

  //   return board;
  // }

  generateBoard(width: number, height: number, lines: number): Cell[] {
    // Funkcja do konwersji pozycji (x, y) na indeks
    function positionToIndex(x: number, y: number, width: number): number {
      return y * width + x;
    }

    // Funkcja do konwersji indeksu na pozycję (x, y)
    function indexToPosition(index: number, width: number): Position {
      return { x: index % width, y: Math.floor(index / width) };
    }

    // Ustalamy minimalne wymiary planszy
  if (width < 2 || height < 2) {
    width = 2;
    height = 2;
  }

  if (lines < 1) lines = 1;

  const board: Cell[] = Array.from({ length: width * height }, (_, index) => ({
    color: null,
    index: index,
  }));

  const points: { start: number; end: number; color: string }[] = [];
  const usedColors: string[] = [];

  function getRandomColor(usedColors: string[]): string {
    const availableColors = ['red', 'green', 'blue', 'yellow', 'purple'];
    const color = availableColors.find(c => !usedColors.includes(c));
    if (!color) throw new Error("Brak dostępnych kolorów");
    return color;
  }

  function getRandomFreeIndex(): number {
    const freeIndices = board.filter(dot => dot.color === null).map(dot => dot.index);
    return freeIndices[Math.floor(Math.random() * freeIndices.length)];
  }

  function bfs(start: number, end: number, color: string): number[] {
    const queue: number[] = [start];
    const cameFrom: number[] = Array(board.length).fill(-1);
    const visited: boolean[] = Array(board.length).fill(false);
    visited[start] = true;

    const directions = [
      { x: 0, y: -1 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
    ];

    while (queue.length > 0) {
      const current = queue.shift()!;
      const currentPos = indexToPosition(current, width);

      if (current === end) {
        const path: number[] = [];
        let currentNode = end;
        while (currentNode !== start) {
          path.push(currentNode);
          currentNode = cameFrom[currentNode];
        }
        path.push(start);
        return path.reverse();
      }

      for (const dir of directions) {
        const nextPos = { x: currentPos.x + dir.x, y: currentPos.y + dir.y };
        if (
          nextPos.x >= 0 &&
          nextPos.y >= 0 &&
          nextPos.x < width &&
          nextPos.y < height
        ) {
          const nextIndex = positionToIndex(nextPos.x, nextPos.y, width);
          if (!visited[nextIndex] && board[nextIndex].color === null) {
            visited[nextIndex] = true;
            cameFrom[nextIndex] = current;
            queue.push(nextIndex);
          }
        }
      }
    }
    return [];
  }

  // Generowanie punktów startowych i końcowych
  let attempts = 0;
  while (points.length < lines && attempts < 1000) {
    const color = getRandomColor(usedColors);
    usedColors.push(color);

    const startIdx = getRandomFreeIndex();
    board[startIdx].color = color;

    let endIdx = getRandomFreeIndex();
    while (endIdx === startIdx) {
      endIdx = getRandomFreeIndex();
    }
    board[endIdx].color = color;

    points.push({ start: startIdx, end: endIdx, color });

    const path = bfs(startIdx, endIdx, color);
    if (path.length === 0) {
      // Jeśli nie udało się znaleźć ścieżki, spróbuj ponownie
      attempts++;
      points.length = 0;
      usedColors.length = 0;
      for (const dot of board) {
        dot.color = null;
      }
      continue;
    }

    for (const idx of path) {
      board[idx].color = color;
    }
  }

  if (attempts >= 1000) {
    throw new Error("Nie udało się wygenerować planszy po 1000 próbach.");
  }

  // Funkcja do wypełniania pustych pól
  function fillRemainingCells(): void {
    for (let i = 0; i < board.length; i++) {
      if (board[i].color === null) {
        board[i].color = 'black'; // Wypełniamy czarnym
      }
    }
  }

  fillRemainingCells();

  return board;
  }
}
