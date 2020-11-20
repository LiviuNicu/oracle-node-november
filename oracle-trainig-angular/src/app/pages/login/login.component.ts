import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public user: any = {};
  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {}

  doLogin() {
    this.mainService.login(this.user).subscribe((res: any) => {
      this.router.navigate(["/users"]);
    });
  }
}
