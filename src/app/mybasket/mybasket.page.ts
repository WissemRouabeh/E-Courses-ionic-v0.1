import { NavController } from "@ionic/angular";
import { BoughtService } from "./../bought.service";
import { BasketService } from "./../basket.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mybasket",
  templateUrl: "./mybasket.page.html",
  styleUrls: ["./mybasket.page.scss"],
})
export class MybasketPage implements OnInit {
  data = [];
  disabled = false;
  constructor(
    public basketsrv: BasketService,
    public bghtsrv: BoughtService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.basketsrv.all().subscribe((res) => {
      this.setdata(this.basketsrv.grab(res, localStorage.getItem("mail")));
    });
  }
  setdata(data) {
    this.data = data;
    if (this.data.length == 0) this.disabled = true;
    else this.disabled = false;
  }
  buy() {
    this.data.forEach((element) => {
      this.bghtsrv.add(element).subscribe((res) => {
        // let origin_id = this.basketsrv.grabid(element.id);
        // this.basketsrv.remove(origin_id).subscribe((res) => {
        //   console.log("Cleared basket");
        //   alert("Cleared basket");
        // });
        this.basketsrv.remove(element.id).subscribe((res) => {
          this.navCtrl.navigateRoot("successoperation");
        });
      });
    });
  }
}
