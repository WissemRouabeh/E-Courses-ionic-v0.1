import { AuthenticationService } from "./../authentication.service";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-redirector",
  templateUrl: "./redirector.page.html",
  styleUrls: ["./redirector.page.scss"],
})
export class RedirectorPage implements OnInit {
  msg: String = "404 NOT FOUND..";
  constructor(
    public route: ActivatedRoute,
    public auth: AuthenticationService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params.id == "logout") {
      this.msg =
        "Logging out.. You've been visiting something created by Rouabeh WISSEM..";
      this.auth.signout();
      localStorage.setItem("logged", "false");
      setTimeout(() => {
        this.navCtrl.navigateRoot("list");
      }, 4000);
    } else if (this.route.snapshot.params.id == "success") {
      this.msg =
        "You have successfuly passed an order thank you for choosing us..";
      setTimeout(() => {
        this.navCtrl.navigateRoot("list");
      }, 2500);
    } else {
      setTimeout(() => {
        this.navCtrl.navigateRoot("list");
      }, 1000);
    }
    // tomycourses;
  }
}
