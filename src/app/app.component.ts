import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],  // Import CommonModule for ngClass
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Unstop';  // Title of the application
  
  // 2D array representing the train coach layout
  coach = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42],
    [43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56],
    [57, 58, 59, 60, 61, 62, 63],
    [64, 65, 66, 67, 68, 69, 70],
    [71, 72, 73, 74, 75, 76, 77],
    [78, 79, 80]  // Last row has 3 seats
  ];

  bookedSeats: number[] = [];  // Array to store booked seats
  availableSeats: number[] = [];  // Array to store available seats

  constructor() {
    this.initializeAvailableSeats();  // Initialize available seats on component load
  }

  // Initialize available seats by iterating through the coach array
  initializeAvailableSeats() {
    for (let row of this.coach) {
      for (let seat of row) {
        if (this.bookedSeats.indexOf(seat) === -1) {
          this.availableSeats.push(seat);  // Add seat to available seats if not already booked
        }
      }
    }
  }

  // Function to handle seat booking
  bookSeats(seats: string): number[] {
    const numSeats = parseInt(seats, 10);  // Parse the input value here
  
    if (isNaN(numSeats) || numSeats < 1 || numSeats > 7) {
      alert("Please enter a valid number of seats between 1 and 7");
      return [];
    }
  
    const seatsToBook: number[] = [];
  
    // Try to find seats in a single row first
    for (let row of this.coach) {
      const availableInRow = row.filter(seat => this.availableSeats.indexOf(seat) !== -1);
  
      if (availableInRow.length >= numSeats) {
        seatsToBook.push(...availableInRow.slice(0, numSeats));  // Book the seats in the same row
        break;
      }
    }
  
    // If not enough seats in one row, book nearby seats
    if (seatsToBook.length < numSeats) {
      for (let seat of this.availableSeats) {
        if (seatsToBook.length < numSeats) {
          seatsToBook.push(seat);  // Book nearby seats
        } else {
          break;
        }
      }
    }
  
    // Update booked and available seats after booking
    this.bookedSeats.push(...seatsToBook);
    this.availableSeats = this.availableSeats.filter(seat => seatsToBook.indexOf(seat) === -1);
  
    return seatsToBook;  // Return the booked seats for display or further use
  }
  
}
