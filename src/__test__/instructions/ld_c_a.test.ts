import { CpuOperation } from "vm/cpu_operation";
import { LdCA } from "vm/instructions/ld_c_a";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LD (C), A test", () => {
  let buffer: ArrayBuffer;
  let register: RegisterSet;
  let memory: Memory;

  beforeEach(() => {
    buffer = new ArrayBuffer(0xFFFF);
    memory = new Memory(new Uint8Array(buffer));

    register = new RegisterSet();
    register.PC = 0;
  });

  test("exec", () => {
    // レジスタにテスト用の初期値を設定
    register.AF = 0x1122;
    register.BC = 0x3344;
    register.DE = 0x5566;
    register.HL = 0x7788;
    register.SP = 0x99AA;
    register.A = 0xAB;  // セットする値(0xAB)
    register.C = 0x01;  // セットするアドレス(0xFF + 1)
    const prevRegister = register.clone();

    const instruction = new LdCA(new CpuOperation(register, memory));
    const cycle = instruction.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(8);
    // レジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 1);
    // メモリに値が書き込まれていることの確認
    expect(memory.getUint8(0xFF00 + 1)).toBe(0xAB);
  });
});
