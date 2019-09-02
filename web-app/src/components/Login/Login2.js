import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

// import api from '../../api';
import Login from '../Login';

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

// jest.mock('../../api');

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

it('should render an input field for seed phrase', () => {
    act(() => {
        render(Login, container)
    })
    // Buscar el input de seed phrase
    // Asegurarse q existe
})

it('should render a button to submit', () => {
    // Renderizar el componente
    // Buscar el botón de submit
    // Asegurarse q existe
})

it('should render seed phrase required message when empty', () => {
    // Renderizar el componente
    // Darle submit sin llenar el seed phrase
    // Asegurarse q está el texto SEED_PHRASE_IS_REQUIRED
    // Aparte, quiero tener una story para esto.
})

it('should call account api recover endpoint when submitting a seed phrase', () => {
    // Renderizar el componente.
    // Darle submit con un seed phrase.
    // Asegurarse de que el mock service fue llamado
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