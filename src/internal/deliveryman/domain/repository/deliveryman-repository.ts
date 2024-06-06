import { Deliveryman } from "../entity/deliveryman";
import { Result } from "../../../../pkg/util/result";

export interface DeliverymanRepository {
  save(deliveryman: Deliveryman): Promise<Result<void>>;
  update(id: string, deliveryman: Deliveryman): Promise<Result<void>>;
}
