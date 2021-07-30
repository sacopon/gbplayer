import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * Aレジスタに格納されている値をHLレジスタが指すメモリ上の番地に代入する命令
 */
export class LddRegisterIntoAddress implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.writeUint8(this._operation.getHL(), this._operation.getA());
    this._operation.decrementHL();
    this._operation.addProgramCounter(OPECODE_BYTE);

    return LddRegisterIntoAddress.CYCLE;
  }
}
