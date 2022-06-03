/* import { companymodel } from "./company-manager/companymodel"; */

/*   class Status
{
    actived:boolean=true;
    deleted:boolean=false;
    archived:boolean=false;    
        }  
 */
   export class plantmodel
{
    plantid:number;
    plantname:string;
    plantshortdesc:string;
    status:{
        actived:boolean;
        deleted:boolean;
        archived:boolean;  
    };

}
         
