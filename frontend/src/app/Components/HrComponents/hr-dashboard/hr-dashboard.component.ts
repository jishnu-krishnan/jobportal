import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.css']
})
export class HrDashboardComponent implements OnInit {
  post :any=[];
  profile :String;
  searchText:String;
  limit:Number;
  temp:Number;
  
    constructor(
      public fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
    ) {  }
  
    ngOnInit(): void {
  
      this.limit=8
      const user= JSON.parse(localStorage.getItem('user'))
      this.profile=user.name

  
      this.authService.getVacancyPost(user.id).subscribe(res => {
          this.post=res.vacancy
          this.temp=res.length
          console.log('valuessss',this.post)

      },(error)=> {
        console.log(error)
      }); 
    }

  
    onDelete(id){
      //console.log(id)
      if(window.confirm('Are you sure?')){
        this.authService.deleteVacancyPost(id).subscribe(res => {
          this.post=res.vacancy
          this.temp=res.length
        this.ngOnInit();
        },(error)=>{
          console.log(error)
        });
      }
    }

  
    showMore(){
      this.limit=this.temp;
      //this.style.visibility= 'hidden'; 
    }
    
  }
  