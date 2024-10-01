import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{
  model: any = {};
  gameService = inject(GameService);
  
  constructor(public router: Router) {       
  }

  ngOnInit(): void {    
  }

  start(){
      this.gameService.game.player1 = this.model.player1;
      this.gameService.game.player2 = this.model.player2;

      this.gameService.getMoves()
      .subscribe({
        next: response =>{ 
          this.gameService.moves = response;
          this.gameService.startGame();
          this.router.navigate(['/round']); 
        },
        error: error => console.error(error),
        complete: () =>{          
        } 
      })
  }

  gameHistory(){
    this.router.navigate(['/history']); 
  }
}
