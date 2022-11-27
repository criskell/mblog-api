import { User as UserEntity } from "../../orm/entities/user";

declare global {
  namespace Express {
    interface User extends UserEntity {}
  }
}
