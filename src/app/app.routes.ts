import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { BoardComponent } from './components/board/board.component';

export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    // { path: 'builder', component: BuilderComponent }, - TODO: allow for building custom boards
    // { path: 'editor', component: EditorComponent }, - TODO: allow for possible editing of pre-generated board
    { path: 'board', component: BoardComponent },
    { path: '', redirectTo: '/menu', pathMatch: 'full' },
    { path: '**', redirectTo: '/menu', pathMatch: 'full' },
];
