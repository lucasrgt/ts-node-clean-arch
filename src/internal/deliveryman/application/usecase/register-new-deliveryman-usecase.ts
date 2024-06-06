import { randomUUID } from "crypto";
import { Result } from "../../../../pkg/util/result";
import { CPF } from "../../../shared/vo/cpf";
import { Deliveryman } from "../../domain/entity/deliveryman";
import { DeliverymanLogRepository } from "../../domain/repository/deliveryman-log-repository";
import { DeliverymanRepository } from "../../domain/repository/deliveryman-repository";
import { verifySerasaSituation } from "../../../../pkg/serasa/verify-serasa-situation";

export interface RegisterNewDeliverymanInputDto {
  readonly name: string;
  readonly cpf: string;
  readonly officeRegistration: string;
}

export interface RegisterNewDeliverymanOutputDto {
  readonly id: string;
  readonly name: string;
}

export class RegisterNewDeliverymanUseCase {
  constructor(
    private readonly repository: DeliverymanRepository,
    private readonly logRepository: DeliverymanLogRepository
  ) {}

  async execute(
    input: RegisterNewDeliverymanInputDto
  ): Promise<Result<RegisterNewDeliverymanOutputDto>> {
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

    // Serasa Situation
    const serasaSituation = verifySerasaSituation(validDeliveryman!.getName());

    if (!serasaSituation.canPass) {
      return { error: new Error("you shall not pass! not allowed by serasa") };
    }

    // Repository
    const { error: repositoryError } = await this.repository.save(
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
      },
    };
  }
}
