import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ToastService } from '../toast/toast.service';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {


  empForm: FormGroup;

  constructor(private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
    this.empForm = this._fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      employeeActivateDate:['', Validators.required],
      employeeDOB:['', Validators.required],
      taskId:['', Validators.required],
      taskStartDate:['', Validators.required],
      taskEndDate:['', Validators.required],
    })
  }
  ngOnInit(): void {
   this.empForm.patchValue(this.data);

  }

  onFormSubmit(){
    if(this.empForm.valid){
    if(this.data){
      // console.log(this.empForm.value);
      localStorage.setItem('EmployeeDeatils', JSON.stringify(this.empForm.value));
      this._empService.updateEmployee(this.data.id ,this.empForm.value).subscribe({
        next: (val: any) => {
          this._toastService.openSnackBar('Employee updated Successfully', 'done');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err)
        },
      })
    }
    else{
      // console.log(this.empForm.value);
      localStorage.setItem('EmployeeDeatils', JSON.stringify(this.empForm.value));
      this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          this._toastService.openSnackBar('Employee Added Successfully', 'done');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err)
        },
      })
    }
    }
  }

}
