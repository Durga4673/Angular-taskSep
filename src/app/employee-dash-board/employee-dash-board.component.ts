import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { EmployeeService } from '../service/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  id: number;
  name: string;
  email: string;
  mobile: number;
  employeeActivateDate: string;
  employeeDOB: string;
  taskId: number;
  taskStartDate: string;
  taskEndDate: string;
}

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.scss']
})
export class EmployeeDashBoardComponent implements OnInit {


  valueDetails:any[]=[];


  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'employeeActivateDate', 'employeeDOB', 'taskId', 'taskStartDate','taskEndDate' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getEmployeeList();
  }

  constructor( private _dialog: MatDialog,
    private _empService: EmployeeService,
    private http: HttpClient,
     private _toastService: ToastService){}

  openEditForm(){
     const dialogRef = this._dialog.open(CreateEmployeeComponent);
     dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getEmployeeList();
        }
      }
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployeeList(){

    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
       error:(err) => {
        console.log(err);
       }
    })
  }

  deleteEmployee(id: number){
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._toastService.openSnackBar('employee deleted', 'done');
        this.getEmployeeList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  openEditEmpForm( data: any){
    const dialogRef = this._dialog.open(CreateEmployeeComponent, {
    data,
   });
   dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val){
        this.getEmployeeList();
      }
    },
   });
 }

}
