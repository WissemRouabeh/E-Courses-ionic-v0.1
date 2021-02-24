import { NavController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  loginchk: FormGroup;
  response: String = "";
  users: any;
  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    console.log(localStorage.getItem("logged"));
    //check if is logged goto list page else sign in page
    if (localStorage.getItem("logged") == "true")
      this.navCtrl.navigateRoot("list");

    this.loginchk = this.formBuilder.group({
      mail: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(8)]],
    });
    this.auth.all().subscribe((res) => {
      this.users = res["hits"]["hits"];
    });
  }
  login() {
    this.response = "";
    if (
      !this.loginchk.get("mail").touched ||
      !this.loginchk.get("pwd").touched
    ) {
      this.response = "Empty mail or(and) password!";
    } else if (!this.loginchk.valid) {
      this.loginchk.get("mail").valid
        ? (this.response = "Make sure you wrote your password correctly!")
        : (this.response = "Make sure you wrote your email correctly!");
    } else {
      let obj = {
        mail: this.loginchk.value.mail,
        pwd: this.loginchk.value.pwd,
      };

      if (this.auth.checkuserpwd(obj, this.users)) {
        this.navCtrl.navigateRoot("/list");
      } else {
        this.response = "Error while logging in with this informations";
      }
    }
  }
}
