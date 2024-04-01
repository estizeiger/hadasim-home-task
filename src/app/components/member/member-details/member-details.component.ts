import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Member, defaultMember } from 'src/app/models/member.model';
import { Vaccine } from 'src/app/models/vaccine.model';
import { israeliIdValidator, minDateValidator, phoneNumberValidator } from 'src/app/services/form-utils';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit, OnDestroy {

  private mode = 'create';
  manufactuerers = ["Pfizer - BioNTech", "Moderna", "Johnson & Johnson", "AstraZeneca"]

  public memberForm: FormGroup;

  private id: string;
  member: Member;

  sub$: Subscription = new Subscription();

  constructor(public memberService: MemberService, 
    private formBuilder: FormBuilder,
    public route: ActivatedRoute) {
      
    }

    initForm(): void {
      console.log(this.member)
      this.memberForm = this.formBuilder.group({
        firstName: [this.member.firstName, Validators.required],
        lastName: [this.member.lastName, Validators.required],
        tz: [this.member.tz, Validators.required, israeliIdValidator],
        city: [this.member.city, Validators.required],
        street: [this.member.street, Validators.required],
        houseNumber: [this.member.houseNumber, Validators.required],
        phone: [this.member.phone, Validators.required],
        mobile: [this.member.mobile, Validators.required, phoneNumberValidator],
        positiveResultDate: [this.member.positiveResultDate, minDateValidator],
        recoveryDate: [this.member.recoveryDate, minDateValidator],
        vaccines: this.formBuilder.array([])
      });

      if (this.member && this.member.vaccines && this.member.vaccines.length > 0) {
        this.member.vaccines.forEach(vaccine => {
        this.addVaccineFormGroup(vaccine);
        });
      } 
    }

    // Function to add a vaccine FormGroup with pre-filled data
    addVaccineFormGroup(vaccine: Vaccine) {
      const vaccineFormGroup = this.formBuilder.group({
      vaccineDate: [vaccine.vaccineDate],
      manufacturer: [vaccine.manufacturer]
    });
    (this.memberForm.get('vaccines') as FormArray).push(vaccineFormGroup);
  }

    get vaccines(): FormArray {
      return this.memberForm.get('vaccines') as FormArray;
    }
  
    addVaccine(): void {
      if( this.vaccines.length >=4) {
        alert("Cannot add more than 4 vaccines");
        return;
      }
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
         this.sub$ =  this.memberService.getMemberById(this.id).subscribe(member=>{
          this.member = member;
          this.initForm();
        });
      }
      else {
        this.mode = 'create';
        this.id = '';
        this.member = defaultMember()
        this.initForm();
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
    } else {
      this.memberService.updateMember(this.id, memberData);
    }
    this.memberForm.reset({

    }, {
      onlySelf: true,
      emitEvent: false
    });

    alert("member was saved succesfully");
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
