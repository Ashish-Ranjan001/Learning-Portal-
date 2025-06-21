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
import { UserComponent } from './components/dashboard/user/user.component';
import { AddTaComponent } from './components/dashboard/add-ta/add-ta.component';
import { ViewTaComponent } from './components/dashboard/view-ta/view-ta.component';
import { ViewAdminComponent } from './components/dashboard/view-admin/view-admin.component';
import { AddAdminComponent } from './components/dashboard/add-admin/add-admin.component';
import { LoginComponent } from './components/main/login/login.component';

import { ViewUserComponent } from './components/dashboard/view-user/view-user.component';

import { EditCourseComponent } from './components/dashboard/edit-course/edit-course.component';
import { AddModuleComponent } from './components/dashboard/add-module/add-module.component';
import { EditModuleComponent } from './components/dashboard/edit-module/edit-module.component';
import { ViewModuleComponent } from './components/dashboard/view-module/view-module.component';
import { LandingpageComponent} from './components/main/landingpage/landingpage.component';
import { EditTaComponent } from './components/dashboard/edit-ta/edit-ta.component';
import { ViewVideoComponent } from './components/main/view-video/view-video.component';
import { CategoriesComponent } from './components/main/categories/categories.component';
import { CoursesComponent } from './components/main/courses/courses.component';
import {  CoursesDetailComponent } from './components/main/courses-details/courses-details.component';
import { UpdateUserComponent } from './components/main/update-user/update-user.component';
import { LearningpageComponent } from './components/main/learningpage/learningpage.component';
import { CoursemodulevideocomponentComponent } from './components/main/coursemodulevideocomponent/coursemodulevideocomponent.component';
import { ViewAssignmentComponent } from './components/dashboard/view-assignment/view-assignment.component';
import { AddAssignmentComponent } from './components/dashboard/add-assignment/add-assignment.component';
import { DownlaodReportComponent } from './components/dashboard/downlaod-report/downlaod-report.component';
import { EditAdminComponent } from './components/dashboard/edit-admin/edit-admin.component';
import { ForgotpassComponent } from './components/main/forgotpass/forgotpass.component';

// import { DashboardComponent } from './components/main/dashboard/dashboard.component';

// routes guards
// import { AuthGuard } from '../app/guards/auth.guard.ts.guard';
// import { AdminGuard } from '../app/guards/admin.guard.ts.guard';
// import { GuestGuard } from '../app/guards/guest.guard.ts.guard';
// import { RoleGuard } from '../app/guards/role.guard.ts.guard';



export const routes: Routes = [
    {path: '', component:LandingpageComponent},
    // {path:'user-login',component:LoginComponent},
    // {path:'admin-login',component:LoginComponent},
    {path:'login',component:LoginComponent},
    // {path:'dash',component:DashboardComponent},
    {path:'home',component:HomeComponent},
    { path: 'categories', component: CategoriesComponent },
    { path: 'courses/:categoryId', component: CoursesComponent },
    { path: 'course-detail/:courseId', component: CoursesDetailComponent },
    {path: 'video/:id', component: ViewVideoComponent},
    {path: 'updateuser', component: UpdateUserComponent},
    {path: 'mylearning', component: LearningpageComponent},
    {path:'module/:courseId',component:CoursemodulevideocomponentComponent },
    {path:'forgot-password',component:ForgotpassComponent},
    

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
        {path: 'user/add', component: UserComponent},
        {path: 'user/view', component: ViewUserComponent},
        {path: 'ta/add', component: AddTaComponent},
        {path: 'ta/view', component: ViewTaComponent},
        {path: 'admin/view', component: ViewAdminComponent},
        {path: 'admin/add', component: AddAdminComponent},
        {path: 'course/edit/:id', component: EditCourseComponent},
        {path: 'module/add/:id', component:AddModuleComponent},
       // {path: 'module/edit/:id', component:EditModuleComponent}
        {path:'module/view/:id', component:ViewModuleComponent},
        {path:'module/edit/:id', component:EditModuleComponent},
       {path: 'ta/edit/:id', component: EditTaComponent },
       {path: 'assignment/view', component:ViewAssignmentComponent},
       {path: 'assignment/add', component:AddAssignmentComponent},
       {path: 'reports/generate', component:DownlaodReportComponent},
       {path: 'user/edit/:id', component:UpdateUserComponent},
       {path: 'admin/edit/:id', component:EditAdminComponent},
       
     ] }
    ];

//     // Public routes
//     { path: '', component: LandingpageComponent },
//     { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    
//     // Protected user routes
//     { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
//     { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
//     { path: 'courses/:categoryId', component: CoursesComponent, canActivate: [AuthGuard] },
//     { path: 'course-detail/:courseId', component: CoursesDetailComponent, canActivate: [AuthGuard] },
//     { path: 'video/:id', component: ViewVideoComponent, canActivate: [AuthGuard] },
//     { path: 'updateuser', component: UpdateUserComponent, canActivate: [AuthGuard] },
//     { path: 'mylearning', component: LearningpageComponent, canActivate: [AuthGuard] },
//     { path: 'module/:courseId', component: CoursemodulevideocomponentComponent, canActivate: [AuthGuard] },
    
//     // Admin dashboard routes
//     { 
//         path: 'dashboard', 
//         component: DashboardhomeComponent, 
//         canActivate: [AdminGuard],
//         children: [
//             // LOB Management
//             { path: 'lob/add', component: AddLobComponent },
//             { path: 'lob/view', component: ViewLobComponent },
//             { path: 'lob/edit/:id', component: EditLobComponent },
            
//             // SME Management
//             { path: 'sme/add', component: AddSmeComponent },
//             { path: 'sme/view', component: ViewSmeComponent },
//             { path: 'sme/edit/:id', component: EditSmeComponent },
            
//             // Category Management
//             { path: 'course/addCategory', component: AddCategoryComponent },
//             { path: 'course/viewCategory', component: ViewCategoryComponent },
//             { path: 'category/edit/:id', component: EditCategoryComponent },
            
//             // Course Management
//             { path: 'course/addcourse', component: CourseCreatorComponent },
//             { path: 'course/viewcourse', component: ViewCourseComponent },
//             { path: 'course/edit/:id', component: EditCourseComponent },
            
//             // Module Management
//             { path: 'module/add/:id', component: AddModuleComponent },
//             { path: 'module/view/:id', component: ViewModuleComponent },
//             { path: 'module/edit/:id', component: EditModuleComponent },
            
//             // User Management
//             { path: 'user/add', component: UserComponent },
//             { path: 'user/view', component: ViewUserComponent },
//             { path: 'user/edit/:id', component: UpdateUserComponent },
            
//             // TA Management
//             { path: 'ta/add', component: AddTaComponent },
//             { path: 'ta/view', component: ViewTaComponent },
//             { path: 'ta/edit/:id', component: EditTaComponent },
            
//             // Admin Management
//             { path: 'admin/view', component: ViewAdminComponent },
//             { path: 'admin/add', component: AddAdminComponent },
//             { path: 'admin/edit/:id', component: EditAdminComponent },
            
//             // Assignment Management
//             { path: 'assignment/view', component: ViewAssignmentComponent },
//             { path: 'assignment/add', component: AddAssignmentComponent },
            
//             // Reports
//             { path: 'reports/generate', component: DownlaodReportComponent }
//         ]
//     },
    
//     // Catch-all redirect
//     { path: '**', redirectTo: '' }

// ];



// // app.routes.ts - PROPERLY SECURED VERSION
// import { Routes } from '@angular/router';
// import { HomeComponent } from './components/main/home/home.component';
// import { DashboardhomeComponent } from './components/dashboard/dashboardhome/dashboardhome.component';
// import { AddLobComponent } from './components/dashboard/add-lob/add-lob.component';
// import { ViewLobComponent } from './components/dashboard/view-lob/view-lob.component';
// import { AddSmeComponent } from './components/dashboard/add-sme/add-sme.component';
// import { ViewSmeComponent } from './components/dashboard/view-sme/view-sme.component';
// import { AddCategoryComponent } from './components/dashboard/add-category/add-category.component';
// import { ViewCategoryComponent } from './components/dashboard/view-category/view-category.component';
// import { AddCourseComponent } from './components/dashboard/add-course/add-course.component';
// import { CourseCreatorComponent } from './components/dashboard/course-creator/course-creator.component';
// import { ViewCourseComponent } from './components/dashboard/view-course/view-course.component';
// import { EditLobComponent } from './components/dashboard/edit-lob/edit-lob.component';
// import { EditSmeComponent } from './components/dashboard/edit-sme/edit-sme.component';
// import { EditCategoryComponent } from './components/dashboard/edit-category/edit-category.component';
// import { UserComponent } from './components/dashboard/user/user.component';
// import { AddTaComponent } from './components/dashboard/add-ta/add-ta.component';
// import { ViewTaComponent } from './components/dashboard/view-ta/view-ta.component';
// import { ViewAdminComponent } from './components/dashboard/view-admin/view-admin.component';
// import { AddAdminComponent } from './components/dashboard/add-admin/add-admin.component';
// import { LoginComponent } from './components/main/login/login.component';
// import { ViewUserComponent } from './components/dashboard/view-user/view-user.component';
// import { EditCourseComponent } from './components/dashboard/edit-course/edit-course.component';
// import { AddModuleComponent } from './components/dashboard/add-module/add-module.component';
// import { EditModuleComponent } from './components/dashboard/edit-module/edit-module.component';
// import { ViewModuleComponent } from './components/dashboard/view-module/view-module.component';
// import { LandingpageComponent } from './components/main/landingpage/landingpage.component';
// import { EditTaComponent } from './components/dashboard/edit-ta/edit-ta.component';
// import { ViewVideoComponent } from './components/main/view-video/view-video.component';
// import { CategoriesComponent } from './components/main/categories/categories.component';
// import { CoursesComponent } from './components/main/courses/courses.component';
// import { CoursesDetailComponent } from './components/main/courses-details/courses-details.component';
// import { UpdateUserComponent } from './components/main/update-user/update-user.component';
// import { LearningpageComponent } from './components/main/learningpage/learningpage.component';
// import { CoursemodulevideocomponentComponent } from './components/main/coursemodulevideocomponent/coursemodulevideocomponent.component';
// import { ViewAssignmentComponent } from './components/dashboard/view-assignment/view-assignment.component';
// import { AddAssignmentComponent } from './components/dashboard/add-assignment/add-assignment.component';
// import { DownlaodReportComponent } from './components/dashboard/downlaod-report/downlaod-report.component';
// import { EditAdminComponent } from './components/dashboard/edit-admin/edit-admin.component';
// import { UnauthorizedComponent } from './components/unauthorized/unauthorized/unauthorized.component';


// // Import Guards
// import { AuthGuard } from '../app/guards/auth.guard.ts.guard';
// import { AdminGuard } from '../app/guards/admin.guard.ts.guard';
// import { GuestGuard } from '../app/guards/guest.guard.ts.guard';
// import { RoleGuard } from '../app/guards/role.guard.ts.guard';

// export const routes: Routes = [
//     // PUBLIC ROUTES (No authentication required)
//     { 
//         path: '', 
//         component: LandingpageComponent 
//     },
    
//     // GUEST ONLY ROUTES (Redirect if already authenticated)
//     { 
//         path: 'login', 
//         component: LoginComponent, 
//         canActivate: [GuestGuard] 
//     },
    
//     // UNAUTHORIZED ACCESS PAGE
//     { 
//         path: 'unauthorized', 
//         component: UnauthorizedComponent 
//     },

//     // USER PROTECTED ROUTES (Require authentication)
//     { 
//         path: 'home', 
//         component: HomeComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'categories', 
//         component: CategoriesComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'courses/:categoryId', 
//         component: CoursesComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'course-detail/:courseId', 
//         component: CoursesDetailComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'video/:id', 
//         component: ViewVideoComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'updateuser', 
//         component: UpdateUserComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'mylearning', 
//         component: LearningpageComponent, 
//         canActivate: [AuthGuard] 
//     },
//     { 
//         path: 'module/:courseId', 
//         component: CoursemodulevideocomponentComponent, 
//         canActivate: [AuthGuard] 
//     },

//     // ADMIN DASHBOARD ROUTES (Require SuperAdmin access)
//     { 
//         path: 'dashboard', 
//         component: DashboardhomeComponent, 
//         canActivate: [AdminGuard],
//         canLoad: [AdminGuard], // Extra protection for lazy loading
//         children: [
//             // LOB Management - Admin Only
//             { 
//                 path: 'lob/add', 
//                 component: AddLobComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'lob/view', 
//                 component: ViewLobComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'lob/edit/:id', 
//                 component: EditLobComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // SME Management - Admin Only
//             { 
//                 path: 'sme/add', 
//                 component: AddSmeComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'sme/view', 
//                 component: ViewSmeComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'sme/edit/:id', 
//                 component: EditSmeComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Category Management - Admin Only
//             { 
//                 path: 'course/addCategory', 
//                 component: AddCategoryComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'course/viewCategory', 
//                 component: ViewCategoryComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'category/edit/:id', 
//                 component: EditCategoryComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Course Management - Admin Only
//             { 
//                 path: 'course/addcourse', 
//                 component: CourseCreatorComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'course/viewcourse', 
//                 component: ViewCourseComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'course/edit/:id', 
//                 component: EditCourseComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Module Management - Admin Only
//             { 
//                 path: 'module/add/:id', 
//                 component: AddModuleComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'module/view/:id', 
//                 component: ViewModuleComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'module/edit/:id', 
//                 component: EditModuleComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // User Management - Admin Only
//             { 
//                 path: 'user/add', 
//                 component: UserComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'user/view', 
//                 component: ViewUserComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'user/edit/:id', 
//                 component: UpdateUserComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // TA Management - Admin Only
//             { 
//                 path: 'ta/add', 
//                 component: AddTaComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'ta/view', 
//                 component: ViewTaComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'ta/edit/:id', 
//                 component: EditTaComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Admin Management - Super Admin Only
//             { 
//                 path: 'admin/view', 
//                 component: ViewAdminComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'admin/add', 
//                 component: AddAdminComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'admin/edit/:id', 
//                 component: EditAdminComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Assignment Management - Admin Only
//             { 
//                 path: 'assignment/view', 
//                 component: ViewAssignmentComponent,
//                 canActivate: [AdminGuard]
//             },
//             { 
//                 path: 'assignment/add', 
//                 component: AddAssignmentComponent,
//                 canActivate: [AdminGuard]
//             },
            
//             // Reports - Admin Only
//             { 
//                 path: 'reports/generate', 
//                 component: DownlaodReportComponent,
//                 canActivate: [AdminGuard]
//             },

//             // Default redirect for dashboard
//             { 
//                 path: '', 
//                 redirectTo: 'user/view', 
//                 pathMatch: 'full' 
//             }
//         ]
//     },

//     // CATCH-ALL ROUTES
//     // Redirect any unknown route to landing page
//     { 
//         path: '**', 
//         redirectTo: '', 
//         pathMatch: 'full' 
//     }
// ];

// // Additional Route Guard Configuration (Optional - for extra security)

// // If you want even more granular control, you can create specific role-based routes:
// /*
// export const ROLE_BASED_ROUTES: Routes = [
//     // Super Admin only routes
//     {
//         path: 'super-admin',
//         canActivate: [RoleGuard],
//         data: { roles: ['SuperAdmin'] },
//         children: [
//             { path: 'system-settings', component: SystemSettingsComponent },
//             { path: 'audit-logs', component: AuditLogsComponent }
//         ]
//     },
    
//     // Manager level routes
//     {
//         path: 'manager',
//         canActivate: [RoleGuard], 
//         data: { roles: ['Manager', 'SuperAdmin'] },
//         children: [
//             { path: 'team-reports', component: TeamReportsComponent },
//             { path: 'approve-requests', component: ApproveRequestsComponent }
//         ]
//     }
// ];
// */

// // Route Security Summary:
// /*
// ✅ PUBLIC: Landing page only
// ✅ GUEST ONLY: Login (redirects if authenticated)
// ✅ USER PROTECTED: All learning/user routes require authentication
// ✅ ADMIN PROTECTED: All dashboard routes require SuperAdmin
// ✅ CHILD ROUTE PROTECTION: Each dashboard child route is individually protected
// ✅ CATCH-ALL: Unknown routes redirect to landing page
// ✅ UNAUTHORIZED: Dedicated page for access denied scenarios

// 🔒 SECURITY FEATURES:
// - No route can be accessed without proper authentication
// - Admin routes have double protection (parent + child guards)
// - Guest guard prevents authenticated users from seeing login
// - All unknown routes are handled gracefully
// - Each route explicitly defines its protection level
// 