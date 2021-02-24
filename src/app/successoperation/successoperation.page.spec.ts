import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessoperationPage } from './successoperation.page';

describe('SuccessoperationPage', () => {
  let component: SuccessoperationPage;
  let fixture: ComponentFixture<SuccessoperationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessoperationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessoperationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
