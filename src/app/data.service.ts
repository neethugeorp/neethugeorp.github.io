import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  searchOption=[]
  public postsData: Post[]
  postUrl : string = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI"; 

  constructor(
    public http: HttpClient
  ) { }


  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(this.postUrl);
    
  }

  filteredListOptions() {
    let posts = this.postsData;
        let filteredPostsList = [];
        for (let post of posts) {
            for (let options of this.searchOption) {
                if (options.bank_name === post.bank_name) {
                  filteredPostsList.push(post);
                }
                
            }
        }
        console.log(filteredPostsList);
        return filteredPostsList;
  }
}
