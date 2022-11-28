import { Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { User } from "./user";
import { Post } from "./post";

@Entity("post_likes")
export class PostLike {
  @PrimaryColumn()
  likerId: number;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => User, (user) => user.likes)
  liker: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
