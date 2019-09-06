import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import { navigate } from '@reach/router';
import mockApi from '../../api';

import Congrats from './Congrats';

const mockWords = 'these are mock words';
const mockName = 'bob';

jest.mock('../../api', () => ({
    account: {
        isLogged: () => ({
            words: mockWords,
            publicKey: 'this is a mock public key'
        }),
        get: async id => ({ name: 'bob' })
    }
}));

jest.mock('@reach/router', () => {
    navigate: jest.fn();
});

afterEach(cleanup);

it('should render the user seed phrase', async () => {
    const { findByText } = render(<Congrats />);
    await findByText(mockApi.account.isLogged().words);
})

it('should redirect to location.state.from after a click on continue', async () => {
    const { debug, findByText } = render(<Congrats location={{state:{from:'/somewhere'}}}/>);
    const continueButton = await findByText(
        (content, element) => (element.textContent === 'Continuar'),
        { selector: 'button' }
    );
    fireEvent.click(continueButton);
    wait(() => {
        expect(navigate).toBeCalledWith('/somewhere')
    })
})