export interface UserLogin {
    username: string;
    password: string;
}

export interface NewUserAccount {
    personalInfo: {
        firstname: string,
        middlename: string,
        lastname: string,
        gender: string,
        birthdate: Date,
        marital_status: string,
    },
    contactInfo: {
        contact_no: string,
        email: string,
        address: string,
    },
    emergencyContactInfo: {
        fullname: string,
        emergency_contact_no: string,
    },
    accountInfo: {
        username: string,
        password: string
    }
}


export interface FetchUserAccountInfo {
    personalInfo: {
        id: number;
        firstname: string,
        middlename: string,
        lastname: string,
        marital_status: string,
        gender: string,
        birthdate: Date,
        contact_no: string,
        email: string,
        address: string,
    },
    emergencyContactInfo: {
        id: number;
        contact_fullname: string,
        emergency_contact_no: string,
    },
    accountInfo: {
        user_id: number;
        username: string,
        password: string
    }
}

export interface UpdatePersonalInfo {
    user_id: string;
    firstname: string,
    middlename: string,
    lastname: string,
    marital_status: string,
    gender: string,
    birthdate: Date,
}