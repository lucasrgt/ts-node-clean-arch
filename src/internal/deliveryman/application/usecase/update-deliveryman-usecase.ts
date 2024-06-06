import { randomUUID } from "crypto";
import { Result } from "../../../../pkg/util/result";
import { CPF } from "../../../shared/vo/cpf";
import { Deliveryman } from "../../domain/entity/deliveryman";
import { DeliverymanLogRepository } from "../../domain/repository/deliveryman-log-repository";
import { DeliverymanRepository } from "../../domain/repository/deliveryman-repository";

export interface UpdateDeliverymanInputDto {
  readonly id: string;
  readonly name: string;
  readonly cpf: string;
  readonly officeRegistration: string;
}

export interface UpdateDeliverymanOutputDto {
  readonly id: string;
  readonly name: string;
  readonly cpf: string;
}

export class UpdateDeliverymanUseCase {
  constructor(
    private readonly repository: DeliverymanRepository,
    private readonly logRepository: DeliverymanLogRepository
  ) {}

  async execute(
    input: UpdateDeliverymanInputDto
  ): Promise<Result<UpdateDeliverymanOutputDto>> {
    // CPF
    const { data: validCpf, error: cpfError } = CPF.createWithValidation(
      input.cpf
    );

    if (cpfError != null) {
      return { error: cpfError };
    }

    // Deliveryman
    const { data: validDeliveryman, error: deliverymanError } =
      Deliveryman.createWithValidation(
        input.name,
        validCpf!,
        input.officeRegistration
      );

    if (deliverymanError != null) {
      return { error: deliverymanError };
    }

    // Repository
    const { error: repositoryError } = await this.repository.update(
      input.id,
      validDeliveryman!
    );

    if (repositoryError != null) {
      return { error: repositoryError };
    }

    // Log Repository
    const { error: logRepositoryError } = await this.logRepository.saveLog(
      randomUUID(),
      validDeliveryman!.getId(),
      validDeliveryman!.getName()
    );

    if (logRepositoryError != null) {
      return { error: logRepositoryError };
    }

    // Output
    return {
      data: {
        id: validDeliveryman!.getId(),
        name: validDeliveryman!.getName(),
        cpf: validDeliveryman!.getCpf().getValue(),
      },
    };
  }
}
