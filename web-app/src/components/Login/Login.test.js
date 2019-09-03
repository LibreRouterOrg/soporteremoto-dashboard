import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils";

import mockedApi from '../../api';
import Login from './Login';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

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

it('should render an enmpty input field for seed phrase', () => {
    act(() => {
        render(<Login />, container);
    });
    expect(
        container.querySelector('input[name="seedPhrase"]').value
    ).toBe('');
})

it('should render a submit button saying Entrar', () => {
    act(() => {
        render(<Login />, container);
    });
    expect(
        container.querySelector('button[type="submit"]').textContent
    ).toBe('Entrar');
})

it('should render seed phrase required message when empty', () => {
    act(() => {
        render(<Login />, container);
    });
    const submitButton = container.querySelector('button[type="submit"]');
    act(() => {
        submitButton.dispatchEvent(new MouseEvent("click"), { bubbles: true });
    });
    setTimeout(() => {
        expect(
            container.innerHTML
        ).toContain('Por favor indica tu frase secreta');
    }, 4300);
    // TODO, We want to have a storybook story for this usecase.
})


it('should call account api recover endpoint when submitting a seed phrase', () => {
    const seedPhrase = 'my seed phrase'
    let wrapper = null;
    act(() => {
        wrapper = mount(<Login />);
    });
    const seedPhraseInput = wrapper.find('input[name="seedPhrase"]');
    act(() => {
        seedPhraseInput.simulate('change', {target: {name:'seedPhrase', value: seedPhrase}, });
    })
    const submitButton = wrapper.find('button[type="submit"]');
    act(() => {
        submitButton.simulate('click', { bubbles: true });
    });
    setTimeout(() => {
        expect(
            mockedApi.account.recoverAccount
        ).toBeCalledWith(seedPhrase)
    }, 4300);
})

it('should render seed phrase not valid message when submitting not valid seed phrase', () => {
    // Renderizar el component
    // Darle submit con un seed phrase no válido
    // Asegurarse q está el texto SEED_PHRASE_IS_NOT_VALID
    // Aparte quiero tener un story para esto.
})

it('should redirect to location.from after submitting a valid seed phrase', () => {
    // Renderizar el component viniendo de un location.from
    // Darle submit con un seed phrase válido
    // Asegurarse de que redirige al location.from
});