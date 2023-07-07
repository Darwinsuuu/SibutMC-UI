export interface EmployeeInsert {
    firstname: string;
    middlename?: string;
    lastname: string;
    position: string;
    username: string;
    password: string;
}

export interface EmployeeList {
    username: string;
    fullname: string;
    position: string;
    date_created: string;
    id: number;
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