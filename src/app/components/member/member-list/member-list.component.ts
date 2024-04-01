import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  private membersSub: Subscription;
  
  memberCountsByYear: any;
  memberDataLoaded: boolean = false;

  constructor(private memberService: MemberService) {
    this.membersSub = this.memberService.getMemberUpdateListener()
    .subscribe((members: Member[])=>{
      debugger;
      this.members = members;
      console.log(this.members);
      this.createMemberCountsByYear();
      }
    );
  }

  ngOnInit(): void {
    this.memberService.getMembers();
  }

  onDelete(id: string){
    this.memberService.deleteMember(id);
  }

  ngOnDestroy() {
    this.membersSub.unsubscribe();
  }

  createMemberCountsByYear(){
    debugger;
    const memberYears = this.members.map(member => new Date(member.positiveResultDate).getFullYear());
    const memberCountsByYear = {};
    memberYears.forEach(year => {
        if(year){
          memberCountsByYear[year] = (memberCountsByYear[year] || 0) + 1;
        }
    });
    this.memberCountsByYear = memberCountsByYear;
    this.memberDataLoaded = true;
  }
}
