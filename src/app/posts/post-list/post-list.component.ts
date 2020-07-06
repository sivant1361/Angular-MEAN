import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // posts = [
  //   {
  //     title: 'first title',
  //     content: 'I am the first content',
  //   },
  //   {
  //     title: 'second title',
  //     content: 'I am the second content',
  //   },
  //   {
  //     title: 'third title',
  //     content: 'I am the third content',
  //   },
  //   {
  //     title: 'fourth title',
  //     content: 'I am the fourth content',
  //   },
  // ];
  posts = [];
}
