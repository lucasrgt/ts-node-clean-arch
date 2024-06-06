import { ValidationError } from "../../../../pkg/error/validation-error";
import { Result } from "../../../../pkg/util/result";
import { CPF } from "../../../shared/vo/cpf";
import { Deliveryman } from "../entity/deliveryman";

export function createDeliverymanList(
  names: string[],
  cpfs: CPF[],
  officeRegistrations: string[]
): Result<Deliveryman[]> {
  const deliverymen: Deliveryman[] = [];
  const errors: ValidationError[] = [];

  if (
    names.length !== cpfs.length ||
    names.length !== officeRegistrations.length
  ) {
    return {
      error: new ValidationError(
        "the length of names, cpfs, and officeRegistrations must be the same"
      ),
    };
  }

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const cpf = cpfs[i];
    const officeRegistration = officeRegistrations[i];

    const { data: deliveryman, error } = Deliveryman.createWithValidation(
      name,
      cpf,
      officeRegistration
    );

    if (error != null) {
      errors.push(
        new ValidationError(`Error for entry ${i}: ${error.message}`)
      );
      continue;
    }

    deliverymen.push(deliveryman!);
  }

  if (errors.length > 0) {
    return {
      error: new ValidationError(errors.map((e) => e.message).join("; ")),
    };
  }

  return { data: deliverymen };
}
