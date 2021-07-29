import { CpuAccessor } from "vm/cpu_accessor";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * HLレジスタが指すメモリ上の番地に設定されている値(1バイト)を
 * Aレジスタに代入する命令
 */
export class LddAddressIntoRegister implements Instruction {
  public static readonly CYCLE = 8;

  private readonly _accessor: CpuAccessor;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;
  }

  public exec() {
    this._accessor.assignA(this._accessor.readUint8(this._accessor.getHL()));
    this._accessor.decrementHL();
    this._accessor.addProgramCounter(OPECODE_BYTE);

    return LddAddressIntoRegister.CYCLE;
  }
}
