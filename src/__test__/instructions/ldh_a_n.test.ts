import { CpuOperation } from "vm/cpu_operation";
import { LdhAN } from "vm/instructions/ldh_a_n";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LDH A, (n) test", () => {
  let register: RegisterSet;

  beforeEach(() => {
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

    // 読み出す予定の値を設定
    const buffer = new ArrayBuffer(0xFFFF);
    const view = new DataView(buffer);
    view.setUint8(0, 0x01);           // 読み出し元に 0xFF00 + 1 の番地を指定
    view.setUint8(0xFF00 + 1, 0xAB);  // 読み出される値を「0xAB」に設定
    const memory = new Memory(new Uint8Array(buffer));

    const instruction = new LdhAN(new CpuOperation(register, memory));
    const cycle = instruction.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(12);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.F).toBe(prevRegister.F);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.SP).toBe(prevRegister.SP);
    // A レジスタの内容が変わっていることの確認
    expect(register.A).toBe(0xAB);
    expect(register.AF).toBe(0xAB22);
    // プログラムカウンタが進んでいることの確認(オペコード1バイト + 即値1バイト)
    expect(register.PC).toBe(prevRegister.PC + 2);
  });
});
