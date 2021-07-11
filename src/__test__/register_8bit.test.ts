import { Register8bit, General8bitRegister } from "vm/register_8bit";

describe("Register8bit test", () => {
  let reg: Register8bit;

  beforeEach(() => {
    reg = new General8bitRegister();
  })

  test("constructor", () => {
    expect(reg.value).toBe(0);
  });

  test("change valid value(under signed 8bit)", () => {
    reg.value = 100;
    expect(reg.value).toBe(100);
  });

  test("change valid value(under unsigned 8bit)", () => {
    reg.value = 200;
    expect(reg.value).toBe(200);
  });

  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.value = 65535; }).toThrow();
  });

  test("change value(minous value)", () => {
    expect(() => { reg.value = -100; }).toThrow();
  });
});
