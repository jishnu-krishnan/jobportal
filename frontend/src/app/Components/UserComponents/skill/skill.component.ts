import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  submitted= false;
  skillForm: FormGroup;
  found: String;
  constructor(
    public fb: FormBuilder,
    private authService : AuthService,
    private router: Router,
  ) { this.mainForm();}

  ngOnInit(): void {
  }

  mainForm(){
    this.skillForm = this.fb.group({
      qualification: ['',[Validators.required]],
      skillset: ['',[Validators.required]],
      expirence:['',[Validators.required]]
    })
  }

   get myForm(){
    return this.skillForm.controls;
  } 

  onSubmit(){
    this.submitted= true;
    const b= this.skillForm.value
    const user= JSON.parse(localStorage.getItem('user'))
     const data={
      qualification:b.qualification,
      skillset:b.skillset,
      expirence:b.expirence
     }
    
     if(!this.skillForm.valid){
      return false;
    } else {
      this.authService.updateSkill(JSON.stringify(data),user.id).subscribe(res => {
        console.log('skill',res)
        if(res.success){
          this.authService.updateUser(res.user);
          this.router.navigateByUrl('/users/dashboard')
        }else{
          this.found=res.msg
          this.router.navigateByUrl('/users/skill')
        }
      },(error)=> {
        console.log(error);
      });
    } 
  }


}
