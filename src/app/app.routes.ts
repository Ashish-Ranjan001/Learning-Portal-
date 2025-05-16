import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { DashboardhomeComponent } from './components/dashboard/dashboardhome/dashboardhome.component';
import { AddLobComponent } from './components/dashboard/add-lob/add-lob.component';
import { ViewLobComponent } from './components/dashboard/view-lob/view-lob.component';
import { AddSmeComponent } from './components/dashboard/add-sme/add-sme.component';
import { ViewSmeComponent } from './components/dashboard/view-sme/view-sme.component';
import { AddCategoryComponent } from './components/dashboard/add-category/add-category.component';
import { ViewCategoryComponent } from './components/dashboard/view-category/view-category.component';
import { AddCourseComponent } from './components/dashboard/add-course/add-course.component';
import { CourseCreatorComponent } from './components/dashboard/course-creator/course-creator.component';
import { ViewCourseComponent } from './components/dashboard/view-course/view-course.component';
import { EditLobComponent } from './components/dashboard/edit-lob/edit-lob.component';
import { EditSmeComponent } from './components/dashboard/edit-sme/edit-sme.component';
import { EditCategoryComponent } from './components/dashboard/edit-category/edit-category.component';


export const routes: Routes = [
    {path: '', component:HomeComponent},

    { path: 'dashboard',component:DashboardhomeComponent , children: [
        { path: 'lob/add', component: AddLobComponent },
        {path: 'lob/view', component:ViewLobComponent },
        { path: 'sme/add', component: AddSmeComponent },
        {path: 'sme/view', component:ViewSmeComponent },
        {path: 'course/addCategory',component:AddCategoryComponent },
        {path: 'course/viewCategory',component:ViewCategoryComponent },
        {path: 'course/addcourse',component:CourseCreatorComponent },
        {path: 'course/viewcourse',component:ViewCourseComponent },
        { path: 'lob/edit/:id', component: EditLobComponent },
        {path : 'sme/edit/:id',component:EditSmeComponent},
        {path: 'category/edit/:id', component: EditCategoryComponent},
     ] }
];
