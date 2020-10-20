import { Injectable } from '@angular/core';

@Injectable()
export class DataSharingService {
    private _totalCartCount :number=0;
    get cartCount():number{
        return this._totalCartCount;
    }
    set cartCount(count:number)
    {
        this._totalCartCount = count; 
    }
}