import { CpuOperation } from "vm/cpu_operation";
import { Instruction } from "./instruction";

class Operands {
  public readonly jumpPos: number;

  public constructor(jumpPos: number) {
    this.jumpPos = jumpPos;
  }
}

export class JumpToAddress implements Instruction {
  public static readonly CYCLE = 16;

  private readonly _operation: CpuOperation;
  private readonly _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;

    const jumpPos = this._operation.readOperandUint16();
    this._operand = new Operands(jumpPos);
  }

  public exec() {
    this._operation.assignProgramCounter(this._operand.jumpPos);
    return JumpToAddress.CYCLE;
  }
}
