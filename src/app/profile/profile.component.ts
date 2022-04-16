import { Component, OnInit, ViewChild } from '@angular/core';
import { pipe, switchMap, BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from 'src/assets/models/Profile.type';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private refreshToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  userName: any;
  profileData!: ProfileData;
  profileData$: any;
  repositories: any;
  repoNames: any = [];
  repoLanguages: any = [];
  pageIndex: number = 1;
  pageSize: number = 6;
  numberOfRepos!: number;

  constructor(private http: HttpClient) {
    this.userName = localStorage.getItem('userName');
    if (this.userName) {
      console.log;
      this.getUserPersonalInfo();
    }
  }

  ngOnInit(): void {}

  searchUser(event: any) {
    this.userName = event;
    console.log(event);
    this.getUserPersonalInfo();
  }

  getUserPersonalInfo() {
    this.http
      .get(`https://api.github.com/users/${this.userName}`)
      .subscribe((res: any) => {
        this.profileData = res;
        this.getRepositories();
      });
  }

  getRepositories() {
    this.http
      .get(` https://api.github.com/users/${this.userName}/repos`)
      .subscribe((res: any) => {
        this.numberOfRepos = res.length;
      });
    this.http
      .get(
        `https://api.github.com/users/${this.userName}/repos?page=${this.pageIndex}&per_page=${this.pageSize}`
      )
      .subscribe((res: any) => {
        this.repositories = res;
        for (var i in this.repositories) {
          this.repoNames.push(this.repositories[i].name);
        }
        console.log(this.repoNames);
        this.repoNames.map((repoName: String) => {
          this.http
            .get(
              `https://api.github.com/repos/${this.userName}/${repoName}/languages`
            )
            .subscribe((langs: any) => {
              this.repoLanguages.push(Object.keys(langs));
            });
        });
      });
  }

  pagination(event: PageEvent) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getRepositories();
    console.log(event);
  }
}
