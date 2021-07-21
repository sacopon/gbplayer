import { Instruction } from "./instruction";

export class NOP implements Instruction {
  public static readonly CYCLE = 4;

  constructor() {}
  public exec() { return NOP.CYCLE; }
}
