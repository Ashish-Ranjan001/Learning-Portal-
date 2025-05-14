import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-quiz-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent implements OnInit {
  @Input() quizData: Quiz = {};
  @Output() formDataChange = new EventEmitter<Quiz>();

  quizFile?: File;
  fileName: string = 'No file chosen';
  error: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.quizData.quizFile) {
      this.quizFile = this.quizData.quizFile;
      this.fileName = this.quizFile.name;
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      if (this.validateFile(file)) {
        this.quizFile = file;
        this.fileName = file.name;
        this.error = '';
        
        this.updateQuizData();
      }
    }
  }

  validateFile(file: File): boolean {
    // Check if it's a CSV file
    if (!file.name.toLowerCase().endsWith('.csv')) {
      this.error = 'Please upload a CSV file';
      return false;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.error = 'File size should be less than 5MB';
      return false;
    }
    
    return true;
  }

  updateQuizData(): void {
    this.quizData = {
      ...this.quizData,
      quizFile: this.quizFile
    };
    
    this.formDataChange.emit(this.quizData);
  }

  // This function would parse the CSV file and create quiz questions
  // For now it's commented out as we're not implementing backend functionality
  /*
  parseCSV(file: File): void {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result as string;
      const lines = csvData.split('\n');
      
      // Skip header row
      const questions = [];
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const columns = lines[i].split(',');
        
        if (columns.length >= 6) {
          const question = {
            question: columns[0],
            options: [columns[1], columns[2], columns[3], columns[4]],
            correctAnswer: parseInt(columns[5]) - 1
          };
          
          questions.push(question);
        }
      }
      
      this.quizData.questions = questions;
      this.formDataChange.emit(this.quizData);
    };
    
    reader.onerror = () => {
      this.error = 'Error reading file';
    };
  }
  */
}