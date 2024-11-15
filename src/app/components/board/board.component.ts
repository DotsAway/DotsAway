import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameContext } from '../../models/game-context.model';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'dotsaway-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected gameContext: GameContext | null = null;

  constructor(
    private route: ActivatedRoute,
    private seedService: SeedService
  ) {}

  ngOnInit() {
    const seed = this.route.snapshot.paramMap.get('seed');
    this.gameContext = this.seedService.parse(seed ?? '');
  }
}
