import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "../instruction";

/**
 * LD A, (C)
 * [0xFF00 + Cレジスタに設定された値]が指すメモリ上の番地に設定されている値(1バイト)を
 * Aレジスタに代入する命令
 */
export class LdAC implements Instruction {
  public static readonly CYCLE = 8;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public clone() {
    return new LdAC(this._operation);
  }

  public fetch() {
    // do nothing
  }

  public exec() {
    this._operation.assignA(this._operation.readUint8(LdAC._LOAD_OFFSET + this._operation.getC()));
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LdAC.CYCLE;
  }
}
