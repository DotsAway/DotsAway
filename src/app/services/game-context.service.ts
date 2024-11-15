import { Injectable } from '@angular/core';
import { GameContext } from '../models/game-context.model';
import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class GameContextService {
  constructor(
    private boardService: BoardService
  ) { }

  createContext(width: string | null, height: string| null, lines: string | null): GameContext {
    const gameContext: GameContext = {
      width: Number(width),
      height: Number(height),
      lines: Number(lines),
      dots: []
    };

    this.boardService.generate(gameContext);

    return gameContext;
  }
}
