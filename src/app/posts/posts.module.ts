import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';

import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { AngularMaterialModule } from '../angular-material.module';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [AngularMaterialModule, CommonModule,ReactiveFormsModule, RouterModule],
})
export class PostsModule {}
