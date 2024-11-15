import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';
import { EditorComponent } from './components/editor/editor.component';

export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'board', component: BoardComponent },
    { path: 'editor', component: EditorComponent },
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: '**', redirectTo: '/menu', pathMatch: 'full' },
];
