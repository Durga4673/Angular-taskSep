import { IEmployeeDetails } from '../InterfaceData/employeeDetails';

export class EmployeDataComponent {

  IEmployeeDetails: IEmployeeDetails = [
    {
      Id: 1,
      Name: 'Suraj',
      EmaiL: 'suraj@gmail.com',
      Mobile: 72086786747,
      EmployeeActivateDate: new Date(2022, 0, 1),
      EmployeeDOB: new Date(1995, 1, 26),
      TaskId: 1291,
      TaskStartDate: new Date(2023, 1, 12),
      TaskEndDate: new Date(2023, 1, 18),
    },
  ];
}
