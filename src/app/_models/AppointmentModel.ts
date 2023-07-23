import { Time } from "@angular/common";

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

export interface NewAppointment {
    userId: string,
    appointment_date: Date,
    medical_reason: string,
    medical_description: string,
}


export interface GetAllAppointmentLists {
    appointment_id: number;
    patient_fullname: string;
    appointed_date: Date;
    appointed_time: string | null;
    status: number;
    status_name: string;
    decline_reason: string;
    appointment_records_date_created: string;
    medical_id: number;
    medical_reason: string;
    medical_description: string;
    diagnosis: string;
    physician: string;
    medical_records_date_created: Date;
}