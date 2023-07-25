import { HttpHeaders } from "@angular/common/http";

export function httpHeader() {

    const key = localStorage.getItem('JWT_TOKEN');

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${key}`
    });
    
    return headers;
}