import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  post :any=[];
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.limit=8
      const user= JSON.parse(localStorage.getItem('user'))
      this.profile=user.name
      
      this.authService.getSuggestionPost().subscribe(res => {
        this.post=res
        this.temp=res.length
        console.log('valuessss',this.post)
      },(error)=> {
        console.log(error)
      });
       
      const data={
        skill:user.skillset,
        qul:user.qualification
      }
      this.authService.getUserSuggestionPost(JSON.stringify(data)).subscribe(res => {
          this.post=res
          this.temp=res.length
          console.log('valuessss',this.post)
      },(error)=> {
        console.log(error)
      }); 
  }

  onApply(pid,cid){
    //console.log(id)
    if(window.confirm('Are you sure?')){
      const user= JSON.parse(localStorage.getItem('user'))
      const values={
        user:user.id,
        company:cid,
        postid:pid

      }
      this.authService.applyVacancyPost(JSON.stringify(values)).subscribe(res => {
        this.post=res.vacancy
        this.temp=res.length
      this.ngOnInit();
      },(error)=>{
        console.log(error)
      });
    }
  }

}
