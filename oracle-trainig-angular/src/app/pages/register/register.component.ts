import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public user: any = {};
  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {}

  doRegister() {
    this.mainService.register(this.user).subscribe((res: any) => {
      this.router.navigate(["/login"]);
    });
  }
}
