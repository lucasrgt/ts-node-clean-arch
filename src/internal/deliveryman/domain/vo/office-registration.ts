import { ValidationError } from "../../../../pkg/error/validation-error";
import { Result } from "../../../../pkg/util/result";
import { onlyNumbers } from "../../../../pkg/validation/only-numbers";

export class OfficeRegistration {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static createWithValidation(value: string): Result<OfficeRegistration> {
    const sanitizedValue = onlyNumbers(value);

    if (sanitizedValue.length < 11 || sanitizedValue.length > 20) {
      return { error: new ValidationError("office registration is invalid") };
    }

    return { data: new OfficeRegistration(sanitizedValue) };
  }

  getValue() {
    return this.value;
  }
}
