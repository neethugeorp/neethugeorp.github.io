import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Post } from '../../post';
import { City } from '../../city';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  post: Post[]
  loaded: boolean = false
  p: number = 1
  headers = ["city","bank_name", "ifsc", "branch","bank_id","district", "state", "address"]
  cities : City[];
  columndefs : any[] = ["city","bank_name", "ifsc"];

  constructor(
    private dataService: DataService
  ) { 
    this.cities = [
      {id: 1, name: "MUMBAI"},
      {id: 2, name: "COCHIN"},
      {id: 3, name: "NEWDELHI"},
      {id: 4, name: "HYDERABAD"},
      {id: 5, name: "KOLKATA"}
    ]
  }

  ngOnInit() {
    this.dataService.getPosts("MUMBAI").subscribe(posts => {
      this.post = posts
      this.dataService.postsData = posts
      this.loaded = true
    });
  }
  onCitySelected(city:string){
    console.log("the selected value is " + city);
    this.dataService.getPosts(city).subscribe(posts => {
      this.post = posts
      this.dataService.postsData = posts
    });
  }
  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.dataService.searchOption.length > 0)
      this.post = this.dataService.filteredListOptions();
    else {
      this.post = this.dataService.postsData;
    }

    console.log(this.post)
  }

  applyFilter(filterValue) {
    // console.log(this.dataService.postsData)
    var filterValue = filterValue.toLowerCase();
    const filteredProducts = this.dataService.postsData.filter((filtered)=>{
      // console.log(filtered)
      var bank_name_filter = filtered.bank_name.toLowerCase().includes(filterValue);
      var state_filter = filtered.bank_name.toLowerCase().includes(filterValue);
      var ifsc_filter = filtered.bank_name.toLowerCase().includes(filterValue);
      var district_filter = filtered.district.toLowerCase().includes(filterValue);
      var city_filter = filtered.city.toLowerCase().includes(filterValue);
      var branch_filter = filtered.branch.toLowerCase().includes(filterValue);
      var address_filter = filtered.address.toLowerCase().includes(filterValue);
      var bank_id_filter = filtered.bank_id.toString().toLowerCase().includes(filterValue);
      // console.log(bank_name_filter)
      return ( bank_name_filter || state_filter || ifsc_filter || district_filter || city_filter || branch_filter || address_filter || bank_id_filter)
    })
    this.post = filteredProducts;
  }

}
