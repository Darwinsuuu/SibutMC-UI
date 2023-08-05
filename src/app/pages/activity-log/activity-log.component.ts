import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCheck, faXmark, faBell } from '@fortawesome/free-solid-svg-icons';
import { dummy } from './dummy';
import { ActivityLog } from 'src/app/_models/ActivityLog';
import { Title } from '@angular/platform-browser';
import { DashboardService } from 'src/app/_services/dashboard/dashboard.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent {

  pageTitle: string = "Activity Log";

  faCheck = faCheck;
  faXmark = faXmark;
  faBell = faBell;

  isLoading: boolean = true;
  activityLogList: ActivityLog[] = [];


  displayedColumns: string[] = ['name', 'description', 'created_by', 'date_created'];
  dataSource!: MatTableDataSource<ActivityLog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getActivityLog();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getActivityLog() {
    const response = await this.dashboardService.getActivityLog();
    this.activityLogList = response.result;
    this.dataSource = new MatTableDataSource(this.activityLogList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log(this.activityLogList)
    this.isLoading = false;
  }

}
