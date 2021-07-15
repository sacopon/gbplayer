import { General16bitRegister } from "./register_16bit";

export class ProgramCounter extends General16bitRegister {
  private static readonly START_ADDRESS = 0x0100;

  constructor() {
    super();
    this.value = ProgramCounter.START_ADDRESS;
  }
}
