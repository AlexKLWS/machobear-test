import { User } from "./User";

export type Posting = {
  id: number;
  title: string;
  price: number;
  description: string | null;
  address: string;
  imageUrl: string | null;
  isBookmarked: boolean | null;
  createdBy: User;
};
