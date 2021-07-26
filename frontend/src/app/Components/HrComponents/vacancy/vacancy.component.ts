import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { __param } from 'tslib';


@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.css']
})
export class VacancyComponent implements OnInit {
  submitted= false;
  vacancyForm: FormGroup;
  found: String;
  public Editor = ClassicEditor;
  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { this.mainForm(); }

  ngOnInit(): void {
  }

  mainForm(){
    this.vacancyForm = this.fb.group({
      qualification: ['',[Validators.required]],
      title: ['',[Validators.required]],
      skillset: ['',[Validators.required]],
      body: ['',[Validators.required]],
      expirence:['',[Validators.required]],
      vacancies:[''],
      package:['']
    })
  }

   get myForm(){
    return this.vacancyForm.controls;
  } 

  onSubmit(){
    this.submitted= true;
    const b= this.vacancyForm.value
    const user= JSON.parse(localStorage.getItem('user'))
     const data={
      qualification:b.qualification,
      title:b.title,
      skillset:b.skillset,
      description:b.body,
      company:user.id,
      package:b.package,
      vacancies:b.vacancies,
      expirence:b.expirence
    }
    console.log('data',data);
    
     if(!this.vacancyForm.valid){
      return false;
    } else {
      this.authService.createNewVacancy(JSON.stringify(data)).subscribe(res => {
        console.log(res)
        if(res.success){
          this.router.navigateByUrl('/hr/dashboard')
        }else{
          this.found=res.msg
          this.router.navigateByUrl('/hr/vacancy')
        }
      },(error)=> {
        console.log(error);
      });
    } 
  }

}
