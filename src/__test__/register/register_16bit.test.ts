import { Register16bit, General16bitRegister } from "vm/register/register_16bit";

describe("Register16bit test", () => {
  let reg: Register16bit;

  beforeEach(() => {
    reg = new General16bitRegister();
  });

  test("constructor", () => {
    expect(reg.value).toBe(0);
  });

  test("change valid value(under signed 16bit)", () => {
    reg = new General16bitRegister(40000);
    expect(reg.value).toBe(40000);
  });

  test("change valid value(under unsigned 16bit)", () => {
    reg = new General16bitRegister(65000);
    expect(reg.value).toBe(65000);
  });

  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg = new General16bitRegister(100000); }).toThrow();
  });

  test("change value(minous value)", () => {
    expect(() => { reg = new General16bitRegister(-100); }).toThrow();
  });

  test("get 8bit(hi) value", () => {
    reg = new General16bitRegister(10000);

    expect(reg.hi).toBe(39);
  });

  test("set 8bit(hi) value", () => {
    reg.hi = 100;

    expect(reg.hi).toBe(100);
  });

  test("get 8bit(lo) value", () => {
    reg = new General16bitRegister(10000);

    expect(reg.lo).toBe(16);
  });

  test("set 8bit(lo) value", () => {
    reg.lo = 100;

    expect(reg.lo).toBe(100);
  });
});
