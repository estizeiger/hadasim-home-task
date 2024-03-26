import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member.model';
import { Subscription } from 'rxjs';

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
  }

  ngOnInit(): void {
    this.memberService.getMembers();
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
