import { Move } from "./move";

export class Round {
    Number: number = 0;
    Player1: Move = new Move();
    Player2: Move = new Move();
    Winner: String = '';
}