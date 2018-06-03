


import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';

import { environment } from './../../../environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

@Injectable()
export class MenuComponent implements OnInit {
    title = 'Angular Laravel CRUD Menu';
    private api_url  = environment.api_url;
    private token = localStorage.getItem('token');
    private menuForm: FormGroup;
    menu: any;
    menus: any;

    constructor(private http: HttpClient) {
        this.getMenus();
    }

    ngOnInit() {
        this.menuForm = new FormGroup({        
            'name': new FormControl(),
            'parentid': new FormControl()     
        });
    }

    // Add a New Menu
    storeMenu(menuForm: NgForm) {   
        this.http.post(this.api_url+'/createMenu?token='+this.token, menuForm.value).subscribe(res => {
            this.getMenus();
            menuForm.reset();
        }, err => {
            console.log('Error occured');
        });
    }

    getMenus() {
        // console.log('Get Menus and Update Table');
        return this.http.get(this.api_url+'/getMenus?token='+this.token).subscribe(menus => {
            this.menus = menus;
        });
    }

    showMenu(id) {
        console.log('Get Menu ' + id);
        return this.http.get(this.api_url+'/getMenu/' + id+'?token='+this.token).subscribe(menu => {
            this.menu = menu;
            this.menuForm.patchValue({ 
                id: this.menu.id,              
                name: this.menu.name,
                parentid: this.menu.parentid
            });
        });
    }

    deleteMenu(id) {
        console.log('Delete menu id ' + id);
        this.http.delete(this.api_url+'/deleteMenu/' + id+'?token='+this.token).subscribe(res => {
            console.log('Menu Deleted and refresh Table');
            this.getMenus();
        }, err => {
            console.log('Error occured');
        });
    }

    putMenu(id) {
        console.log('Update Menu id ' + id);
        this.http.put(this.api_url+'/updateMenu/' + id+'?token='+this.token, this.menuForm.value).subscribe(res => {
            console.log('Menu Updated and refresh table');
            this.getMenus();
        }, err => {
            console.log('Error occured');
        });

    }
}