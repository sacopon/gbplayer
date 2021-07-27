import { CpuAccessor } from "vm/cpu_accessor";
import { Instruction, OPECODE_BYTE } from "./instruction";

/**
 * AレジスタにAレジスタの内容を代入する命令
 */
export class LoadRegisterBIntoRegisterA implements Instruction {
  public static readonly CYCLE = 4;

  private readonly _accessor: CpuAccessor;

  constructor(accessor: CpuAccessor) {
    this._accessor = accessor;
  }

  public exec() {
    this._accessor.assignA(this._accessor.getB());
    this._accessor.addProgramCounter(OPECODE_BYTE);

    return LoadRegisterBIntoRegisterA.CYCLE;
  }
}
