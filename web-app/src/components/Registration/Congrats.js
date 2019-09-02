import React from 'react';
import { Typography, Button } from 'antd';
import "./Congrats.css";

const { Text } = Typography;

function Congrats({ seedPhrase, username}) {
    const seedPhrase_ = seedPhrase.join(" ");
    return (
        <div className="congrats">
            <h3>Felicitaciones {username}!</h3>
            <p>Te has registrado correctamente. Esta es tu frase secreta:</p>
            <p><Text code>{seedPhrase_}</Text></p>
            <p><b>Conservala</b>, la necesitarás para acceder en el futuro.</p>
            <div className="button-wrapper">
                <Button type="primary">Continuar</Button>
            </div>
        </div>
    );
}

export default Congrats;