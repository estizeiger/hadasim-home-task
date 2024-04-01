import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {map} from 'rxjs/operators';

import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private apiUrl = 'http://localhost:3000/api/members';

  private members: Member[] = [];
  private membersUpdated = new Subject<Member[]>();

  constructor(private http: HttpClient) {}

  // Fetch all members
  getMembers() {
    this.http
      .get<{ message: string, members: { firstName: any; lastName: any; tz: any; _id: any; city: any, street: any; houseNumber: any; phone: any; mobile: any; positiveResultDate: any; recoveryDate: any; vaccines: []}[]}>(
        this.apiUrl
      )
      .pipe(
        map((responseData)=>{
          return responseData.members.map((member)=> { 
            return { 
              firstName: member.firstName, 
              lastName: member.lastName, 
              tz: member.tz, 
              id: member._id,

              city: member.city,
              street: member.street, 
              houseNumber: member.houseNumber, 
              phone: member.phone,
              mobile: member.mobile,
              positiveResultDate: member.positiveResultDate?.split('T')[0], 
              recoveryDate: member.recoveryDate?.split('T')[0],

              vaccines: (member.vaccines as any)?.map(v => {
                return { vaccineDate: v.vaccineDate?.split('T')[0], manufacturer: v.manufacturer };
              })

            };})
        })
      )
      .subscribe(members => {
        this.members = members;
        this.membersUpdated.next([...this.members]);
      });
  }

  getMemberUpdateListener() : Observable<Member[]> {
    return this.membersUpdated.asObservable();
  }

  getMemberById(id: string) : Observable<Member>{
    const found = this.members.find(m=>m.id === id);
    if(found == undefined){
      this.http
      .get<{ message: string, member: Member}>(
        this.apiUrl
      )
      .subscribe(responseData=>{
        this.members.push(responseData.member);
        this.membersUpdated.next([...this.members]);
        return responseData.member;
      })
    }
    else{
      return of(found);
    }
  }

  // Add a new member
  addMember(member: Member) {
    this.http.post<{ message: string, id: string }>(this.apiUrl, member)
    .subscribe(responseData => {
      console.log(responseData.message);
      const id = responseData.id;
      member.id = id;
      this.members.push(member);
      this.membersUpdated.next([...this.members]);
    });
  }

  // Update an existing member
  updateMember(id: string, member: Partial<Member>) {
    const url = `${this.apiUrl}/${id}`;
    this.http.put<void>(url, member)
    .subscribe(()=>{
      const oldMemberIndex = this.members.findIndex(member=> member.id === id);
      const membersCloned = [...this.members];
      membersCloned[oldMemberIndex] = {
        ...membersCloned[oldMemberIndex],
        ...member
      };
      this.members = membersCloned;
      this.membersUpdated.next([...this.members]);
    });
  }

  // Delete a member by ID
  deleteMember(id: string){
    const url = `${this.apiUrl}/${id}`;
    this.http.delete<void>(url)
    .subscribe(()=>{
      this.members = this.members.filter(member=> member.id !== id);
      this.membersUpdated.next([...this.members]);
    });
  }
}
