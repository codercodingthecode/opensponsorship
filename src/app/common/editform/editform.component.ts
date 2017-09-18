import {Component, OnInit, ViewChild} from '@angular/core';
import {AthleteService} from '../../shared/athlete.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Athlete} from '../../shared/athlete';
import { sportsList } from '../../shared/sportsData';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {


  osEditForm: FormGroup;
  userData: Athlete[] = [];
  user = {};
  sportsList: Array<string> = sportsList;
  @ViewChild('charityVal') charityInput;
  @ViewChild('socialnickname') socialNickInput;

  constructor(private _auth: AthleteService, private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit() {
    this._auth.editReady.subscribe(state => {
      // console.log(this._auth.editUser);
      if (state) {
        this.user = this._auth.editUser;
        this.osEditForm.setValue(this.user);
        console.log(' user ', this.user);
        console.log(' form ', this.osEditForm);
        // this.drinks = this.user['interest'].drinks;
        // console.log('DRINKS ---> ', this.drinks);
      }
    })
  }

  onRegistar() {
    this._auth.letThemKnow.next(true);
  }

  onSubmit() {
    if (this.osEditForm.status === 'VALID') {
      this._auth.updateData(this.osEditForm.value);
      this._auth.letThemKnow.next(true);
    } else {
      console.log('FORM IS EMPTY');
    }
  }

  onAddCharity(data: any) {
    console.log(data.value);
    if (data.value.length > 0) {
      this.user['interest'].charities.push(data.value);
      console.log(this.user['interest'].charities);
    }
    this.charityInput.nativeElement.value = '';
    this.charityInput.nativeElement.focus();
  }
  //
  onAddSport(data: any) {
    console.log(data.value);
    if (data.value.length > 0) {
      this.user['sports'].sports.push(data.value);
      console.log(this.user['sports'].sports);
    }
  }

  onAddSocial(social: any, handler: any) {
    console.log(social.value, handler.value);
    if (handler.value.length > 0) {
      this.user['socials'].push({'Social': social.value, 'handler': handler.value});
    }
    this.socialNickInput.nativeElement.value = '';
    this.socialNickInput.nativeElement.focus();
  }

  onClearArray(data: string) {
    if (data === 'sport') {
      this.user['sports'].sports.splice(0, this.user['sports'].sports.length);
    } else if (data === 'charity') {
      this.user['interest'].charities.splice(0, this.user['interest'].charities.length);
    } else {
      this.user['socials'].splice(0, this.user['socials'].length);
    }
  }






  createForm() {
    this.osEditForm = this.fb.group({
      personal: this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        dob: '',
        nationality: '',
        gender: '',
        marital: '',
        location: ''
      }),
      interest: this.fb.group({
        drinks: '',
        interests: '',
        charities: '',
        pets: ''
      }),
      sports: this.fb.group({
        association: '',
        team: '',
        sports: ''
      }),
      _id: '',
      __v: '',
      socials: '',
      profilePic: '',
      about: ''
    });
  }





}
