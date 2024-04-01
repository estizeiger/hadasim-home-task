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

  constructor(private memberService: MemberService) {
    this.membersSub = this.memberService.getMemberUpdateListener()
    .subscribe((members: Member[])=>{this.members = members;}
    );

    // this.membersSub = this.memberService.getMembers()
    // .subscribe((members: Member[])=>{this.members = members;})
  }

  ngOnInit(): void {
    this.memberService.getMembers();

    // this.membersSub = this.memberService.getMembers()
    // .subscribe((members: Member[])=>{this.members = members;})
  }

  onDelete(id: string){
    this.memberService.deleteMember(id);
  }

  onEdit(id: string){
    
  }

  ngOnDestroy() {
    this.membersSub.unsubscribe();
  }
}
