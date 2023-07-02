import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-signup-otp',
  templateUrl: './modal-signup-otp.component.html',
  styleUrls: ['./modal-signup-otp.component.scss']
})
export class ModalSignupOtpComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


  OTPCodes: string = "";
  showOTPCodeValidation: boolean = false;
  showSpinner: boolean = false;

  checkOTPCodes() {
    console.log(this.OTPCodes.length)
    if (this.OTPCodes.length == 6) {

      this.showSpinner = true;

      setTimeout(() => {                           
        this.showSpinner = false;
        
        if (this.OTPCodes == "123456") {
          this.showOTPCodeValidation = false;
        } else {
          this.showOTPCodeValidation = true;
        }

      }, 1200);
    }
  }


}
