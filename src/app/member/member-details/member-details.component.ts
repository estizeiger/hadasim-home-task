import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { MemberService } from '../member.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Member, defaultMember } from '../member.model';
import { Vaccine } from '../vaccine.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {

  private mode = 'create';
  manufactuerers = ["Fizer", "X", "Y"]

  memberForm: FormGroup;

  private id: string;
  member: Member;

  constructor(public memberService: MemberService, 
    private formBuilder: FormBuilder,
    public route: ActivatedRoute) {
      this.initForm();
    }


    phoneNumberValidator(control:AbstractControl)  {
          const phoneRegex = /^05\d{8}$/
          const isValid = phoneRegex.test( control.value)
          return of(isValid ? null  :  {"invalidIsraeliPhone" : true})
    }


    minDateValidator(control:AbstractControl)  {
        if(!control.value) return of(null)
        const inputDate = new Date(control.value)
        return of(inputDate < new Date(Date.now() - 24 * 60 * 60 * 1000) ? null :  {"minDate" : true})
    }

    
    maxDateValidator(control:AbstractControl)  {
        if(!control.value) return of(null)
        const inputDate = new Date(control.value)
        return of(inputDate > new Date(Date.now() - 24 * 60 * 60 * 1000) ? null :  {"maxDate" : true})
    }

    initForm(): void {
      this.memberForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        tz: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        phone: ['', Validators.required],
        mobile: ['', Validators.required, this.phoneNumberValidator],
        positiveResultDate: ['', this.minDateValidator],
        recoveryDate: ['', this.minDateValidator],
        vaccines: this.formBuilder.array([])
      });
    }

    get vaccines(): FormArray {
      return this.memberForm.get('vaccines') as FormArray;
    }
  
    addVaccine(): void {
      if( this.vaccines.length >=4) return
      this.vaccines.push(this.formBuilder.group({
        vaccineDate: [''],
        manufacturer: ['']
      }));
    }

    removeVaccine(index: number): void {
      this.vaccines.removeAt(index);
    }

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
        this.member = defaultMember()
      }
    });
  }

  onSaveMember(e: any) {
    e.preventDefault()

    if (this.memberForm.invalid) {
      console.log("form is invalid")
      return;
    } 
    const memberData: Member = this.memberForm.value;

    console.log(memberData)
    if(this.mode === 'create'){
      this.memberService.addMember(memberData);
      // this.memberService.addMember(form.value.firstName, form.value.lastName, form.value.tz, form.value.city, form.value.street, form.value.houseNumber, form.value.phone, form.value.mobile, form.value.positiveResultDate, form.value.recoveryDate);

    } else {
      this.memberService.updateMember(this.id, memberData);
      // this.memberService.updateMember(this.id, form.value.firstName, form.value.lastName, form.value.tz, form.value.city, form.value.street, form.value.houseNumber, form.value.phone, form.value.mobile, form.value.positiveResultDate, form.value.recoveryDate);

    }
    this.memberForm.reset({

    }, {
      onlySelf: true,
      emitEvent: false
    });
  }

}
