import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MainService } from "src/app/services/main.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})
export class TasksComponent implements OnInit {
  id: any;
  tasks: any;
  search: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((param) => {
      this.id = param.id;
    });

    this.getAllTasksForUser();
  }

  getAllTasksForUser() {
    this.mainService
      .getAllTasksForUser(this.id, "")
      .subscribe((response: any) => {
        this.tasks = response.allTasks;
      });
  }

  update(task) {
    this.mainService.updateTask(task).subscribe((res) => {
      this.getAllTasksForUser();
    });
  }
  remove(task) {
    this.mainService.deleteTask(task).subscribe((res) => {
      this.getAllTasksForUser();
    });
  }
  doSearch() {
    this.mainService
      .getAllTasksForUser(this.id, this.search)
      .subscribe((response: any) => {
        this.tasks = response.allTasks;
      });
  }
}
