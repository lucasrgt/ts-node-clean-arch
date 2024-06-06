import { randomUUID } from "crypto";
import { CPF } from "../../../shared/vo/cpf";
import { Result } from "../../../../pkg/util/result";
import { OfficeRegistration } from "../vo/office-registration";

export class Deliveryman {
  private id: string;
  private name: string;
  private cpf: CPF;
  private officeRegistration: OfficeRegistration;
  private packagesDeliveredQuantity: number;

  private constructor(
    name: string,
    cpf: CPF,
    officeRegistration: OfficeRegistration,
    id?: string,
    packagesDeliveredQuantity?: number
  ) {
    this.id = id || randomUUID();
    this.name = name;
    this.cpf = cpf;
    this.officeRegistration = officeRegistration;
    this.packagesDeliveredQuantity = packagesDeliveredQuantity || 0;
  }

  deliverPackage() {
    this.packagesDeliveredQuantity++;
  }

  static createWithValidation(
    name: string,
    cpf: CPF,
    officeRegistration: string,
    id?: string
  ): Result<Deliveryman> {
    // Office Registration
    const { data: validOfficeRegistration, error: officeRegistrationError } =
      OfficeRegistration.createWithValidation(officeRegistration);

    if (officeRegistrationError != null) {
      return { error: officeRegistrationError };
    }

    // Deliveryman
    return {
      data: new Deliveryman(name, cpf, validOfficeRegistration!, id),
    };
  }

  static fromModel(
    name: string,
    cpf: CPF,
    officeRegistration: OfficeRegistration,
    id: string
  ): Deliveryman {
    return new Deliveryman(name, cpf, officeRegistration, id);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCpf() {
    return this.cpf;
  }

  getOfficeRegistration() {
    return this.officeRegistration;
  }

  getPackagesDeliveredQuantity() {
    return this.packagesDeliveredQuantity;
  }
}
