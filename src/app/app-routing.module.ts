import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashBoardComponent } from './employee-dash-board/employee-dash-board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'employee-dash-board',
    pathMatch: 'full',
  },

  { path: 'employee-dash-board',
   component: EmployeeDashBoardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
