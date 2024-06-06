import { ValidationError } from "../../../pkg/error/validation-error";
import { Result } from "../../../pkg/util/result";
import { onlyNumbers } from "../../../pkg/validation/only-numbers";

export class CPF {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static createWithValidation(value: string): Result<CPF> {
    const sanitizedValue = onlyNumbers(value);

    if (sanitizedValue.length !== 11) {
      return { error: new ValidationError("cpf is invalid") };
    }

    return { data: new CPF(sanitizedValue) };
  }

  getValue() {
    return this.value;
  }
}
