import { Model, ModelObject } from "objection";

export class UserModel extends Model {
  static tableName = "users";
  static idColumn = "id";
}

export type User = ModelObject<UserModel>;
