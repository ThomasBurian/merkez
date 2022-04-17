import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsSliderCategoriesComponent } from './products-slider-categories.component';

describe('ProductsSliderCategoriesComponent', () => {
  let component: ProductsSliderCategoriesComponent;
  let fixture: ComponentFixture<ProductsSliderCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSliderCategoriesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsSliderCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
