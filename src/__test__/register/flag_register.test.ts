import { FlagRegister } from "vm/register/flag_register";

describe("FlagRegister test", () => {
  let reg: FlagRegister;

  beforeEach(() => {
    reg = new FlagRegister();
  });

  test("constructor", () => {
    expect(reg.value).toBe(0);
    expect(reg.Z).toBe(false);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg = new FlagRegister(100);
    expect(reg.value).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg = new FlagRegister(200);
    expect(reg.value).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg = new FlagRegister(65535); }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg = new FlagRegister(-100); }).toThrow();
  });
  
  describe("zero flag", () => {
    beforeEach(() => {
      reg = new FlagRegister();
    });

    test("read", () => {
      expect(reg.Z).toBe(false);

      reg = new FlagRegister(0x80);
      expect(reg.Z).toBe(true);
    });

    test("write", () => {
      reg.Z = true;
      expect(reg.value).toBe(0x80);
    });

    test("on", () => {
      reg = new FlagRegister(0x7F);
      reg.Z = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new FlagRegister(0xFF);
      reg.Z = false;
      expect(reg.value).toBe(0x7F);
    });
  });

  describe("subtract flag", () => {
    beforeEach(() => {
      reg = new FlagRegister();
    });

    test("read", () => {
      expect(reg.N).toBe(false);

      reg = new FlagRegister(0x40);
      expect(reg.N).toBe(true);
    });

    test("write", () => {
      reg.N = true;
      expect(reg.value).toBe(0x40);
    });

    test("on", () => {
      reg = new FlagRegister(0xBF);
      reg.N = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new FlagRegister(0xFF);
      reg.N = false;
      expect(reg.value).toBe(0xBF);
    });
  });

  describe("half carry flag", () => {
    beforeEach(() => {
      reg = new FlagRegister();
    });

    test("read", () => {
      expect(reg.H).toBe(false);

      reg = new FlagRegister(0x20);
      expect(reg.H).toBe(true);
    });

    test("write", () => {
      reg.H = true;
      expect(reg.value).toBe(0x20);
    });

    test("on", () => {
      reg = new FlagRegister(0xDF);
      reg.H = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new FlagRegister(0xFF);
      reg.H = false;
      expect(reg.value).toBe(0xDF);
    });
  });

  describe("subtract flag", () => {
    beforeEach(() => {
      reg = new FlagRegister();
    });

    test("read", () => {
      expect(reg.N).toBe(false);

      reg = new FlagRegister(0x40);
      expect(reg.N).toBe(true);
    });

    test("write", () => {
      reg.N = true;
      expect(reg.value).toBe(0x40);
    });

    test("on", () => {
      reg = new FlagRegister(0xBF);
      reg.N = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new FlagRegister(0xFF);
      reg.N = false;
      expect(reg.value).toBe(0xBF);
    });
  });

  describe("carry flag", () => {
    beforeEach(() => {
      reg = new FlagRegister();
    });

    test("read", () => {
      expect(reg.C).toBe(false);

      reg = new FlagRegister(0x10);
      expect(reg.C).toBe(true);
    });

    test("write", () => {
      reg.C = true;
      expect(reg.value).toBe(0x10);
    });

    test("on", () => {
      reg = new FlagRegister(0xEF);
      reg.C = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new FlagRegister(0xFF);
      reg.C = false;
      expect(reg.value).toBe(0xEF);
    });
  });
});
