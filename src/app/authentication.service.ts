import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  header: HttpHeaders;
  users: any;
  constructor(public http: HttpClient) {}
  all() {
    let url = "/accounts/acc/_search/?size=1000";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
  }
  signin(u) {
    let url = "/logged/acc/accid";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    u.found = true;
    return this.http.post(url, u, { headers: this.header });
  }
  signed() {
    let url = "/logged/acc/accid";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
    // .subscribe((res) => {
    //   return JSON.stringify(res["_source"].found);
    // });
  }
  signout() {
    let url = "/logged/acc/accid";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    this.http
      .post(url, { found: false }, { headers: this.header })
      .subscribe((res) => {});
  }
  checksigned() {
    this.signed().subscribe((res) => {
      return res["_source"].found; //for check if there's user logged
    });
  }
  checkuserpwd(obj, users) {
    this.signed().subscribe((res) => {
      // alert(JSON.stringify(res["_source"])); //for get usr logged
      // alert(res["_source"].found); //for check if there's user logged
    });
    for (let u of users) {
      if (u._source.mail == obj.mail) {
        if (u._source.pwd == obj.pwd) {
          this.signin(u._source).subscribe((res) => {});
          localStorage.setItem("username", u._source.uname);
          localStorage.setItem("mail", u._source.mail);
          localStorage.setItem("logged", "true");
          return true;
        } else {
          return false;
        }
      }
    }
  }
  changeuserpwd(users, u, oldpwd, newpwd) {
    for (let user of users) {
      if (user._source.mail == u) {
        if (user._source.pwd == oldpwd) {
          let url = "/accounts/acc/" + user._id;
          this.header = new HttpHeaders();
          this.header.append("Content-type", "application/json");
          user._source.pwd = newpwd;
          user._source.c_pwd = newpwd;
          this.http
            .post(url, user._source, { headers: this.header })
            .subscribe((res) => {});
          return true;
        }
      }
    }
    return false;
  }

  register(u) {
    let url = "/accounts/acc/";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.post(url, u, { headers: this.header });
  }
  checkuserpwd2(obj, users) {
    for (let u of users) {
      if (u._source.mail != obj.mail) {
        if (u._source.uname != obj.uname) {
          this.register(obj).subscribe((res) => {
            alert("registred !");
          });
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
