import { User as UserEntity } from "../../orm/entities/user";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends UserEntity {}
  }
}
