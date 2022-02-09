import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form className="loginForm">
                <h3>Connexion</h3>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Se souvenir de moi</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Soumettre</button>
                <p className="forgot-password text-right">
                    <a href="#">Mdp oublié ?</a>
                </p>
                <p className="rgpd-rules" className="text-center">
                    <Link to={"/rgpd"}> Consulter les conditions générales d'utilisation (RGPD)  </Link>
                </p>
            </form>
            </div>
            </div>
        );
    }
}