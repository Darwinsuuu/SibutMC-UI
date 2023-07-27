import {AfterViewInit, Component, ViewChild, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { staffList } from './dummy';
import { EmployeeList } from 'src/app/_models/EmployeeModel';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { ModalArchiveEmployeeComponent } from '../../modal/modal-archive-employee/modal-archive-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalEditEmployeeComponent } from '../../modal/modal-edit-employee/modal-edit-employee.component';
import { EmployeeService } from 'src/app/_services/employee/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})

export class ManageEmployeeComponent implements AfterViewInit, OnInit, OnChanges {

  faPencil = faPencil;
  faTrashCan = faTrashCan;

  displayedColumns: string[] = ['fullname', 'position', 'action'];
  dataSource!: MatTableDataSource<EmployeeList>;

  @Input() employeeList: any[] = [];
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,  
              private snackBar: MatSnackBar,
              private employeeService: EmployeeService) {
                setTimeout(() => {
                  this.dataSource = new MatTableDataSource(this.employeeList);
                }, 1000);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.dataSource && this.employeeList && this.employeeList.length > 0) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employeeList'] && !changes['employeeList'].firstChange) {
      // Update dataSource when appointmentList changes
      setTimeout(() => {
        this.dataSource.data = this.employeeList;
      }, 1000);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openArchiveEmployee(employeeInfo: any) {

    let fullname = employeeInfo.firstname;

    this.dialog.open(ModalArchiveEmployeeComponent, {
      data: { employeeFullname: fullname.toUpperCase() }
    }).afterClosed().subscribe((res: boolean) => {

      if(res) {
        // api call here
        this.employeeService.deleteEmployee(employeeInfo.id);
        this.getEmployees();

        this.snackBar.open("Account was successfully archived!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: "danger-snackbar"
        });
      } else {
        
      }
    })
  }


  async getEmployees() {
  
    const response = await this.employeeService.getAllEmployees();
    
    if(response.success) {
      this.employeeList = response.result
      this.dataSource.data = this.employeeList;
    }

  }


  openEditEmployee(employeeInfo: any) {

    this.dialog.open(ModalEditEmployeeComponent, {
      data: { credentials: employeeInfo },
      height: "fit-content",
      maxHeight: "calc(100vh - 10px)"
    }).afterClosed().subscribe((res: any) => {
      if(res) {
        // api call here
        this.getEmployees();

        this.snackBar.open("Successfully updated!", "", {
          duration: 3000,
          verticalPosition: "top",
          panelClass: "success-snackbar"
        })
      }
    })

  }
}