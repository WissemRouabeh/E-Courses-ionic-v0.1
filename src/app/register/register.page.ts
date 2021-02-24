import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "./../authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  registerchk: FormGroup;
  response: String = "";
  users: any;
  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.registerchk = this.formBuilder.group({
      uname: ["", [Validators.required, Validators.minLength(3)]],
      mail: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(8)]],
      c_pwd: ["", [Validators.required, Validators.minLength(8)]],
    });
    this.auth.all().subscribe((res) => {
      this.users = res["hits"]["hits"];
    });
  }
  register() {
    this.response = "";
    if (
      !this.registerchk.get("mail").touched ||
      !this.registerchk.get("pwd").touched
    ) {
      this.response = "Empty inputs !";
    } else if (!this.registerchk.valid) {
      this.registerchk.get("mail").valid
        ? (this.response =
            "Make sure you wrote your username/password correctly!")
        : (this.response = "Make sure you wrote your email correctly!");
    } else if (!this.registerchk.valid) {
      this.registerchk.get("uname").valid
        ? (this.response = "Make sure you wrote your email/password correctly!")
        : (this.response = "Make sure you wrote your username correctly!");
    } else {
      let obj = {
        mail: this.registerchk.value.mail,
        uname: this.registerchk.value.uname,
        pwd: this.registerchk.value.pwd,
        c_pwd: this.registerchk.value.c_pwd,
      };
      if (obj.c_pwd == obj.pwd && this.auth.checkuserpwd2(obj, this.users)) {
        localStorage.setItem("mail", obj.mail);
        localStorage.setItem("username", obj.uname);
        localStorage.setItem("logged", "true");
        this.navCtrl.navigateRoot("/list");
      } else {
        this.response =
          "Error while Registring some of informations already used !";
      }
    }
  }
}
