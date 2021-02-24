import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RedirectorPage } from './redirector.page';

describe('RedirectorPage', () => {
  let component: RedirectorPage;
  let fixture: ComponentFixture<RedirectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RedirectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
