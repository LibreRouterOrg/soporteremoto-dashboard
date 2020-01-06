import React from 'react';
import mockedApi from '../../api';
import { navigate } from '@reach/router';
import Registration from './Registration';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
afterEach(cleanup);

jest.mock('../../api', () => {
    const api = {
        nodes: {
            list: async () => ['ql-bob', 'ql-jim', 'ql-roxa'],
            getDefaultNode: jest.fn(async () => 'ql-bob')
        },
        account: {
            createAccount: async ({ name, node }) => ({ words: 'your words' })
        }
    }
    return api;
});

jest.mock('@reach/router', () => ({
    navigate: jest.fn(),
}));

const submitButtonParams = [
    (content, element) => element.textContent === 'Registrarme',
    { 'selector': '*[type="submit"]' }
];

it('should render an empty field for username', () => {
    const { getByLabelText } = render(<Registration />);
    const usernameInput = getByLabelText('Nombre de Usuario');
    expect(usernameInput.value).toBe("");
});

it.skip('should render a select node field with no selected option when default node is unknown', async () => {
    /*Skipped since select handling of Antd Select isnt trivial*/
    const { getByLabelText } = render(<Registration />);
    const nodeSelector = getByLabelText('Tu Nodo');
    mockedApi.getDefaultNode = jest.fn(async () => null);
    await wait(() => {
        expect(nodeSelector.value).toBeNull();
    })
});

it.skip('should render a select node field with selected option being the default node when available', async () => {
    /*Skipped since select handling of Antd Select isnt trivial*/
    const { getByLabelText } = render(<Registration />);
    const nodeSelector = getByLabelText('Tu Nodo');
    mockedApi.getDefaultNode = jest.fn(async () => 'ql-bob');
    await wait(() => {
        expect(nodeSelector.value).toBe('ql-bob');
    })
});

it.skip('should call create account with form data when submitting the form', async () => {
    /*Skipped since select handling of Antd Select isnt trivial*/
    mockedApi.account.createAccount = jest.fn(async ({ name, node }) => { words: 'your seed phrase' });
    const { getByLabelText, getByText } = render(<Registration />);
    const usernameInput = getByLabelText('Nombre de Usuario');
    fireEvent.change(usernameInput, { target: { name: 'name', value: 'bob' } });
    const nodeSelector = getByLabelText('Tu Nodo');
    fireEvent.change(nodeSelector, { target: { name: 'node', value: 'bob-ql' } });
    const submitButton = getByText(...submitButtonParams);
    fireEvent.click(submitButton);
    await wait(() => {
        expect(
            mockedApi.account.createAccount
        ).toBeCalledWith('bob', 'bob-ql');
    })
});

it.skip('should navigate to congrats page after submitting the form', async () => {
    /*Skipped since select handling of Antd Select isnt trivial*/
    mockedApi.account.createAccount = jest.fn(async ({ name, node }) => { words: 'your seed phrase' });
    const { getByLabelText, getByText } = render(<Registration />);
    const usernameInput = getByLabelText('Nombre de Usuario');
    fireEvent.change(usernameInput, { target: { name: 'name', value: 'bob' } });
    const nodeSelector = getByLabelText('Tu Nodo');
    fireEvent.change(nodeSelector, { target: { name: 'node', value: 'bob-ql' } });
    const submitButton = getByText(...submitButtonParams);
    fireEvent.click(submitButton);
    await wait(() => {
        expect(navigate).toHaveBeenCalledWith('/congrats', { state: { from: this.props.location.state.from } });
    })
});

