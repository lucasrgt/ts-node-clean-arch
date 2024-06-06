import { Request, Response } from "express";
import { RegisterNewDeliverymanUseCase } from "../../../application/usecase/register-new-deliveryman-usecase";
import { UpdateDeliverymanInputDto } from "../../../application/usecase/update-deliveryman-usecase";

export class DeliverymanControllerJSON {
  constructor(
    private readonly registerNewDeliverymanUseCase: RegisterNewDeliverymanUseCase,
    private readonly updateDeliverymanUseCase: RegisterNewDeliverymanUseCase
  ) {}

  async registerNewDeliveryman(req: Request, res: Response) {
    try {
      const request: UpdateDeliverymanInputDto = req.body;

      const { data: output, error } =
        await this.registerNewDeliverymanUseCase.execute(request);
      if (error != null) {
        res.status(500);
        res.send({ message: error.message });
        return;
      }

      res.status(200);
      res.send({ message: "success", data: output });
    } catch (e) {
      res.status(500);
      res.send({ message: "não foi possível" });
    }
  }
}
