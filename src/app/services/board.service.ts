import { Injectable } from '@angular/core';
import { GameContext } from '../models/game-context.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor() { }

  generate(gameContext: GameContext, holes: number, walls: number): void {
    // TODO: Add logic - generate dots, walls, holes, etc.
  }
}
