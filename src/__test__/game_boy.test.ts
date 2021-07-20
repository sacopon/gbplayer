import { GameBoy } from "vm/game_boy";

describe("GameBoy test", () => {
  test("constructor", () => {
    const buffer = new ArrayBuffer(1);
    const cpu = new GameBoy(new Uint8Array(buffer));
  });
});
