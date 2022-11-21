import { Model, ModelObject } from "objection";

export class UserModel extends Model {
  id!: string;
  name!: string;
  emai!: string;
  password!: string;

  static tableName = "users";
  static idColumn = "id";
}

export type User = ModelObject<UserModel>;
