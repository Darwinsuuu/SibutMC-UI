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