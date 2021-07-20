import { Register, Register8bit } from "vm/register/register_8bit";

describe("Register8bit test", () => {
  let reg: Register;

  beforeEach(() => {
    reg = new Register8bit();
  })

  test("constructor", () => {
    expect(reg.value).toBe(0);
  });

  test("change valid value(under signed 8bit)", () => {
    reg = new Register8bit(100);
    expect(reg.value).toBe(100);
  });

  test("change valid value(under unsigned 8bit)", () => {
    reg = new Register8bit(200);
    expect(reg.value).toBe(200);
  });

  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg = new Register8bit(65535); }).toThrow();
  });

  test("change value(minous value)", () => {
    expect(() => { reg = new Register8bit(-100); }).toThrow();
  });
});
