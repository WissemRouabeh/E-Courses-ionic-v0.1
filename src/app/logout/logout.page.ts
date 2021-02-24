import { NavController } from "@ionic/angular";
import { AuthenticationService } from "./../authentication.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.page.html",
  styleUrls: ["./logout.page.scss"],
})
export class LogoutPage implements OnInit {
  constructor(
    public auth: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.auth.signout();
    localStorage.setItem("logged", "false");
    setTimeout(() => {
      this.navCtrl.navigateRoot("list");
    }, 4000);
  }
}
