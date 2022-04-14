import { Component, OnInit } from '@angular/core';
import { pipe,switchMap,BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileData } from 'src/assets/models/Profile.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileData!: ProfileData;
  private refreshToken: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  profileData$: any;

  constructor(
    private http: HttpClient
  ) {
    this.profileData$ = this.refreshToken.pipe(
      switchMap(() => this.http.get(`https://api.github.com/users/arip995`).pipe(
        tap((res:any)=>{
          this.profileData = res;
        })
      ))
    )
  }

  ngOnInit(): void {
  }

}
