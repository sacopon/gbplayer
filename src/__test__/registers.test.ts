import { Registers } from "vm/registers";

// B
describe("B register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.B).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.B = 100;
    expect(reg.B).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.B = 200;
    expect(reg.B).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.B = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.B = -100; }).toThrow();
  });
});

// C
describe("C register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.C).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.C = 100;
    expect(reg.C).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.C = 200;
    expect(reg.C).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.C = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.C = -100; }).toThrow();
  });
});

// BC
describe("BC register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.BC).toBe(0);
  });

  test("change valid value(under signed 16bit)", () => {
    reg.BC = 40000; // 0x9C40
    expect(reg.BC).toBe(0x9C40);
    expect(reg.B).toBe(0x9C);
    expect(reg.C).toBe(0x40);
  });

  test("change valid value(under unsigned 16bit)", () => {
    reg.BC = 65000; // 0xFDE8
    expect(reg.BC).toBe(0xFDE8);
    expect(reg.B).toBe(0xFD);
    expect(reg.C).toBe(0xE8);
  });
  
  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg.BC = 100000; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.BC = -100; }).toThrow();
  });

  test("change for BC register", () => {
    reg.BC = 0x1234;
    expect(reg.B).toBe(0x12);
    expect(reg.C).toBe(0x34);
  });

  test("change for B register", () => {
    reg.BC = 0x1234;
    reg.B = 0;
    expect(reg.B).toBe(0x00);
    expect(reg.C).toBe(0x34);
  });

  test("change for C register", () => {
    reg.BC = 0x1234;
    reg.C = 0;
    expect(reg.B).toBe(0x12);
    expect(reg.C).toBe(0x00);
  });
});

// D
describe("D register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.D).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.D = 100;
    expect(reg.D).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.D = 200;
    expect(reg.D).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.D = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.D = -100; }).toThrow();
  });
});

// E
describe("E register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.E).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.E = 100;
    expect(reg.E).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.E = 200;
    expect(reg.E).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.E = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.E = -100; }).toThrow();
  });
});

// DE
describe("DE register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.DE).toBe(0);
  });

  test("change valid value(under signed 16bit)", () => {
    reg.DE = 40000; // 0x9C40
    expect(reg.DE).toBe(0x9C40);
    expect(reg.D).toBe(0x9C);
    expect(reg.E).toBe(0x40);
  });

  test("change valid value(under unsigned 16bit)", () => {
    reg.DE = 65000; // 0xFDE8
    expect(reg.DE).toBe(0xFDE8);
    expect(reg.D).toBe(0xFD);
    expect(reg.E).toBe(0xE8);
  });
  
  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg.DE = 100000; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.DE = -100; }).toThrow();
  });

  test("change for DE register", () => {
    reg.DE = 0x1234;
    expect(reg.D).toBe(0x12);
    expect(reg.E).toBe(0x34);
  });

  test("change for D register", () => {
    reg.DE = 0x1234;
    reg.D = 0;
    expect(reg.D).toBe(0x00);
    expect(reg.E).toBe(0x34);
  });

  test("change for E register", () => {
    reg.DE = 0x1234;
    reg.E = 0;
    expect(reg.D).toBe(0x12);
    expect(reg.E).toBe(0x00);
  });
});

// H
describe("H register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.H).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.H = 100;
    expect(reg.H).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.H = 200;
    expect(reg.H).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.H = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.H = -100; }).toThrow();
  });
});

// L
describe("L register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.L).toBe(0);
  });
  
  test("change valid value(under signed 8bit)", () => {
    reg.L = 100;
    expect(reg.L).toBe(100);
  });
  
  test("change valid value(under unsigned 8bit)", () => {
    reg.L = 200;
    expect(reg.L).toBe(200);
  });
  
  test("change value(over unsigned 8bit value)", () => {
    expect(() => { reg.L = 65535; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.L = -100; }).toThrow();
  });
});

// HL
describe("HL register", () => {
  let reg: Registers;

  beforeEach(() => {
    reg = new Registers();
  });

  test("constructor", () => {
    expect(reg.HL).toBe(0);
  });

  test("change valid value(under signed 16bit)", () => {
    reg.HL = 40000; // 0x9C40
    expect(reg.HL).toBe(0x9C40);
    expect(reg.H).toBe(0x9C);
    expect(reg.L).toBe(0x40);
  });

  test("change valid value(under unsigned 16bit)", () => {
    reg.HL = 65000; // 0xFDE8
    expect(reg.HL).toBe(0xFDE8);
    expect(reg.H).toBe(0xFD);
    expect(reg.L).toBe(0xE8);
  });
  
  test("change value(over unsigned 16bit value)", () => {
    expect(() => { reg.HL = 100000; }).toThrow();
  });
  
  test("change value(minous value)", () => {
    expect(() => { reg.HL = -100; }).toThrow();
  });

  test("change for HL register", () => {
    reg.HL = 0x1234;
    expect(reg.H).toBe(0x12);
    expect(reg.L).toBe(0x34);
  });

  test("change for H register", () => {
    reg.HL = 0x1234;
    reg.H = 0;
    expect(reg.H).toBe(0x00);
    expect(reg.L).toBe(0x34);
  });

  test("change for L register", () => {
    reg.HL = 0x1234;
    reg.L = 0;
    expect(reg.H).toBe(0x12);
    expect(reg.L).toBe(0x00);
  });
});
