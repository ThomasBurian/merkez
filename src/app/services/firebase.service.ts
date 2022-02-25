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
