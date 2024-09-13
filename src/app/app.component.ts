import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'string-calculator';
  input: string = '';
  result: number | string = '';
  errorMessage: string = '';
  calculate() {
    try {

      this.errorMessage = '';

      console.log("Raw Input Value:", this.input);


      let formattedInput = this.input.replace(/\\n/g, '\n');
      let delimiterRegex = /[\n,]/;

      if (formattedInput.startsWith('//')) {
        const delimiterSection = formattedInput.match(/^\/\/\[(.*?)\]\n/);
        
        if (delimiterSection) {
          const customDelimiter = delimiterSection[1];
          delimiterRegex = new RegExp(`[\\n,${customDelimiter}]`);
          formattedInput = formattedInput.split('\n').slice(1).join('\n');
        } else {
          
          const singleDelimiterSection = formattedInput.match(/^\/\/(.)\n/);
          if (singleDelimiterSection) {
            const customDelimiter = singleDelimiterSection[1];
            delimiterRegex = new RegExp(`[\\n,${customDelimiter}]`);
            formattedInput = formattedInput.split('\n').slice(1).join('\n');
          }
        }
      }

      console.log("Formatted Input:", formattedInput);

      
      const numbers = formattedInput.split(delimiterRegex).map(num => num.trim()).filter(num => num.length > 0);

      console.log("Split Numbers:", numbers);


      const negativeNumbers = numbers.filter(num => parseFloat(num) < 0);
      if (negativeNumbers.length > 0) {
        throw new Error(`negative numbers not allowed: ${negativeNumbers.join(', ')}`);
      }

     
      numbers.forEach(num => console.log("Number:", num));


      const sum = numbers.reduce((acc, num) => acc + parseFloat(num), 0);
      this.result = sum;

      console.log("Result:", this.result);

    } catch (error) {
      this.errorMessage = (error as Error).message;
      this.result = '';
    }
  }
}
