import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MemberService } from '../member.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Member } from '../member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {

  firstName = "";
  lastName = "";
  tz = "";
  private mode = 'create';
  private id: string;
  member: Member;

  constructor(public memberService: MemberService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.member = this.memberService.getMemberById(this.id);
      }
      else {
        this.mode = 'create';
        this.id = '';
      }
    });
  }

  onSaveMember(form: NgForm) {
    if (form.invalid) {
      console.log("form is invalid")
      return;
    }
    if(this.mode === 'create'){
      this.memberService.addMember(form.value.firstName, form.value.lastName, form.value.tz);
    } else {
      this.memberService.updateMember(this.id, form.value.firstName, form.value.lastName, form.value.tz)
    }
    form.resetForm();
  }
}
