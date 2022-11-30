import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./user";
import { Post } from "./post";

@Entity("post_likes")
export class PostLike {
  @PrimaryColumn()
  likerId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  liker: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post: Post;
}
