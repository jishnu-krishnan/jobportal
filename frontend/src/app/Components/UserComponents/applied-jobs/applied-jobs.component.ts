import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent implements OnInit {

  post :any=[];
  id: String;
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.limit=8
    const user= JSON.parse(localStorage.getItem('user'))

    this.authService.appliedPost(user.id).subscribe(res => {
      //console.log('vlaues',res.vacancy)
      this.post=res.post
      this.temp=res.length
      console.log('values',this.post)
    },(error)=> {
      console.log(error)
    }); 
  }

  showMore(){
    this.limit=this.temp;
  }
}
