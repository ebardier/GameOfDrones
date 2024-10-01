import { Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { RoundComponent } from './round/round.component';
import { HistoryComponent } from './history/history.component';

//export const routes: Routes = [];
export const routes: Routes = [
    { path: "", component: GameComponent, pathMatch: "full" },
    { path: "game", component: GameComponent, pathMatch: "full" },
    { path: "round", component: RoundComponent, pathMatch: "full" },
    { path: "history", component: HistoryComponent, pathMatch: "full" },
    { path: "**", component: GameComponent, pathMatch: "full" }
]  