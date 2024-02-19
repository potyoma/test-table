import { WithId } from "./with-id";

export type ProductOptions = {
  size: string;
  amount: number;
};

export type Product = WithId & {
  name: string;
  active: boolean;
  createdAt: string;
};
