import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameContext } from '../../models/game-context.model';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'dotsaway-editor',
  standalone: true,
  imports: [],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent {
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
