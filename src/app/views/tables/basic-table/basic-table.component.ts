import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/localdataservice/localsession';
import { GetDataFromBackEndService } from 'src/app/servces/fetchingService';
import { DataSharingService } from 'src/app/servces/shareData';
import {Roles} from '../../../user/user'
@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss'],
  providers:[GetDataFromBackEndService]
})
export class BasicTableComponent implements OnInit {
  allProductList:any=[];
  public readonly Roles = Roles;
  constructor(public dataSharingService:DataSharingService,
    public getDataFromBackEndService:GetDataFromBackEndService,
    public sessionService: SessionService
    ) { this.category = ''; }
  id:number=-1; itemId:any=''; category:any=''; productName:any=''; price:any=''; addedToCart:boolean=false;
  productDescription='';
  buttonName = 'Add Your Product';
  currentthis = this;
  ngOnInit() {
    this.fetchAllProducr();
    this.category = '';

  }

  fetchAllProducr()
  {
    this.getDataFromBackEndService.getAllProduct().subscribe(data=>{
      this.allProductList = data;
    })
  }
  saveUpdateProduct():void {
    if(this.id >= 0)
    {
      this.getDataFromBackEndService.updateProduct({ id:this.id ,itemId:this.itemId,category:this.category,productName:this.productName,price:this.price,productDescription:this.productDescription }).subscribe(()=>{
        this.fetchAllProducr();
        this.resetModel()
      })
    }
    else
    {
      this.getDataFromBackEndService.createproduct({ id:0 ,itemId:this.itemId,category:this.category,productName:this.productName,price:this.price,productDescription:this.productDescription }).subscribe(()=>{
        this.fetchAllProducr();
        this.resetModel();
      })
    }
      
  }

  editProduct(id:number):void {
    let product = this.allProductList.find((x:any)=>x.id === id);
    this.id = product.id;
    this.itemId =product.itemId;
    this.category = product.category;
    this.productName = product.productName;
    this.productDescription = product.productDescription;
    this.price = product.price;

  }
  
  deleteProduct(id:number):void {
    let thiss = this;
    this.getDataFromBackEndService.deleteProduct(id).subscribe((data)=>{
      console.log(data);
      thiss.fetchAllProducr();
    })
  }
  
  resetModel():void {
    this.id = -1;
    this.itemId ='';
    this.category = '';
    this.productName='';
    this.price='';
    this.addedToCart = false;
    this.productDescription ='';
    this.buttonName ='Add Your Product';
  }
}

