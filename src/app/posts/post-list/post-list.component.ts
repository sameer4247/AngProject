import { OnDestroy } from "@angular/core";

import { Component, Input, OnInit } from "@angular/core";

import { Subscription } from "rxjs";

import { Post } from "../post.model";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",

  templateUrl: "./post-list.component.html",

  styleUrls: ["./post-list.component.css"],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();

    this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
    console.log(postId);
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }
}
