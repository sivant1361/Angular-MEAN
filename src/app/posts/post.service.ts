import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/posts')
      .pipe(
        map((postData) => {
          // console.log(postData)
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string; post: any }>('http://localhost:3000/posts', post)
      .subscribe((response) => {
        console.log(response.message, response.post);
        this.posts.push({
          title: response.post.title,
          content: response.post.content,
          id: response.post._id,
        });
        this.postUpdated.next([...this.posts]);
      });
  }

  postDelete(id: string) {
    this.http.delete('http://localhost:3000/posts/' + id).subscribe(() => {
      console.log('Deleted post');
      const updatedPosts = this.posts.filter((post) => post.id !== id);
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
    });
  }
}
