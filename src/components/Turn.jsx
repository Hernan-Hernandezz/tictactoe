import {Square} from "./Square";
import {TURN} from "../constants";
export const Turn = ({turn}) => (
  <section className="turn">
    <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
    <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
  </section>
);
