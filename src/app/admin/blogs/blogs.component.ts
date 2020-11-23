import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Blog } from 'src/app/classes/blog.model';
import { IBlog } from 'src/app/interfacecs/blog.interface';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  adminBlog: Array<IBlog> = [];
  blogID: number | string;
  blogTitle: string = '';
  blogText: string = '';
  blogAuthor:string = '';
  blogImage = 'https://franch.biz/franch/file/5577/lapiec-3308816.jpg'
  editStatus = false;
  constructor(private blogService: BlogService) {
    
   }

  ngOnInit(): void {
    this.getJsonAdminBlog()
  }
  getJsonAdminBlog(): void{
      this.blogService.getJsonBlogs().subscribe(data => {
        this.adminBlog = data;
      },
      err => {
console.log(err);

      })
  }
  addAdminBlog():void{
    if(this.blogTitle.length > 0 && this.blogText.length > 0 && this.blogAuthor.length > 0){
      const newB = new Blog(1, this.blogTitle, this.blogText, new Date, this.blogAuthor, this.blogImage)
      delete newB.id
      this.blogService.postJsonBlogs(newB).subscribe(() => {
        this.getJsonAdminBlog()
      },
      err =>{
        console.log(err);
        
      })
      this.resetForm();
    }
    else{
      this.resetForm()
    }
  }
deleteAdminBlog(blog : IBlog): void{
  this.blogService.deleteJsonBlog(blog).subscribe(()=>{
    this.getJsonAdminBlog()
  },
  err =>{
    console.log(err);
    
  })
}
editAdminBlog(b: IBlog):void{
  this.blogID = b.id;
  this.blogAuthor = b.author;
  this.blogText = b.text;
  this.blogTitle = b.title;
  this.editStatus = true
}
saveAdminBlog():void{
  const saveB = new Blog(1, this.blogTitle, this.blogText, new Date, this.blogAuthor, this.blogImage )
saveB.id = +this.blogID;
this.blogService.updateJsonBlog(saveB).subscribe(()=>{
  this.getJsonAdminBlog();
},
err => {
  console.log(err);
  
})
   this.resetForm();
    this.editStatus = false
}
  resetForm(){
    this.blogTitle = '';
    this.blogText = '';
    this.blogAuthor = '';
  }
}
