import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';

const routes: Routes = [
  { path: '', component: MemberListComponent },
  { path: 'create', component: MemberDetailsComponent },
  { path: 'edit/:id', component: MemberDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
