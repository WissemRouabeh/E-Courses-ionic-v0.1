import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MybasketPage } from './mybasket.page';

describe('MybasketPage', () => {
  let component: MybasketPage;
  let fixture: ComponentFixture<MybasketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybasketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MybasketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
