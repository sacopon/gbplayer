import { CpuOperation } from "vm/cpu_operation";
import { LddAddressIntoRegister } from "vm/instructions/ldd_address_into_register";
import { LddRegisterIntoAddress } from "vm/instructions/ldd_register_into_address";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LDD (HL), A test", () => {
  let register: RegisterSet;

  beforeEach(() => {
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
    const prevRegister = register.clone();

    const buffer = new ArrayBuffer(3);
    const view = new DataView(buffer);
    const memory = new Memory(new Uint8Array(buffer));

    // 書き込む予定のアドレス
    register.HL = prevRegister.HL = 1;

    // 書き込む予定の値を設定
    register.A = prevRegister.A = 0xAB;
    expect(register.A).toBe(0xAB);

    const instruction = new LddRegisterIntoAddress(new CpuOperation(register, memory));
    const cycle = instruction.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(8);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.SP).toBe(prevRegister.SP);
    // 指定の番地に値が設定されていることの確認
    expect(memory.getUint8(1)).toBe(0xAB);
    // HL レジスタがデクリメントされていることの確認
    expect(register.HL).toBe(prevRegister.HL - 1);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 1);
  });
});
