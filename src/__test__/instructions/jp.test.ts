import { JP } from "vm/instructions/jp";
import { Memory } from "vm/memory";
import { Registers } from "vm/register/registers";

describe("jp test", () => {
  let buffer: ArrayBuffer;
  let register: Registers;

  beforeEach(() => {
    buffer = new ArrayBuffer(10);

    register = new Registers();
    register.PC = 0;
  });

  test("exec", () => {
    const view = new DataView(buffer);
    view.setUint16(0, 0x1234, true);

    const prevRegister = register.clone();
    const jp = new JP(register, new Memory(new Uint8Array(buffer)));
    const cycle = jp.exec();

    expect(cycle).toBe(16);
    expect(register.AF).toBe(prevRegister.AF);
    expect(register.BC).toBe(prevRegister.BC);
    expect(register.DE).toBe(prevRegister.DE);
    expect(register.HL).toBe(prevRegister.HL);
    expect(register.PC).toBe(0x1234);
  });
});
