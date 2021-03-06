import { Component } from "@angular/core";
import { NewsService } from "./news/news.service";
import { AuthService } from "./auth/auth.service";
import { Router, NavigationStart } from "@angular/router";
import { StatisticsService } from "./statistics/statistics.service";
import { MenuItem } from "primeng/primeng";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [NewsService]
})
export class AppComponent {

    private activeItem : MenuItem;
    private routesConfig : { activeLinkIndex: number, routes:
                                                            {
                                                                link:string, 
                                                                label:string,
                                                                index:number,
                                                                style: {}, 
                                                                visible: ()=>boolean,
                                                                clickMethod :()=>void
                                                            }[]
                            };
    private activeLinkIndex : number;

    constructor(private authService: AuthService, private router: Router, private statisticsService: StatisticsService){
        router.events.subscribe((event) => {
            if(event instanceof NavigationStart)
                this.statisticsService.handleRequestForStatistics(event);
        });

        this.routesConfig ={ 
            activeLinkIndex:0,
            routes:[{
                link:"",
                label : "Strona główna",
                index: 0,
                style: {}, 
                visible: ()=>{return true;},
                clickMethod : ()=>{}
            },{
                link:"/news",
                label : "Newsy",
                index:1,
                style: {}, 
                visible:()=>{return true;},
                clickMethod : ()=>{}
            },{
                link:"/appointment-confirmation",
                label : "Potwierdź zaproszenie",
                index:1,
                style: {'font-weight':'bold', 'color': '#00ff5c'}, 
                visible:()=>{return true;},
                clickMethod : ()=>{}
            },{
                link: "/administration",
                label : "Panel administratora",
                index : 2,
                style: {}, 
                visible: ()=>{return this.authService.isLoggedIn();},
                clickMethod : ()=>{}
            },{
                link: "/signin",
                label : "Logowanie",
                index : 3,
                style: {}, 
                visible : ()=>{return !this.authService.isLoggedIn();},
                clickMethod : ()=>{
                    this.authService.signInEvent.subscribe((isLogged : boolean)=>{debugger;
                        this.routesConfig.activeLinkIndex = 0;
                    })
                }
            },
            {
                link: "/",
                label : "Wylogowanie",
                index : 4,
                style: {}, 
                visible: ()=>{return this.authService.isLoggedIn();},
                clickMethod : ()=>{
                    this.logout();
            }
        }]};
    }

    logout(){

        this.authService.logout();
        this.router.navigateByUrl('/');
    }
}