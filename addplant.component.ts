import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantService } from '../plantmaster/plantmaster.service';
import { plantmodel} from '../plantmodel';


@Component({
  selector: 'app-addplant',
  templateUrl: './addplant.component.html',
  styleUrls: ['./addplant.component.css']
})
export class AddplantComponent implements OnInit {
    plant: plantmodel = new plantmodel(); 
   /*   status: Status = new Status();    */
   
  constructor(private plantService: PlantService,
    private router: Router) { }

  ngOnInit(): void {
  }
  savePlant(){
    this.plantService. createPlant(this.plant).subscribe((data) =>{
      console.log(data);
      this.goToPlantList();
    });
    error => console.log(error);
  }

  goToPlantList(){
    this.router.navigate(['/plant']);
  }
  
  onSubmit(){
    console.log(this.plant);
   /*   console.log(this.status);  */
    this.savePlant();
  }
}
