import { Component, OnInit } from '@angular/core';
import { pipe, switchMap, BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from 'src/assets/models/Profile.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userName: any;
  profileData!: ProfileData;
  private refreshToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  profileData$: any;
  repositories: any;
  repoNames: any = [];
  repoLanguages: any = [];

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
        console.log(res);
        this.profileData = res;
        this.getRepositories();
      });
  }

  getRepositories() {
    this.http
      .get(
        `https://api.github.com/users/${this.userName}/repos?page=1&per_page=6`
      )
      .subscribe((res: any) => {
        console.log(res);
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
              console.log(this.repoLanguages);
            });
        });
      });
  }
}
