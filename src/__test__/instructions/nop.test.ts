import { CpuOperation } from "vm/cpu_operation";
import { Nop } from "vm/instructions/nop";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("nop test", () => {
  let memory: Memory;
  let register: RegisterSet;

  beforeEach(() => {
    memory = new Memory(new Uint8Array(new ArrayBuffer(10)));
    register = new RegisterSet();
  });

  test("exec", () => {
    // レジスタにテスト用の初期値を設定
    register.AF = 0x1122;
    register.BC = 0x3344;
    register.DE = 0x5566;
    register.HL = 0x7788;
    register.SP = 0x99AA;
    const prevRegister = register.clone();

    const nop = new Nop(new CpuOperation(register, memory));
    const cycle = nop.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(4);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 1);
  });
});
