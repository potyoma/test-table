import { WithId } from "./with-id";

export type PricePlan = WithId & {
  description: string;
  active: boolean;
  createdAt: string;
  removedAt: string;
};
