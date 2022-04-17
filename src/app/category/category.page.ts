import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Category } from '../models/category.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  category
  
  constructor(private route: ActivatedRoute, 
    private fbService: FirebaseService ) { }

  ngOnInit() {
    this.category = this.route.snapshot.queryParamMap.get('category');
  }

}
