import { beerDetails } from './../interfaces/beer-details';
import { GetBeerDetailsService } from './get-beer-details.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetBeerDetailsService]
})
export class AppComponent {
  title = 'app';

  beerDetails: beerDetails[] = [];
  filteredBeers: beerDetails[] = [];
  searchString: string = ''; // name of the beer to be searched
  styleArray: string[] = [];
  selectedFilters: checkBox[] = [];
  checkedList: string[] = [];
  public constructor(private getBeerDetailsService:GetBeerDetailsService){}

  ngOnInit(): void {
    this.getBeersDetails();
    
  }

  getBeersDetails(){
    this.getBeerDetailsService.getBeerBottles().subscribe(data => {
        this.beerDetails = data;
        this.beerStyleFilter();
    })
  }

  filterBeersForMe(event:any , filterByBeerType:string[]){
    if(filterByBeerType.length === 0){
    this.filteredBeers = this.beerDetails.filter( e => {
     if(e.name.toLowerCase().indexOf(this.searchString.trim()) > -1)
      return e;
     else{
       this.filteredBeers = [];
     }
    })
  }
  else
  {
    this.filteredBeers = [];
    filterByBeerType.forEach(e=>{
      this.beerDetails.filter(f=>{
        if(f.style === e)
        this.filteredBeers.push(f);
      })
    })

  }
  }

  beerStyleFilter(){
    this.beerDetails.forEach( e => {
      if(this.styleArray.indexOf(e.style) === -1){
      let a : checkBox = {
        'id' :  e.id,
        'value' : e.style
      }
      this.styleArray.push(e.style);
      this.selectedFilters.push(a);

    }
    })
    console.log('size',this.styleArray.length)
  }

  onCheckboxChange(option, event) {
    if(event.target.checked) {
      this.checkedList.push(option.value);
    } else {
      for(var i=0 ; i < this.checkedList.length; i++) {
        if(this.checkedList[i] === option.value){
          this.checkedList.splice(i,1);
        }
      }
    }
    this.filterBeersForMe('event',this.checkedList);// for filtering based on style
    console.log(this.checkedList);
  }

  sort(field: keyof beerDetails, order: string){
    
    console.log('order',order);
    if(this.filteredBeers.length === 0){
    this.beerDetails.sort((a,b)=>{
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    })
    if(order === 'desc')
    this.beerDetails.reverse();

    
  }
  else{
    this.filteredBeers.sort((a,b)=>{
      if(a[field] < b[field]) return -1;
      if(a[field] > b[field]) return 1;
      return 0;
    })
    if(order === 'desc')
    this.filteredBeers.reverse();
  }

  }
  
}

export interface checkBox{
  id: number,
  value: string
}
