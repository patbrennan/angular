import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ["anus", "raper"];
  
  ngOnInit() {
    // property name is string to make sure it can be referenced in html after
    // minification
    this.signupForm = new FormGroup({
      "userData": new FormGroup({ // nested form controls
        "username": new FormControl(null, [
          Validators.required, 
          this.forbiddenNames.bind(this) // this doesn't refer to class here 
        ]),
        "email": new FormControl(null, [
            Validators.required, 
            Validators.email
          ],
          this.forbiddenEmails.bind(this) // custom async validator
        )
      }),
      "gender": new FormControl("male"),
      "hobbies": new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value);
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status);
    );
    
    // set initial values or react to event to set them. patchValue also works
    // for partial form updating
    this.signupForm.setValue({
      "userData": {
        "username": "Pat",
        "email": "bro@bro.com",
      },
      "gender": "male",
      "hobbies": []
    });
  }
  
  // don't need to get form via local references anymore w/reactive approach
  // already have access to it in Ts code
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  
  addHobby() {
    // null allows user to enter value
    const control = new FormControl(null, Validators.required); 
    // must tell Ts explicitly that this is a form array type
    (<FormArray>this.signupForm.get("hobbies")).push(control);
  }
  
  // custom validator = just a function, must take FormControl & returns an object
  // w/string property & boolean value
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if ( this.forbiddenUsernames.includes(control.value) ) {
      return { "nameForbidden": true };
    }
    return null; // must return null - NOT the object w/false as prop value
  }
  
  // custom async validator - like reaching out to web server to verify something
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ "emailForbidden": true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
