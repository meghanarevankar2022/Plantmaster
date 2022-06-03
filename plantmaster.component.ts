import { Component, OnInit, ViewChild } from '@angular/core';
import { plantmodel} from '../plantmodel';
import { PlantService } from './plantmaster.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-plantmaster',
  templateUrl: './plantmaster.component.html',
  styleUrls: ['./plantmaster.component.css']
})
export class PlantmasterComponent implements OnInit {
  
  plantmodel:plantmodel[];
  plant: plantmodel = new plantmodel();

  /* status:Status=new Status();   */
  
 constructor(private plantservice:PlantService,
  private router: Router){}

  displayedColumns = ['plantid','plantname','plantshortdesc','actived','archived','deleted','action',/* 'companyname' */];
  dataSource!:MatTableDataSource<plantmodel>;
  PlantForm: FormGroup;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
    
  }

  apiResponse:any = [];
  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;


 ngOnInit(): void {
   this.plantservice.getPlantList().subscribe((response:any) =>{
    this.apiResponse = response;
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
    this.getPlant();
   })
  }
onChange($event:any){
  let filteredData = _.filter(this.apiResponse,(item) =>{
    return item.plantname.toLowerCase() ==  $event.value.toLowerCase();
  })
  this.dataSource = new MatTableDataSource(filteredData);
  
}

private getPlant(){
 this.plantservice.getPlantList().subscribe(data =>{ 
   this.plantmodel=data;
   
 });
}
updatePlants(plantid: number){
  this.router.navigate(['updateplant',plantid]);
}


savePlant(){
  this.plantservice. createPlant(this.plant).subscribe((data) =>{
    console.log(data);
    console.log(this.plant);
    this.goToPlantList();
    this.router.navigate(['addplant']);
  });
  error => console.log(error);
}

/*   deletePLANT(plantid: number) {
  this.plantmodel = this.plantmodel.filter((_plant, index) => index !== plantid);
  console.log(this.plant);
}   */
goToPlantList(){
  this.router.navigate(['/plant']);
}
 deleteplant(plantid: number){
  this.plantservice.deletePlant(plantid,this.plant).subscribe( data => {
    console.log(data);
    this.getPlant();
    console.log(this.plant);
  })
} 

/* addRow() {
  const newRow = {

    Plantid:this.plant.plantid=2,
    Plantname:this.plant.plantname='',
    Plantshortdesc: this.plant.plantshortdesc='',
    Active:this.plant.status.actived=true,
    Archived:this.plant.status.archived=false,
    Deleted:this.plant.status.deleted=false,
  };
/*   this.plantmodel = [newRow, ...this.plantmodel]; */

onSubmit(){
  console.log(this.plant);
  /*  console.log(this.status);  */
  this.savePlant();
}
}
