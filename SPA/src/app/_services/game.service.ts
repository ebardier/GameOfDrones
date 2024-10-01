import { inject, Injectable } from '@angular/core';
import { Game } from '../_models/game';
import { Move } from '../_models/move';
import { Round } from '../_models/round';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GameHistory } from '../_models/history';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;  
  
  inProgress: boolean = false;
  round = 0;
  currentPlayer = 0;
  currentRound:Round=new Round();

  moves: Array<Move> = new Array<Move>();
  rounds: Array<Round> = new Array<Round>();
  game: Game = {
    player1:"",
    player2:"",
    winner:""
  };

  constructor(public router: Router) {       
  }

  startGame()
  {
    this.inProgress=true;
    this.round=1;
    this.currentPlayer=1;
    this.currentRound=new Round();
    this.game.winner ='';
  }

  saveMove(move:String){
    let moveObject = this.moves.find(i => i.move == move);
    if(moveObject!=null){
      if(this.currentPlayer == 1){
        this.currentRound = new Round();
        this.currentRound.Player1 = moveObject;
        this.currentRound.Number = this.round;
        this.currentPlayer = 2;
      }else{
        this.currentPlayer = 1;
        this.currentRound.Player2 = moveObject;
        
        // Check Round Winner
        if(this.currentRound.Player1.kill == this.currentRound.Player2.move)
          this.currentRound.Winner = this.game.player1;
        else if (this.currentRound.Player2.kill == this.currentRound.Player1.move)
          this.currentRound.Winner = this.game.player2;
        else return;

        this.rounds.push(this.currentRound);

        if(this.round<3){
          this.round++;          
        }else{
          let count1 = this.rounds.filter(x => x.Winner==this.game.player1).length
          let count2 = this.rounds.filter(x => x.Winner==this.game.player2).length

          if(count1>count2)
            this.game.winner = this.game.player1;
          else if(count2>count1)
            this.game.winner = this.game.player2;
          else 
            this.game.winner = 'unknown';

          this.inProgress=false;

          this.postGame(this.game).subscribe({
              next: data => {                
              },
              error: error => {
                  console.error('Error!', error);
              }
          })          
        }
      }    
    }    
  }

  getMoves() {
    return this.http.get<Move[]>(this.baseUrl + 'moves');    
  }

  postGame(game: Game) {
    return this.http.post<Game>(this.baseUrl + 'matches', game);
  }

  getHistory() {
    return this.http.get<GameHistory[]>(this.baseUrl + 'matches/history');    
  }
}
