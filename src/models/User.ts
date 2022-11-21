import { Model } from "objection";

export class User extends Model {
  id!: string;
  name!: string;
  emai!: string;
  password!: string;
}

export type UserShape = ModelObject<User>;
