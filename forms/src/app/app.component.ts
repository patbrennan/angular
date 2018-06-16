import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // alternative way - useful if you need to access the form before it's submitted
  @ViewChild("f") myForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ["male", "female"];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;
  
  
  suggestUserName() {
    const suggestedName = 'Superuser';
    // set value of all inputs
    // this.myForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   secret: "pet",
    //   questionAnswer: "",
    //   gender: "male"
    // });
    
    // only override specific controls:
    this.myForm.form.patchValue({ 
      userData: {
        username: suggestedName
      }
    });
  }
  
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }
  
  // alternative approach
  onSubmit() {
    this.submitted = true;
    this.user.username = this.myForm.value.userData.username;
    this.user.email = this.myForm.value.userData.email;
    this.user.secretQuestion = this.myForm.value.secret;
    this.user.answer = this.myForm.value.questionAnswer;
    this.user.gender = this.myForm.value.gender;
    
    // reset the form fields to default, and reset state of form properties.
    this.myForm.reset();
  }
}
