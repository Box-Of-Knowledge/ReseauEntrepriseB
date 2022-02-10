/*
import React, { Component } from "react";
import {Link} from 'react-router-dom'

export default class SignUp extends Component {
    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form>
                <h3>Inscription</h3>
                <div className="form-group">
                    <label>Nom</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>
                <div className="form-group">
                    <label>Prénom</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Inscription</button>
                <p className="forgot-password text-right">
                    Déjà enregistré <a href="#">Se connecter ?</a>
                </p>
                <p className="rgpd-rules" className="text-center">
                    <Link to={"/rgpd"}> Consulter les conditions générales d'utilisation (RGPD) </Link>
                </p>
            </form>
            </div>
            </div>
        );
    }
}*/

import React, { Component } from "react";
import './signup.css';
import userService from "./services/authUser.services";
import formerService from "./services/authFormer.services";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Veuillez remplir ce champ!
        </div>
      );
    }
  };
export default class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            password2: '',
            role: '',
            errorMessage: '',
        };
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };


  handleSubmit = e => {
    e.preventDefault();
    this.form.validateAll();
    if (this.state.password !== this.state.password2){
        this.setState({errorMessage:"Veuillez entrer le même mot de passe"})
    }
    else if (this.checkBtn.context._errors.length === 0) {
        console.log(this.state)
        if(this.state.role === 'Formateur'){
            formerService.register(this.state.name, this.state.password)
            .then(() => {
                window.location.href='/sign-in';
            })
        }
        else{
            userService.register(this.state.name, this.state.password)
            .then(() => {
                window.location.href='/sign-in';
            })
        }
    };
};

    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">            
            <Form
            onSubmit={this.handleSubmit}
            ref={c => {
                this.form = c;
              }}>
                <h3>Inscription</h3>

                <div className="form-group">
                    <label>Pseudo</label>
                    <Input
                    type="text"
                    className="form-control"
                    placeholder="Votre pseudo"

                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    validations={[required]}/>
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <Input type="password"
                    className="form-control"
                    placeholder="Votre mot de passe"

                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    validations={[required]}/>
                </div>
                <div className="form-group">
                    <label>Confirmer votre mot de passe</label>
                    <Input type="password"
                    className="form-control"
                    placeholder="Votre mot de passe"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleInputChange}
                    validations={[required]}/>
                    { this.state.errorMessage &&<p className="error"> { this.state.errorMessage } </p> }
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <Input type="checkbox" className="custom-control-input" id="customCheck1" required/>
                        <label className="custom-control-label" htmlFor="customCheck1">En cliquant ici, vous acceptez notre <a href="/rgpd">GPU</a> </label>
                    </div>
                </div>
                <input type="hidden" name="_token" ></input>
                <div>
                    <input type="radio" value="Formateur" name="choix" onChange={this.onChangeRadio}/> Formateur
                    <input type="radio" value="Etudiant" name="choix" onChange={this.onChangeRadio} required/> Étudiant
                </div>
                <button 

                className="btn btn-dark btn-lg btn-block register">
                    S'inscrire
                </button>

                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                }}/>
            </Form>
            <p className="need-account text-right">
                Vous avez déjà un compte ? Connectez-vous <a href="./sign-in">ici</a>
            </p>
            </div>
            </div>
        );
    }
}