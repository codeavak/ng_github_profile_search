import { IProfile } from "./../models/interfaces";
import { GithubService } from "./../services/github.service";
import { Component, OnInit } from "@angular/core";
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  p: number = 1;
  user: IProfile = {
    name: '',
    avatar_url: '',
    login: '',
    location: '',
    email: '',
    blog: '',
    membersince: new Date(),
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0
  }
  repos: any[];
  term:string='codeavak';
  logChange=(text)=>{   this.ghService.getProfile(text).subscribe(response => {
    console.log(response);
    this.user = {
      name: response.name,
      avatar_url: response.avatar_url,
      login: response.login,
      location: response.location,
      email: response.email ? response.email : '',
      blog: response.blog,
      membersince: response.created_at,
      public_repos: response.public_repos,
      public_gists: response.public_gists,
      followers: response.followers,
      following: response.following
    };
    this.ghService.getRepos(this.term).subscribe(response => { console.log(response); this.repos = response; });
  })}

  constructor(private ghService: GithubService) { }

  ngOnInit() {
    this.ghService.getProfile(this.term).subscribe(response => {
      console.log(response);
      this.user = {
        name: response.name,
        avatar_url: response.avatar_url,
        login: response.login,
        location: response.location,
        email: response.email ? response.email : '',
        blog: response.blog,
        membersince: response.created_at,
        public_repos: response.public_repos,
        public_gists: response.public_gists,
        followers: response.followers,
        following: response.following
      };
    });

    this.ghService.getRepos(this.term).subscribe(response => { console.log(response); this.repos = response; });
  }
}
