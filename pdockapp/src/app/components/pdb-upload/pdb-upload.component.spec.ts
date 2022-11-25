import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdbUploadComponent } from './pdb-upload.component';

describe('PdbUploadComponent', () => {
  let component: PdbUploadComponent;
  let fixture: ComponentFixture<PdbUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdbUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdbUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
