import { Result } from "../../../../pkg/util/result";

export interface DeliverymanLogRepository {
  saveLog(
    id: string,
    createdById: string,
    createdByName: string
  ): Promise<Result<void>>;
}
