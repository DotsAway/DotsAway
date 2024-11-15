import { Injectable } from '@angular/core';
import { GameContext } from '../models/game-context.model';
import { Position } from '../models/position.model';
import { Dot } from '../models/dot.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor() { }

  generate(gameContext: GameContext, holes: number, walls: number): void {
    // TODO: Add logic - generate dots, walls, holes, etc.

    gameContext.dots = this.generateBoard(gameContext.width, gameContext.height, gameContext.lines);
  }

  generateBoard(width: number, height: number, lines: number): Dot[] {
    function getRandomColor(): string {
      const letters = '0123456789ABCDEF';

      let color = '#';

      for (let i = 0; i < 6; ++i) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    }

    function indexToPosition(index: number, width: number): Position {
      return {
        x: index % width,
        y: Math.floor(index / width)
      };
    }

    function positionToIndex(pos: Position, width: number): number {
      return pos.y * width + pos.x;
    }

    function getShuffledNeighbors(pos: Position, width: number, height: number): Position[] {
      const directions = [
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 }
      ];

      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [directions[i], directions[j]] = [directions[j], directions[i]];
      }

      return directions
        .map(dir => ({ x: pos.x + dir.x, y: pos.y + dir.y }))
        .filter(n => n.x >= 0 && n.x < width && n.y >= 0 && n.y < height);
    }

    function getRandomFreeIndex(board: Dot[]): number {
      const freeIndices = board.filter(cell => cell.color === null).map(cell => cell.index);

      return freeIndices[Math.floor(Math.random() * freeIndices.length)];
    }

    const boardSize = width * height;

    const board: Dot[] = Array.from({ length: boardSize }, (_, index) => ({
      color: '#000000',
      index: index,
    }));

    const points: { start: number; end: number; color: string }[] = [];

    for (let i = 0; i < lines; i++) {
      let color = getRandomColor();
      let startIdx = getRandomFreeIndex(board);

      board[startIdx].color = color;

      let endIdx;

      do {
        endIdx = getRandomFreeIndex(board);
      } while (endIdx === startIdx);

      board[endIdx].color = color;

      points.push({ start: startIdx, end: endIdx, color });
    }

    function fillPath(start: Position, end: Position, color: string): boolean {
      const stack: Position[] = [start];
      const visited: Set<number> = new Set();

      while (stack.length > 0) {
        const current = stack.pop()!;
        const currentIndex = positionToIndex(current, width);

        if (currentIndex === positionToIndex(end, width)) {
          return true;
        }

        visited.add(currentIndex);

        board[currentIndex].color = color;

        const neighbors = getShuffledNeighbors(current, width, height);
        let pathFound = false;

        for (const neighbor of neighbors) {
          const neighborIndex = positionToIndex(neighbor, width);

          if (!visited.has(neighborIndex) && board[neighborIndex].color === null) {
            stack.push(neighbor);
            pathFound = true;
            break;
          }
        }

        if (!pathFound) {
          visited.delete(currentIndex);

          board[currentIndex].color = '#000000';
        }
      }

      return false;
    }

    for (const { start, end, color } of points) {
      const startPos = indexToPosition(start, width);
      const endPos = indexToPosition(end, width);

      if (!fillPath(startPos, endPos, color)) {
        return this.generateBoard(width, height, lines);
      }
    }

    return board;
  }
}
