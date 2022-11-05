import React from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default class Create extends React.Component {

  async create_product(product) {
    var available = false;
    if (product.available === "Oui") {
        available = true;
    }
    var data = JSON.stringify({
        "name": product.name,
        "type": product.type,
        "price": product.price,
        "rating": product.rating,
        "warranty_years": product.warranty_years,
        "available": available
    });

    var config = {
        method: 'post',
        url: 'http://localhost:8080/api/create',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  render() {
    return (
      <>
        <Alert severity="success">Succès: Nouveau produit ajouté à la liste !</Alert>
      </>
    )
  }
}