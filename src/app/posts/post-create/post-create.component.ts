import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  form: FormGroup;
  isLoading: boolean = false;
  private mode = "create";
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = new FormGroup({

      title: new FormControl(null, {

        validators: [Validators.required, Validators.minLength(3)]

      }),

      content: new FormControl(null, {

        validators: [Validators.required]

      })

    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if(paramMap.has('postId')){

        this.mode = "edit"

        this.postId = paramMap.get('postId')

        this.isLoading = true

        this.postsService.getPost(this.postId

          ).subscribe((postData) => {

            this.isLoading = false

            this.post = {

              id: postData._id,

              title: postData.title,

              content: postData.content

            }

            this.form.setValue({

              title: this.post.title,

              content: this.post.content

            })

          })

        }

    })

  }
  onSavePost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "edit") {
      console.log("edit mode", this.postId);
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    } else {
      console.log("create mode");
      this.postsService.addPost(
        this.form.value.id,
        this.form.value.title,
        this.form.value.content
      );
    }
    this.form.reset();
  }
}
