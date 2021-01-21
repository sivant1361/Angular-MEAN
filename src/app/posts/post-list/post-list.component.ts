import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit,OnDestroy {
  posts: Post[] = [];
  private postsSub : Subscription;

  constructor(public postsService: PostsService) {}
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub =  this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[])=>{
          this.posts=posts
        });
  }

  onDelete(id :string){
    this.postsService.postDelete(id);
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
