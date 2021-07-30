import { CpuOperation } from "vm/cpu_operation";
import { Instruction, OPCODE_BYTE } from "./instruction";

/**
 * メモリ上の[0xFF00 + Cレジスタに設定された値]の番地に設定されている値を
 * Aレジスタに代入する命令
 */
export class LoadAddressRegisterCIntoRegisterA implements Instruction {
  public static readonly CYCLE = 8;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _operation: CpuOperation;

  constructor(operation: CpuOperation) {
    this._operation = operation;
  }

  public exec() {
    this._operation.assignA(this._operation.readUint8(LoadAddressRegisterCIntoRegisterA._LOAD_OFFSET + this._operation.getC()));
    this._operation.addProgramCounter(OPCODE_BYTE);

    return LoadAddressRegisterCIntoRegisterA.CYCLE;
  }
}
