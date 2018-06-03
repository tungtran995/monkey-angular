import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    f: FormGroup;
    subScription: Subscription;
    errorCredentials : boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private routerService: Router
        ) { }

    ngOnInit() {
        this.f = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    onSubmit() {
        this.subScription = this.authService.login(this.f.value).subscribe(res => {          
            this.routerService.navigate(['admin']);
        }, (errorRes : HttpErrorResponse) => {
            if(errorRes.status === 401){              
                this.errorCredentials=true;
            }
        });

    }

    ngOnDestroy(){
        if(this.subScription){
            this.subScription.unsubscribe();
        }
    }
}