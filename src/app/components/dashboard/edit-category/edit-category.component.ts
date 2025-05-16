import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseServicesService } from '../../../services/courses/course-services.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private courseService: CourseServicesService, private router: Router) {
    this.categoryForm = this.fb.group({
      name: [''],
      subSet: [''],
      imageUrl: [''],
      status: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = Number(params.get('id'));
      // if (this.categoryId) {
      //   this.loadCategoryDetails();
      // }
    });
  }

  // loadCategoryDetails() {
  //   this.courseService.getCategoryById(this.categoryId).subscribe((category) => {
  //     if (category) {
  //       this.categoryForm.patchValue({
  //         Name: category.name,
  //         SubSet: category.subSet,
  //         imageUrl: category.imageUrl,
  //         status: category.status
  //       });
  //       console.log('Loaded Category:', category);
  //     }
  //   });
  // }

  toggleActiveStatus(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.categoryForm.patchValue({ status: checked });
    console.log('Updated Status:', checked);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      // Here, you can implement logic to upload the image & update categoryForm.imageUrl accordingly
      console.log('Selected File:', file.name);
    }
  }

  onSave() {
    console.log('Saved Category Data:', this.categoryForm.value);
    this.courseService.updateCategory(this.categoryId, this.categoryForm.value).subscribe(() => {
      console.log('Category Updated Successfully');
      this.router.navigate(['/dashboard/category/view']);
    });
  }

  onCancel() {
    console.log('Edit cancelled');
    this.router.navigate(['/dashboard/category/view']);
  }
}