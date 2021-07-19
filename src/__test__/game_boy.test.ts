import { GameBoy } from "vm/game_boy";

describe("GameBoy test", () => {
  test("readUint8()", () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    for (let i = 0; i < 100; ++i) {
      view.setUint8(i, 0x11);
    }

    const cpu = new GameBoy(new Uint8Array(buffer));
    cpu.PC = 0;

    expect(cpu.readUint8()).toBe(0x11);
    expect(cpu.PC).toBe(1);
  });

  test("readUint8()", () => {
    const buffer = new ArrayBuffer(100);
    const view = new DataView(buffer);
    for (let i = 0; i < 100; ++i) {
      view.setUint8(i, 0x11);
    }

    const cpu = new GameBoy(new Uint8Array(buffer));
    cpu.PC = 0;

    expect(cpu.readUint16()).toBe(0x1111);
    expect(cpu.PC).toBe(2);
  });
});
