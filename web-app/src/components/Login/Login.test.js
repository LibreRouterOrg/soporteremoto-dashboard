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

it('should render an empty input field for seed phrase', () => {
    const { getByLabelText } = render(<Login />);
    expect(
        getByLabelText("Frase Secreta").value
    ).toBe('');
})

it('should render a submit button saying Entrar', () => {
    const { getByText } = render(<Login />);
    expect(
        getByText('Entrar').getAttribute('type')
    ).toBe('submit');
})


it('should render seed phrase required message when submitting empty seedPhrase', async () => {
    const { getByText, findByText } = render(<Login />);
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await findByText('Por favor indica tu frase secreta');
})


it('should call account api recover endpoint when submitting a seed phrase', async () => {
    const seedPhrase = 'my seed phrase'
    const { getByLabelText, getByText } = render(<Login />);
    const seedPhraseInput = getByLabelText('Frase Secreta');
    fireEvent.change(seedPhraseInput, { target: { name: 'seedPhrase', value: seedPhrase } });
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await wait(() => {
        expect(
            mockedApi.account.recoverAccount
        ).toBeCalledWith(seedPhrase)
    });
})

it('should render seed phrase not valid message when submitting not valid seed phrase', async () => {
    const notValidSeedPhrase = 'not valid seed phrase';
    const { getByLabelText, getByText, findByText } = render(<Login />);
    const seedPhraseInput = getByLabelText('Frase Secreta');
    fireEvent.change(seedPhraseInput, { target: { name: 'seedPhrase', value: notValidSeedPhrase } });
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await findByText('La frase secreta ingresada no es correcta');
})

it('should redirect to location.state.from after submitting a valid seed phrase when available', async () => {
    global.window = { location: { pathname: null } };
    const validSeedPhrase = 'valid seed phrase';
    const { getByLabelText, getByText } = render(<Login location={{state:{from:'/reports'}}}/>);
    const seedPhraseInput = getByLabelText('Frase Secreta');
    fireEvent.change(seedPhraseInput, { target: { name: 'seedPhrase', value: validSeedPhrase } });
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await wait(() => {
        expect(
            window.location.pathname
        ).toEqual('/reports')
    })
});

it('should redirect to / after submitting a valid seed phrase when not location.state.from is available', async () => {
    global.window = { location: { pathname: null } };
    const validSeedPhrase = 'valid seed phrase';
    const { getByLabelText, getByText } = render(<Login />);
    const seedPhraseInput = getByLabelText('Frase Secreta');
    fireEvent.change(seedPhraseInput, { target: { name: 'seedPhrase', value: validSeedPhrase } });
    const submitButton = getByText('Entrar');
    fireEvent.click(submitButton);
    await wait(() => {
        expect(
            window.location.pathname
        ).toEqual('/')
    })
});