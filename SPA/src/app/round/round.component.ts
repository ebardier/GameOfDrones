import { Component, inject, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-round',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule],
  templateUrl: './round.component.html',
  styleUrl: './round.component.css'
})
export class RoundComponent implements OnInit{
  gameService = inject(GameService);
  model: any = {};

  constructor(public router: Router) {       
  }

  ngOnInit(): void {    
  }

  saveMove(){
    this.gameService.saveMove(this.model.move);
    this.model.move='';    
  }

  restart(){
    this.router.navigate(['/']);
  }
}
