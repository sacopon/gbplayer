import { RegisterAF } from "vm/register/register_af";

describe("AFRegister test", () => {
  let reg: RegisterAF;

  beforeEach(() => {
    reg = new RegisterAF();
  });

  test("constructor", () => {
    expect(reg.value).toBe(0);
    expect(reg.hi).toBe(0);
    expect(reg.lo).toBe(0);
  });
  
  test("change valid value(under signed 16bit)", () => {
    reg = new RegisterAF(40000);
    expect(reg.value).toBe(40000);
  });
  
  test("change valid value(under unsigned 16bit)", () => {
    reg = new RegisterAF(65000);
    expect(reg.value).toBe(65000);
  });
  
  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg = new RegisterAF(100000); }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg = new RegisterAF(-100); }).toThrow();
  });
  
  test("get 8bit(hi) value", () => {
    reg = new RegisterAF(10000);
  
    expect(reg.hi).toBe(39);
  });
  
  test("set 8bit(hi) value", () => {
    reg.hi = 100;
  
    expect(reg.hi).toBe(100);
  });
  
  test("get 8bit(lo) value", () => {
    reg = new RegisterAF(10000);
  
    expect(reg.lo).toBe(16);
  });
  
  test("set 8bit(lo) value", () => {
    reg.lo = 100;
  
    expect(reg.lo).toBe(100);
  });

  describe("zero flag", () => {
    beforeEach(() => {
      reg = new RegisterAF();
    });

    test("read", () => {
      expect(reg.flag.Z).toBe(false);

      reg = new RegisterAF(0x80);
      expect(reg.flag.Z).toBe(true);
    });

    test("write", () => {
      reg.flag.Z = true;
      expect(reg.value).toBe(0x80);
    });

    test("on", () => {
      reg = new RegisterAF(0x7F);
      reg.flag.Z = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new RegisterAF(0xFF);
      reg.flag.Z = false;
      expect(reg.value).toBe(0x7F);
    });
  });

  describe("subtract flag", () => {
    beforeEach(() => {
      reg = new RegisterAF();
    });

    test("read", () => {
      expect(reg.flag.N).toBe(false);

      reg = new RegisterAF(0x40);
      expect(reg.flag.N).toBe(true);
    });

    test("write", () => {
      reg.flag.N = true;
      expect(reg.value).toBe(0x40);
    });

    test("on", () => {
      reg = new RegisterAF(0xBF);
      reg.flag.N = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new RegisterAF(0xFF);
      reg.flag.N = false;
      expect(reg.value).toBe(0xBF);
    });
  });

  describe("half carry flag", () => {
    beforeEach(() => {
      reg = new RegisterAF();
    });

    test("read", () => {
      expect(reg.flag.H).toBe(false);

      reg = new RegisterAF(0x20);
      expect(reg.flag.H).toBe(true);
    });

    test("write", () => {
      reg.flag.H = true;
      expect(reg.value).toBe(0x20);
    });

    test("on", () => {
      reg = new RegisterAF(0xDF);
      reg.flag.H = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new RegisterAF(0xFF);
      reg.flag.H = false;
      expect(reg.value).toBe(0xDF);
    });
  });

  describe("subtract flag", () => {
    beforeEach(() => {
      reg = new RegisterAF();
    });

    test("read", () => {
      expect(reg.flag.N).toBe(false);

      reg = new RegisterAF(0x40);
      expect(reg.flag.N).toBe(true);
    });

    test("write", () => {
      reg.flag.N = true;
      expect(reg.value).toBe(0x40);
    });

    test("on", () => {
      reg = new RegisterAF(0xBF);
      reg.flag.N = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new RegisterAF(0xFF);
      reg.flag.N = false;
      expect(reg.value).toBe(0xBF);
    });
  });

  describe("carry flag", () => {
    beforeEach(() => {
      reg = new RegisterAF();
    });

    test("read", () => {
      expect(reg.flag.C).toBe(false);

      reg = new RegisterAF(0x10);
      expect(reg.flag.C).toBe(true);
    });

    test("write", () => {
      reg.flag.C = true;
      expect(reg.value).toBe(0x10);
    });

    test("on", () => {
      reg = new RegisterAF(0xEF);
      reg.flag.C = true;
      expect(reg.value).toBe(0xFF);
    });

    test("off", () => {
      reg = new RegisterAF(0xFF);
      reg.flag.C = false;
      expect(reg.value).toBe(0xEF);
    });
  });
});
