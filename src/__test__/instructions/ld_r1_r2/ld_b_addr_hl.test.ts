import { CpuOperation } from "vm/cpu_operation";
import { LdBAddrHl } from "vm/instructions/ld_r1_r2/ld_b_addr_hl";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("LD A, (HL) test", () => {
  let register: RegisterSet;

  beforeEach(() => {
    register = new RegisterSet();
    register.PC = 0;
  });

  test("clone", () => {
    const instruction = new LdBAddrHl(new CpuOperation(register, new Memory(new Uint8Array(new ArrayBuffer(1)))));
    const cloned = instruction.clone();

    expect(cloned).toBeInstanceOf(LdBAddrHl);
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
    const buffer = new ArrayBuffer(0xFF01 + 1);
    const view = new DataView(buffer);
    view.setUint8(0xFF00 + 1, 0xAB);
    const memory = new Memory(new Uint8Array(buffer));

    // 読み出すアドレスを設定
    register.HL = prevRegister.HL = 0xFF01;

    const instruction = new LdBAddrHl(new CpuOperation(register, memory));
    instruction.fetch();
    const cycle = instruction.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(8);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.C).toBe(prevRegister.C);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // A レジスタの内容が変わっていることの確認
    expect(register.B).toBe(0xAB);
    expect(register.BC).toBe(0xAB44);
    // プログラムカウンタが進んでいることの確認
    expect(register.PC).toBe(prevRegister.PC + 1);
  });
});
