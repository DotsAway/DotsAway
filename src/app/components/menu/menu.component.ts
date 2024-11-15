import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private formBuilder: FormBuilder
  ) {
    this.menuForm = this.formBuilder.group({
      width: ['', Validators.required],
      height: ['', Validators.required],
      lines: ['', Validators.required]
    });
  }

  goToSeed(seed: string | null): void {
    this.router.navigate(['/board', { seed }]);
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      // TODO: Generate seed, and go to board - start game
    }
    this.menuForm.reset();
  }
}
