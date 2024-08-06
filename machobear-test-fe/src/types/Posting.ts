import { User } from "./User";

export type Posting = {
  id: string;
  title: string;
  price: number;
  description: string | null;
  address: string;
  imageUrl: string | null;
  createdBy: User;
};
