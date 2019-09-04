import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import mockedApi from '../../api';
import Login from './Login';

jest.mock('../../api', () => {
    const api = {
        account: {
            recoverAccount: jest.fn(async (seedPhrase) => {
                if (seedPhrase == 'valid seed phrase') {
                    return ({
                        name: 'gferrero',
                        node: 'ql-gferrero',
                        avatar: '/path/to/avatar'
                    });
                } else {
                    throw new Error('not valid seed phrase');
                }
            })
        }
    }
    return api;
});

/* Tests to add
- Cuando le doy a submit llamo a la api de login.
    Siempre? Cuando hay un error de validacion previo, no quiero ir hasta la api.
    
- Cuando me logueo satisfactoriamente me redirige a lo q le pase en location.from
- Cuando no me logueo satisfactoriamente me muestra un error
*/

/* Desde la perspectiva del usuario.
    Si le doy submit con una frase válida, me loguea y me redirige a la página que yo quería visitar.

    Todo lo que me tiene que "mostrar" = Lo traducimos a tiene que renderizar tal o cual componente.
        <LoginForm>
        <SeedPhraseField error="CANT_BE_EMPTY">
        <SeedPhraseField error="NOT_VALID">
    */

it('should render an empty input field for seed phrase', () => {
    const {getByLabelText} = render(<Login />);
    expect(
        getByLabelText("Frase Secreta").value
    ).toBe('');
})

it('should render a submit button saying Entrar', () => {
    const {getByText} = render(<Login />);
    expect(
        getByText('Entrar').getAttribute('type')
    ).toBe('submit');
})


it('should render seed phrase required message when submitting empty form', async () => {
    const {getByText, findByText} = render(<Login/>);
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await findByText('Por favor indica tu frase secreta');
})


it('should call account api recover endpoint when submitting a seed phrase', async () => {
    const seedPhrase = 'my seed phrase'
    const {getByLabelText, getByText} = render(<Login />);
    const seedPhraseInput = getByLabelText('Frase Secreta');
    fireEvent.change(seedPhraseInput, {target: {name: 'seedPhrase', value:seedPhrase}});
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await wait(() => {
        expect(
            mockedApi.account.recoverAccount
        ).toBeCalledWith(seedPhrase)
    });
})

// it('should render seed phrase not valid message when submitting not valid seed phrase', () => {
//     // Renderizar el component
//     // Darle submit con un seed phrase no válido
//     // Asegurarse q está el texto SEED_PHRASE_IS_NOT_VALID
//     // Aparte quiero tener un story para esto.
// })

// it('should redirect to location.from after submitting a valid seed phrase', () => {
//     // Renderizar el component viniendo de un location.from
//     // Darle submit con un seed phrase válido
//     // Asegurarse de que redirige al location.from
// });