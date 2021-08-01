import { CpuOperation } from "vm/cpu_operation";
import { LdhNA } from "vm/instructions/ldh_n_a";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LDH (n), A test", () => {
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
    register.A = 0xAB;  // セットする値(0xAB)
    register.PC = 0;
    const prevRegister = register.clone();

    // メモリ構築
    const buffer = new ArrayBuffer(0xFFFF);

    // 先頭に書き込み先(0xFFからのオフセット)を設定する
    const view = new DataView(buffer);
    view.setUint8(0, 1); // 設定先は 0xFF + 1

    // 書き込み内容を設定する
    register.A = prevRegister.A = 0xAB;

    const memory = new Memory(new Uint8Array(buffer));
    const instruction = new LdhNA(new CpuOperation(register, memory));
    const cycle = instruction.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(12);
    // レジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 2);
    // メモリに値が書き込まれていることの確認
    expect(memory.getUint8(0xFF00 + 1)).toBe(0xAB);
  });
});
