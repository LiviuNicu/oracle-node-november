import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit {
  users: any = [];

  constructor(private mainService: MainService, private router: Router) {}

  ngOnInit() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.mainService.getAllUsers().subscribe((res: any) => {
      this.users = res.allUsers;
    });
  }

  goToTasksPage(id) {
    this.router.navigate(["tasks/" + id]);
  }
}
