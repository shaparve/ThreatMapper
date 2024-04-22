import '@testing-library/jest-dom';

import { fireEvent } from '@testing-library/react';
import { Button } from 'ui-components';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderUI } from '@/tests/utils';
import { THEME_DARK, THEME_LIGHT, useTheme } from '@/theme/ThemeContext';

const App = () => {
  const theme = useTheme();
  const { setMode, mode } = theme;
  return (
    <Button
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      data-testid="button-theme-toggle"
    >
      Change Theme
    </Button>
  );
};

beforeEach(() => {
  localStorage.clear();
});

describe('THEME', () => {
  it.skip('system preference theme applied', () => {
    let themeMode = '';
    const userPreferenceDark =
      !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPreferenceDark) {
      themeMode = THEME_DARK;
    }
    renderUI(<App />);
    const html = document.getElementsByTagName('html');
    const theme = html.item(0)?.className;
    expect(theme).toEqual(themeMode);
  });
  it.skip('user preference theme applied, can toggle change theme', () => {
    localStorage.setItem('theme', THEME_LIGHT);
    const { getByTestId } = renderUI(<App />);

    let html = document.getElementsByTagName('html');
    let theme = html.item(0)?.className;

    expect(theme).toEqual(''); // tailwind ignore light class for light mode theme

    const btn = getByTestId('button-theme-toggle');
    expect(btn).toBeInTheDocument();

    fireEvent.click(btn);

    html = document.getElementsByTagName('html');
    theme = html.item(0)?.className;
    expect(theme).toEqual(THEME_DARK);
  });
});
