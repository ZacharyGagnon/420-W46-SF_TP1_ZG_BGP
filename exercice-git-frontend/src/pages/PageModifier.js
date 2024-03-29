import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";

export const PageModifier = () => {
    const [redirect, setRedirect] = useState(false);
    const location = useLocation();
    const chanson = location.state;

    const modifierChanson = async () => {
        const titre = document.getElementById("Titre").value;
        const artiste = document.getElementById("Artiste").value;
        const categorie = document.getElementById("Categorie").value;
        const chansonModifiee = {
            titre: titre,
            artiste: artiste,
            categorie: categorie
        }
        try {
            const response = await fetch(`/api/pieces/${chanson._id}/modifier`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(chansonModifiee)
            });
            if (!response.ok) {
                console.error(response);
            }
        } catch (err) {
            console.error(err);
        }
        setRedirect(true);
    }
    
    return (
        <Form>
            {redirect && <Navigate to="/admin" />}
            <h1>Modifier une chanson</h1>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3" controlId="Titre">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" placeholder={chanson.titre} />
                    </Form.Group>
                </Col>
            </Row>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3" controlId="Artiste">
                        <Form.Label>Artiste</Form.Label>
                        <Form.Control type="text" placeholder={chanson.artiste} />
                    </Form.Group>
                </Col>
            </Row>
            <Row xs={4}>
                <Col>
                    <Form.Group className="mb-3" controlId="Categorie">
                        <Form.Label>Catégorie</Form.Label>
                        <Form.Control type="text" placeholder={chanson.categorie} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={() => modifierChanson()}>Submit</Button>
        </Form>
    );
}