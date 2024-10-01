import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { GameHistory } from '../_models/history';
import { Router } from '@angular/router';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{
  gameService = inject(GameService);
  history: GameHistory[] = [];

  constructor(public router: Router) {       
  }
  
  ngOnInit(): void {
    this.gameService.getHistory()
      .subscribe({
        next: response =>{ 
          this.history = response;
        },
        error: error => console.log(error),
        complete: () =>{          
        } 
      })
  }

  back(){
    this.router.navigate(['/game']); 
  }
}
