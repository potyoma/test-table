import { WithId } from "./with-id";

export type Page = WithId & {
  title: string;
  active: boolean;
  updatedAt: string;
  publishedAt: string;
};
