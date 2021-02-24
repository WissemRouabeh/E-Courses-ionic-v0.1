import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-successoperation",
  templateUrl: "./successoperation.page.html",
  styleUrls: ["./successoperation.page.scss"],
})
export class SuccessoperationPage implements OnInit {
  ordernumber: String =
    "#" + Math.floor(Math.random() * Math.floor(1000)) * 10000;
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      this.navCtrl.navigateRoot("list");
    }, 3000);
  }
}
