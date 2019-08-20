import React from 'react';
import { Typography, Button } from 'antd';
import "./Congrats.css";

const { Text } = Typography;

function Congrats({seedPhrase}){
    return (
        <div className="congrats">
            <h3>Felicitaciones!</h3>
            <p>Te has registrado correctamente. Esta es tu frase secreta:</p>
            <p><Text code>{seedPhrase.join(" ")}</Text></p>
            <p><b>Conservala</b>, la necesitarás para acceder en el futuro.</p>
            <Button type="primary">Continuar</Button>
        </div>
    );
}

export default Congrats;