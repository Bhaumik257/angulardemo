import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { map} from 'rxjs/operators';

@Injectable()
export class GetDataFromBackEndService {
    
    
    apiPath ="http://productapi-env.eba-ctxriybs.us-east-2.elasticbeanstalk.com/product";
    private headersPost: any;
    constructor(private http: HttpClient) { 
        this.headersPost = new HttpHeaders({ 'Content-Type': 'application/json'});
    }

    getAllProduct():Observable<any> {

        return this.http.get(`${this.apiPath}/get/all`).pipe(map( res => res ))
    }
    // getAllProductById(id:number):Observable<any> {

    //     return this.http.get(this.apiPath+'/'+id ).pipe(map( res => res ))
    // }
    createproduct(partReceive: any): Observable<any> {
        return this.http.post(`${this.apiPath}/insert`, partReceive, { headers: this.headersPost,responseType: "text" }).pipe(map(res => res))
    }
    updateProduct( partReceive: any): Observable<any> {
        return this.http.put(`${this.apiPath}/update`, partReceive, { headers: this.headersPost,responseType: "text" }).pipe(map(res => res))
    }
    deleteProduct(id: number): Observable<any> {
        const options:any = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
            responseType: "text",
            body: { id: id,price:"00.00" }
          }
 
        return this.http.delete(`${this.apiPath}/delete`,options).pipe(map(res => res));
    }
}