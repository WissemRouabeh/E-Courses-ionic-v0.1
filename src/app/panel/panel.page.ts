import { AlertController } from "@ionic/angular";
import { AuthenticationService } from "./../authentication.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.page.html",
  styleUrls: ["./panel.page.scss"],
})
export class PanelPage implements OnInit {
  response: String = "";
  changepwdform: FormGroup;
  usr_mail: String;
  users: any;
  alerttxt: String = "-danger d-none";
  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService,
    public alertCtrl: AlertController
  ) {
    this.auth.all().subscribe((res) => {
      this.users = res["hits"]["hits"];
    });
  }

  ngOnInit() {
    //grab usermail from localstorage
    this.usr_mail = localStorage.getItem("mail");
    this.changepwdform = this.formBuilder.group({
      old_pwd: ["", [Validators.required, Validators.minLength(1)]],
      new_pwd: ["", [Validators.required, Validators.minLength(8)]],
      confirm_pwd: ["", [Validators.required, Validators.minLength(8)]],
    });
  }
  change() {
    console.log(
      this.changepwdform.value.old_pwd + " " + this.changepwdform.value.new_pwd
    );
    this.response = "";
    if (
      !this.changepwdform.get("old_pwd").touched ||
      !this.changepwdform.get("new_pwd").touched ||
      !this.changepwdform.get("confirm_pwd").touched
    ) {
      this.response = "Error empty inputs !";
      this.alerttxt = "-danger -d-block";
    } else if (!this.changepwdform.valid) {
      this.response = "Password length should be greater than 8 chars";
      this.alerttxt = "-danger -d-block";
    } else if (
      this.changepwdform.value.new_pwd != this.changepwdform.value.confirm_pwd
    ) {
      this.response = "New password didn't match the confirm password !";
      this.alerttxt = "-danger -d-block";
    } else {
      if (
        this.auth.changeuserpwd(
          this.users,
          this.usr_mail,
          this.changepwdform.value.old_pwd,
          this.changepwdform.value.new_pwd
        )
      ) {
        let msg = "Password has been changed !";
        this.response = msg;
        this.alerttxt = "-success -d-block";

        //alertcntrl
        // this.showalert(msg, "Success");
      } else {
        this.response = "Old password didn't match your current password!";
        this.alerttxt = "-danger -d-block";
      }
    }
  }
  showalert(msg, type) {
    const alert = this.alertCtrl
      .create({
        header: type,
        message: msg,
        buttons: ["Ok!"],
      })
      .then((alert) => alert.present());
  }
}
