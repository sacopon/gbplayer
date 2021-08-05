import { CpuOperation } from "vm/cpu_operation";
import { Instruction } from "../instruction";

class Operands {
  public readonly jumpPos: number;

  public constructor(jumpPos: number = 0) {
    this.jumpPos = jumpPos;
  }
}

/**
 * JP nn
 * nn 番地にジャンプ(プログラムカウンターを設定)する命令
 */
export class JpNn implements Instruction {
  public static readonly CYCLE = 16;  // TODO: 12? 要調査

  private readonly _operation: CpuOperation;
  private _operand: Operands;

  constructor(operation: CpuOperation) {
    this._operation = operation;
    this._operand = new Operands();
  }

  public clone() {
    const result = new JpNn(this._operation);
    result._operand = new Operands(this._operand.jumpPos);

    return result;
  }

  public fetch() {
    this._operand = new Operands(this._operation.readOperandUint16());
  }

  public exec() {
    this._operation.assignProgramCounter(this._operand.jumpPos);
    return JpNn.CYCLE;
  }
}
