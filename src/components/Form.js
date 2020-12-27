import React, { useState } from 'react';
import Error from './Error';

export default function Form({saveSearch}){

    const [term, saveTerm] = useState('');
    const [error, saveError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        if(term.trim() === ''){
            saveError(true);
            return;
        }
        saveError(false);

        saveSearch(term);
    }

    return (
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input type="text" className="form-control form-control-lg" placeholder="Buscar Imagen, ejemplo: cáfe, cine" onChange={e => saveTerm(e.target.value)}/>
                </div>
                <div className="form-group col-md-4">
                    <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar" />
                </div>
            </div>

            { error ? <Error msg="Agregar una palabra para buscar"/> : null}
        </form>
    )
}