import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Post } from "./post";
import { PostLike } from "./postLike";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.following, { onDelete: "SET NULL" })
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers, { onDelete: "SET NULL" })
  following: User[];

  @OneToMany(() => PostLike, (like) => like.liker)
  likes: PostLike[];
}
