// src/App.test.js
import React from 'react'; // Asegúrate de que React esté importado
import { act } from 'react'; // Importa act desde 'react'
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CEFApp from './CEFApp';
import { MemoryRouter } from 'react-router-dom';

test('renders CEFApp component', async () => {
  await act(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CEFApp />
        </MemoryRouter>
      </Provider>
    );
  });
});
