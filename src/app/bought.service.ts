import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BoughtService {
  header: HttpHeaders;
  constructor(public http: HttpClient) {}
  add(course) {
    let url = "/bought/list/";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.post(url, course, { headers: this.header });
  }
  all() {
    let url = "/bought/list/_search/?size=1000";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
  }
  grab(data, uname) {
    let filtred = [];
    data["hits"]["hits"].forEach((element) => {
      element._source.mailbasket == uname && filtred.push(element._source);
    });
    return filtred;
  }
}
