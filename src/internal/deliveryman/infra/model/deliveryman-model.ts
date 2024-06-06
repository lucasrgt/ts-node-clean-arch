import { Deliveryman } from "../../domain/entity/deliveryman";

export class DeliverymanModel {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly cpf: string,
    readonly officeRegistration: string,
    readonly packagesDelivered: number
  ) {}

  public static fromEntity(deliveryman: Deliveryman): DeliverymanModel {
    const deliverymanModel = new DeliverymanModel(
      deliveryman.getId(),
      deliveryman.getName(),
      deliveryman.getCpf().getValue(),
      deliveryman.getOfficeRegistration().getValue(),
      deliveryman.getPackagesDeliveredQuantity()
    );

    return deliverymanModel;
  }
}
