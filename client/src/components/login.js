import React, { Component } from "react";
import './login.css';
import userService from "./services/authUser.services";
import formerService from "./services/authFormer.services";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Cookies from 'js-cookie';
const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Veuillez remplir ce champ!
        </div>
      );
    }
  };
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);   
        this.state = {
            name: '',
            password: '',
            role: '',
            message: '',
        };
    }

    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
    }
    
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRadio = e => {
        const { value } = e.target;
    
        this.setState({
          role: value
        });
      };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({message: ""})
        this.form.validateAll();


        if (this.checkBtn.context._errors.length === 0) {
            console.log(this.state)
            if(this.state.role === 'Formateur'){
                formerService.login(this.state.name, this.state.password)
                .then((res) => {
                    window.localStorage.setItem('accessToken', res.data.accessToken);
                    window.localStorage.setItem('refreshToken', res.data.refreshToken);
                    window.location.href='/formations';
                })
            }
            else{
                userService.login(this.state.name, this.state.password)
                .then(() => {
                    window.localStorage.setItem('accessToken', res.data.accessToken);
                    window.localStorage.setItem('refreshToken', res.data.refreshToken);
                    window.location.href='/formations';
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
                <h3>Connexion</h3>

                <div className="form-group">
                    <label>Pseudo</label>
                    <Input
                    type="text"
                    className="form-control"
                    placeholder="Votre pseudo"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required]}/>
                </div>

                <div className="form-group">
                    <label>Mot de passe</label>
                    <Input type="password"
                    className="form-control"
                    placeholder="Votre mot de passe"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}/>
                </div>

                <input type="hidden" name="_token" ></input>
                <div>
                    <input type="radio" value="Formateur" name="choix" onChange={this.onChangeRadio}/> Formateur
                    <input type="radio" value="Etudiant" name="choix" onChange={this.onChangeRadio} required/> Étudiant
                </div>
                <button
                className="btn btn-dark btn-bg btn-block login"
                >
                    Se connecter
                </button>
                <p className="forpas-register text-right">
                    Mot de passe perdu ? Récupérer le <a href="./ForgotPassword">ici</a>
                </p>
                <p className="forpas-register text-right">
                    Pas encore de compte ? Inscrivez-vous <a href="./sign-up">ici</a>
                </p>
                <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                        this.checkBtn = c;
                }}/>
            </Form>
            </div>
        </div>
        );
    }
}