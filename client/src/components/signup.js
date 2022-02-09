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
}