import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule]  // Import FormsModule to support [(ngModel)]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test for empty string
  it('should return 0 for empty input', () => {
    component.input = '';
    component.calculate();
    expect(component.result).toBe(0);
  });

  // Test for single number
  it('should return 1 for input "1"', () => {
    component.input = '1';
    component.calculate();
    expect(component.result).toBe(1);
  });

  // Test for two numbers separated by newline
  it('should return 3 for input "1\\n2"', () => {
    component.input = '1\n2';
    component.calculate();
    expect(component.result).toBe(3);
  });

  // Test for two numbers separated by a comma
  it('should return 6 for input "1,2,3"', () => {
    component.input = '1,2,3';
    component.calculate();
    expect(component.result).toBe(6);
  });

  // Test for mixed newline and comma delimiter
  it('should return 6 for input "1\\n2,3"', () => {
    component.input = '1\n2,3';
    component.calculate();
    expect(component.result).toBe(6);
  });

  // Test for custom single character delimiter
  it('should return 3 for input "//;\\n1;2"', () => {
    component.input = '//;\n1;2';
    component.calculate();
    expect(component.result).toBe(3);
  });

  // Test for custom single character delimiter with multiple numbers
  it('should return 6 for input "//|\\n1|2|3"', () => {
    component.input = '//|\n1|2|3';
    component.calculate();
    expect(component.result).toBe(6);
  });

  // Test for custom multi-character delimiter
  it('should return 6 for input "//[***]\\n1***2***3"', () => {
    component.input = '//[***]\n1***2***3';
    component.calculate();
    expect(component.result).toBe(6);
  });

  // Test for negative numbers throwing an error
  it('should throw an error for negative numbers', () => {
    component.input = '1,-2,3';
    expect(() => component.calculate()).toThrowError('Negatives not allowed: -2');
  });
  
  it('should throw an error for multiple negative numbers', () => {
    component.input = '-1,-2,3';
    expect(() => component.calculate()).toThrowError('Negatives not allowed: -1, -2');
  });
  
  
  
});
