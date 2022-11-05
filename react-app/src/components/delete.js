import React from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default class Delete extends React.Component {

  delete_product(names) {

    var data = JSON.stringify({
        "names": names,
    });

    var config = {
        method: 'delete',
        url: 'http://localhost:8080/api/delete',
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
        <Alert severity="success">Succès: Produit(s) supprimé(s) de la liste !</Alert>
      </>
    )
  }
}