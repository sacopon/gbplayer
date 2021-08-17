import { CpuOperation } from "vm/cpu_operation";
import { LdDD } from "vm/instructions/ld_r1_r2/ld_d_d";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LD D, D test", () => {
  let buffer: ArrayBuffer;
  let register: RegisterSet;
  let memory: Memory;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);
    memory = new Memory(new Uint8Array(buffer));

    register = new RegisterSet();
    register.PC = 0;
  });

  test("clone", () => {
    const instruction = new LdDD(new CpuOperation(register, new Memory(new Uint8Array(buffer))));
    const cloned = instruction.clone();

    expect(cloned).toBeInstanceOf(LdDD);
  });
  test("exec", () => {
    // レジスタにテスト用の初期値を設定
    register.AF = 0x1122;
    register.BC = 0x3344;
    register.DE = 0x5566;
    register.HL = 0x7788;
    register.SP = 0x99AA;
    const prevRegister = register.clone();

    const instruction = new LdDD(new CpuOperation(register, memory));
    instruction.fetch();
    const cycle = instruction.exec();

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
