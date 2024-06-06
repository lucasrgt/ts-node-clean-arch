import { PrismaClient } from "@prisma/client";
import { Result } from "../../../../pkg/util/result";
import { Deliveryman } from "../../domain/entity/deliveryman";
import { DeliverymanRepository } from "../../domain/repository/deliveryman-repository";

export class DeliverymanRepositoryPrisma implements DeliverymanRepository {
  constructor(private prisma: PrismaClient) {}

  async save(deliveryman: Deliveryman): Promise<Result<void>> {
    try {
      const deliverymanModel = DeliverymanModel.fromEntity(deliveryman);

      await this.prisma.deliveryman.create({ data: deliverymanModel });

      console.log(
        `Deliveryman with id: ${deliverymanModel.id} was created successfully`
      );

      return { data: deliverymanModel.id };
    } catch (e) {
      console.error(
        `Error in repository: ${e}. Prisma was configured correctly?`
      );
      return { error: new Error(`internal server error.`) };
    }
  }

  update(id: string, deliveryman: Deliveryman): Promise<Result<void>> {
    throw new Error("Method not implemented.");
  }
}
