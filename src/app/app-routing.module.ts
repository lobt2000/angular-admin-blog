import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductsComponent } from './admin/products/products.component';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin/adminBlogs' },
  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'category' },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductsComponent },
    { path: 'adminBlogs', component: BlogsComponent }
  ] },  
  { path: '**', component: BlogsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
