import { Routes } from "@angular/router";
import { AdminNewsComponent } from "./admin-news.component";
import { SignInComponent } from "../auth/signin.component";
import { StatisticsComponent } from "./admin-stats.component";
import { TodoComponent } from "../toDo/toDo.component";
import { AdminMarriageDetailsComponent } from "./admin-marriage-details.component";
import { ParticipantsComponent } from "../participants/participants.component";

export const ADMIN_ROUTES: Routes= [
    { path:"", redirectTo:"news", pathMatch:"full" },
    { path:"news", component: AdminNewsComponent },
    { path: "createDummy", component: SignInComponent },
    { path: "signin", component: SignInComponent},
    { path: "stats", component: StatisticsComponent},
    { path: "todos", component: TodoComponent},
    { path: "details", component: AdminMarriageDetailsComponent},
    { path: "participants", component: ParticipantsComponent}
];
