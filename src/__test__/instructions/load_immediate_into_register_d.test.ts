import { CpuAccessor } from "vm/cpu_accessor";
import { LoadImmediateIntoRegisterC } from "vm/instructions/load_immediate_into_register_c";
import { LoadImmediateIntoRegisterD } from "vm/instructions/load_immediate_into_register_d";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LD D, n test", () => {
  let buffer: ArrayBuffer;
  let register: RegisterSet;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);

    register = new RegisterSet();
    register.PC = 0;
  });

  test("exec", () => {
    const view = new DataView(buffer);
    view.setUint8(0, 0xAB);

    // レジスタにテスト用の初期値を設定
    register.AF = 0x1122;
    register.BC = 0x3344;
    register.DE = 0x5566;
    register.HL = 0x7788;
    register.SP = 0x99AA;
    const prevRegister = register.clone();

    const ld = new LoadImmediateIntoRegisterD(new CpuAccessor(register, new Memory(new Uint8Array(buffer))));
    const cycle = ld.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(8);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // 指定のレジスタの値が変わっていることの確認
    expect(register.DE).toBe(0xAB66);
    expect(register.D).toBe(0xAB);
    expect(register.E).toBe(0x66);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 2);
  });
});