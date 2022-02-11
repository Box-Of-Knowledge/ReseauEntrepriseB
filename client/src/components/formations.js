import React, { Component } from "react";
import '../App.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

const domain = process.env.DOMAIN_NAME

export default class Formations extends Component {
    state = {
        formationsItems: [],
        subscribedFormationsItems: [],
    }
    componentDidMount() {
        console.log(domain)
        this.displayFormation();
        this.getSubscribedFormations(localStorage.getItem('student_id'));
    };

    displayFormation() {
        axios.get('/api/formations')
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    formationsItems: result.data
                })
            })
    }

    addFormation = (e) => {
        e.preventDefault();
        let former_id = localStorage.getItem('former_id')
        axios.get('/api/former/refresh_token/',{
            withCredentials:true,
        })
        .then(res =>{
            let access = res.data.accessToken;
            axios.post('/api/former/createForm/'+former_id, {
                title: e.target.elements.formationTitle.value,
                cursus: e.target.elements.formationDescription.value,
                image_formation: e.target.elements.imageRadio.value,
            },{
                headers:{'authorization': `Bearer ${access}`}
            })
            .then(res => {
                window.location.reload()
            })
        })
        //.then(this.displayFormation.bind(this))
    }

    modifyFormation = (e) => {
        e.preventDefault();
        axios.put('/api/formerformation/5')
    }

    registerToFormation = (e, id) => {
        axios.post(`/api/user/formation/register/${id}`, {
            stud_id: localStorage.getItem('student_id'),
        }).then(() => {
            window.location.href = "/formations";
        })
    }

    getSubscribedFormations = (id) => {
        axios.get(`/api/formations/UsersFormations/${id}`)
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    subscribedFormationsItems: result.data
                })
            })
    }

    getId(id) {
        localStorage.setItem('formationId', id)
    }

    renderButton(formationId, array) {
        for (let i = 0; i < array.length; i++) {
            if (formationId == array[i].form_id) {
                return <a href="#" className="btn btn-success" name="formationRegister" onClick={(e) => this.registerToFormation(e, formationId)}>Inscrit à la formation</a>
            }
        }
        return <a href="#" className="btn btn-primary" name="formationRegister" onClick={(e) => this.registerToFormation(e, formationId)}>S'inscrire à la formation</a>
    }

    render() {
        let { formationsItems } = this.state;
        let { subscribedFormationsItems } = this.state;
        return (
            <div className="container text-center">
                <h1>Formations disponibles</h1>
                {(localStorage.getItem('former_id')) ? <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Ajouter une formation</button> : '' }

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
                                            <input type="radio" className="imgCheck col-4" name="imageRadio" id="imgCheck" autoComplete="off" value="https://cdn.pixabay.com/photo/2016/06/01/06/26/open-book-1428428_960_720.jpg" defaultChecked />
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
                            <img src={formation.image_formation} className="card-img-top" alt="image représentant la formation" />
                            <div className="card-body">
                                <h5 className="card-title"> {formation.title} </h5>
                                {this.renderButton(formation.formation_id, this.state.subscribedFormationsItems)}
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>

        );
    }
}