import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameContext } from '../../models/game-context.model';
import { GameContextService } from '../../services/game-context.service';
import { SeedService } from '../../services/seed.service';

@Component({
  selector: 'dotsaway-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  menuForm: FormGroup<{
    width: FormControl<string | null>,
    height: FormControl<string | null>,
    lines: FormControl<string | null>
  }>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private gameContextService: GameContextService,
    private seedService: SeedService
  ) {
    this.menuForm = this.formBuilder.group({
      width: ['3', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
      height: ['3', [Validators.required, Validators.min(2), Validators.pattern('^[0-9]*$')]],
      lines: ['2', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]]
    });
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }
  }

  goToSeed(seed: string | null): void {
    this.router.navigate(['/board', { seed }]);
  }

  onStart(): void {
    if (this.menuForm.valid) {
      const gameContext: GameContext = this.gameContextService.createContext(
        this.menuForm.controls.width.value, 
        this.menuForm.controls.height.value, 
        this.menuForm.controls.lines.value);
      const seed: string = this.seedService.generate(gameContext);
      this.goToSeed(seed);
    }
    this.menuForm.reset();
  }
}
