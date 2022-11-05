import React from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';

export default class Update extends React.Component {

  update_product(names, datas) {
    var filtered = {};
    const asArray = Object.entries(datas);
    asArray.forEach(function (element) {
        if (element[1] === "Oui") {
            filtered[element[0]] = true;
        } else if (element[1] === "Non") {
            filtered[element[0]] = false;
        } else if (!(element[1] === -1 || element[1] === "")) {
            filtered[element[0]] = element[1];
        }
    })
    var data = JSON.stringify({
        "names": names,
        "updateData": filtered
    });

    var config = {
        method: 'put',
        url: 'http://localhost:8080/api/update',
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
        <Alert severity="success">Succès: Produit(s) modifié(s) de la liste !</Alert>
      </>
    )
  }
}