import Home from './Home.svelte'
import { render, fireEvent } from '@testing-library/svelte'

jest.mock(window.fetch, () => {
    console.log("Hello");
});

it('it works', async () => {
    const { container } = render(Home, {
        user: {username: "test"},
      })
  
    expect(container).toContainHTML('<section class="mt-5"></section>')
  })