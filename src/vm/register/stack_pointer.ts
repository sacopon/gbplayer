import { General16bitRegister } from "./register_16bit";

export class StackPointer extends General16bitRegister {
  constructor(value: number = 0) {
    super(value);
  }
}
