import { TestBed } from '@angular/core/testing';

import { ContraseñaService } from './contraseña.service';

describe('ContraseñaService', () => {
  let service: ContraseñaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContraseñaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
