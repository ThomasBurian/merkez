import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Slider } from '../models/slider.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: Firestore) { }

  /**how to retriev a document */
  /*getProductsByCategory(categoryId): Observable<Product[]> {
    const prdsRef = doc(this.firestore,'products/' + categoryId)
    return docData(prdsRef) as Observable<Product[]>;
  }*/

  getProductsByCategory(categoryId): Observable<Product[]> {
    const products = collection(this.firestore,
                                'categories/' + categoryId + '/products')
    return collectionData(products) as Observable<Product[]>;
  }

  getProducts(): Observable<Product[]> {
    const prdsRef = collection(this.firestore, 'products');
    return collectionData(prdsRef) as Observable<Product[]>;
  }

  getCategories(): Observable<Category[]> {
    const catRef = collection(this.firestore, 'categories');
    return collectionData(catRef) as Observable<Category[]>;
  }

  getSlider(): Observable<Slider[]> {
    const sRef = collection(this.firestore, 'welcomeSlider');
    return collectionData(sRef) as Observable<Slider[]>;
  }
}
