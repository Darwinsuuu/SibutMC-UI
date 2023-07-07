export interface appointments {
    id: number;
    patientId: number; 
    patientFullname: string;
    appointed_time: string;
    appointed_date: string;
    decline_reason: string,
    medical_reason: string;
    statusName: string;
    status: number;
    date_created: string;
}