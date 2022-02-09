import React, { Component } from "react";
import '../App.css'
import axios from 'axios'

export default class Formations extends Component {
    state = {
        formationsItems: []
    }
    componentDidMount() {
        this.displayFormation();
    };

    displayFormation() {
        axios.get('http://localhost:5000/api/formations')
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    formationsItems: result.data
                })
            })
    }

    addFormation = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/former/createForm/1', {
            title: e.target.elements.formationTitle.value,
            cursus: e.target.elements.formationDescription.value
        }).then(function (result) {
        }).then(this.displayFormation.bind(this))
    }
    render() {
        let { formationsItems } = this.state;
        return (
            <div className="container text-center">
                <h1>Formations disponibles</h1>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ajouter une formation</button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="addFormationModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addFormationModalLabel">Ajouter une formation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.addFormation}>
                                    <div className="mb-3">
                                        <label htmlFor="titreFormation" className="form-label">Titre de la formation</label>
                                        <input type="input" className="form-control" id="formationNameInput" aria-describedby="formationName" name="formationTitle" />
                                        <div id="formationName" className="form-text">Ce nom permet d'identifier la formation</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formationDescription" className="form-label">Description de la formation</label>
                                        <textarea className="form-control" id="formationDescription" name="formationDescription" />
                                    </div>
                                    <div className="mb-3 row" name="imageForm">
                                        <label htmlFor="imageFormation" className="form-label">Choisir une image pour la formation</label>
                                        <div className="col-4">
                                            <input type="radio" className="imgCheck col-4" name="imageRadio" id="imgCheck" autoComplete="off" value="https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_960_720.jpg" />
                                            <label className="btn btn-outline-primary" role="button" htmlFor="imgCheck" aria-pressed="true">
                                                <img className="" src="https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_960_720.jpg" alt="formation culture" />
                                            </label>
                                        </div>
                                        <div className="col-4">
                                            <input type="radio" className="imgCheck col-4" name="imageRadio" id="imgCheck2" autoComplete="off" value="https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg" />
                                            <label className="btn btn-outline-primary" htmlFor="imgCheck2">
                                                <img src="https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg" alt="formation informatique" />
                                            </label>
                                        </div>
                                        <div className="col-4">
                                            <input type="radio" className="imgCheck col-4" name="imageRadio" id="imgCheck3" autoComplete="off" value="https://cdn.pixabay.com/photo/2018/09/24/17/12/board-3700375_960_720.jpg" />
                                            <label className="btn btn-outline-primary" htmlFor="imgCheck3">
                                                <img src="https://cdn.pixabay.com/photo/2018/09/24/17/12/board-3700375_960_720.jpg" alt="formation apprentissage langues" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer la fenêtre</button>
                                        <button type="submit" className="btn btn-primary">Ajouter la formation</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="formationsList">
                    {this.state.formationsItems.map((formation, i) => (
                        <div className="card col" style={{ width: "18rem" }} key={i}>
                            <img src="https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg" className="card-img-top" alt="image représentant la formation" />
                            <div className="card-body">
                                <h5 className="card-title"> {formation.title} </h5>
                                <p className="card-text"> {formation.description}</p>
                                <a href="#" className="btn btn-primary">Suivre la formation</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
}