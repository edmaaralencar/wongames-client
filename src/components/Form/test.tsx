import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import { FormWrapper, FormLink } from '.'

describe('<Form />', () => {
  it('should render the heading', () => {
    const { container } = renderWithTheme(
      <FormWrapper>
        <FormLink>
          My nice <a href="">link</a>
        </FormLink>
      </FormWrapper>
    )

    expect(screen.getByRole('heading', { name: /Form/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
