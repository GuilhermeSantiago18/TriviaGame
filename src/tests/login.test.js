import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a página Login', () => {
  it('Verifica se existem os inputs de email e nome', () => {
    renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email')
    const name = screen.getByTestId('input-player-name');
    expect(email).toBeDefined();
    expect(name).toBeDefined();
  })

  it('Verifica se o button Play está desabilitado com inputs incompletos', () => {
    renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email')
    const name = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(email, 'trybe@trybe.com')
    userEvent.type(name, '')
    // string vazia causa warning
    expect(btnPlay).toBeDisabled();
  })

  it('Verifica se o button Play fica habilitado com os inputs preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email')
    const name = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');
    userEvent.type(email, 'trybe@trybe.com')
    userEvent.type(name, 'trybe')
    expect(btnPlay).toBeEnabled();
  })
  it('Verifica se clicar no button "play" redireciona para "/game"', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email')
    const name = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(email, 'trybe@trybe.com')
    userEvent.type(name, 'trybe')
    userEvent.click(btnPlay);
      waitFor(() => {
        expect(history.location.pathname).toBe('/game');
    });
    
  });

    it('Verifica se clicar no button "configurações" ele vai para rota configurações', () => {
      const { history } = renderWithRouterAndRedux(<App />)
      const btnSettings = screen.getByTestId('btn-settings');
      expect(btnSettings).toBeInTheDocument();
      userEvent.click(btnSettings);
      expect(history.location.pathname).toBe('/settings')
    })

  it('Verifica se no Click é chamada a API', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        response_code:0,
        response_message:'Token Generated Successfully!',
        token:"0b6a2a88be525d0ebe0ceb5c8318324e5033c373b032ba3ee10acb83a0c7486a",
      })
    })
    renderWithRouterAndRedux(<App />)
    const email = screen.getByTestId('input-gravatar-email')
    const name = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(email, 'trybe@@trybe.com')
    userEvent.type(name, 'trybe')
    userEvent.click(btnPlay);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  })
});