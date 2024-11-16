import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameContext } from '../../models/game-context.model';
import { SeedService } from '../../services/seed.service';
import { Cell } from '../../models/cell.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dotsaway-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  protected gameContext: GameContext | null = null;
  protected grid: Cell[][] = [];
  protected gridTemplateColumns: string = '';

  constructor(
    private route: ActivatedRoute,
    private seedService: SeedService,
  ) { }

  ngOnInit() {
    const seed = this.route.snapshot.paramMap.get('seed');
    this.gameContext = this.seedService.parse(seed ?? '');

    if (this.gameContext) {
      this.gridTemplateColumns = `repeat(${this.gameContext.width}, 1fr)`;
    }
  }

  onCellClick(cell: Cell): void {
    console.log(cell.index);
  }
}
