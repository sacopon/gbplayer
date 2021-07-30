import { CpuOperation } from "vm/cpu_operation";
import { JpNn } from "vm/instructions/jp_nn";
import { Memory } from "vm/memory";
import { RegisterSet } from "vm/register/register_set";

describe("jp test", () => {
  let buffer: ArrayBuffer;
  let register: RegisterSet;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);

    register = new RegisterSet();
    register.PC = 0;
  });

  test("exec", () => {
    const view = new DataView(buffer);
    view.setUint16(0, 0x1234, true);

    // レジスタにテスト用の初期値を設定
    register.AF = 0x1122;
    register.BC = 0x3344;
    register.DE = 0x5566;
    register.HL = 0x7788;
    register.SP = 0x99AA;
    const prevRegister = register.clone();

    const jp = new JpNn(new CpuOperation(register, new Memory(new Uint8Array(buffer))));
    const cycle = jp.exec();

    // 返値(サイクル数)の確認
    expect(cycle).toBe(16);
    // 他のレジスタに影響を与えていないことの確認
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.SP).toBe(prevRegister.SP);
    // プログラムカウンタが指定の位置を指していることの確認
    expect(register.PC).toBe(0x1234);
  });
});
