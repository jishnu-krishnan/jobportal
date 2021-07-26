import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {
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
    this.id = this.route.snapshot.params['id']
    if(this.id!=undefined){
      this.authService.getApplications(this.id).subscribe(res => {
        //console.log('vlaues',res.vacancy)
        this.post=res.vacancy
        this.temp=res.length
        console.log('values',this.post)
      },(error)=> {
        console.log(error)
      }); 
    }
  }

  // onDelete(id){
  //   //console.log(id)
  //   if(window.confirm('Are you sure?')){
  //     this.authService.deleteVacancyPost(id).subscribe(res => {
  //     //console.log(res)
  //     this.ngOnInit();
  //     },(error)=>{
  //       console.log(error)
  //     });
  //   }
  // }

  showMore(){
    this.limit=this.temp;
  }

}
