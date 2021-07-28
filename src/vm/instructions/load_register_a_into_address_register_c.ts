import { CpuAccessor } from "vm/cpu_accessor";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * メモリ上の[0xFF00 + Cレジスタに設定された値]の番地にレジスタAの値を代入する命令
 */
export class LoadRegisterAIntoAddressRegisterC implements Instruction {
  public static readonly CYCLE = 8;
  private static readonly _LOAD_OFFSET = 0xFF00;

  private readonly _accessor: CpuAccessor;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;
  }

  public exec() {
    this._accessor.writeUint8(LoadRegisterAIntoAddressRegisterC._LOAD_OFFSET + this._accessor.getC(), this._accessor.getA());
    this._accessor.addProgramCounter(OPECODE_BYTE);

    return LoadRegisterAIntoAddressRegisterC.CYCLE;
  }
}
