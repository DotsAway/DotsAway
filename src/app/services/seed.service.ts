import { Injectable } from '@angular/core';
import { GameContext } from '../models/game-context.model';

@Injectable({
  providedIn: 'root'
})
export class SeedService {
  constructor() { }

  generate(gameContext: GameContext): string {
    const jsonString = JSON.stringify(gameContext);
    const base64String = btoa(jsonString);
    return base64String;
  }

  parse(seed: string): GameContext {
    const jsonString = atob(seed);
    const gameContext: GameContext = JSON.parse(jsonString);
    return gameContext;
  }
}
