export interface EmployeeInsert {
    firstname: string;
    middlename?: string;
    lastname: string;
    position: string;
}

export interface EmployeeList {
    fullname: string;
    position: string;
    date_created: string;
}

export interface EmployeeUpdate {
    id: string;
    firstname: string;
    middlename: string;
    lastname: string;
    position: string;
    username: string;
    password: string;
}