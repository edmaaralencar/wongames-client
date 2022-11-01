import { screen, waitFor } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import Checkbox from '.'

describe('<Checkbox />', () => {
  it('should render with label', () => {
    const { container } = renderWithTheme(
      <Checkbox label="checkbox label" labelFor="check" />
    )

    // input a partir do papel dele
    expect(screen.getByRole('checkbox')).toBeInTheDocument()

    // input a partir da label associada a ele
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument()

    // label a partir do texto dela
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check')

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render without label', () => {
    renderWithTheme(<Checkbox />)

    // algo que você não quer encontrar -> usar query
    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument()
  })

  it('should render with black label', () => {
    renderWithTheme(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />
    )

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#030517'
    })
  })

  it('it should dispatch onCheck when stats change', async () => {
    const onCheck = jest.fn()

    renderWithTheme(<Checkbox label="Checkbox" onCheck={onCheck} />)

    expect(onCheck).not.toBeCalled()

    userEvent.click(screen.getByRole('checkbox'))

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith(true)
  })

  it('it should dispatch onCheck when stats change', async () => {
    const onCheck = jest.fn()

    renderWithTheme(<Checkbox label="Checkbox" onCheck={onCheck} isChecked />)

    expect(onCheck).not.toBeCalled()

    userEvent.click(screen.getByRole('checkbox'))

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith(false)
  })

  // it('should be accessible with tab', () => {
  //   renderWithTheme(<Checkbox label="Checkbox" labelFor="Checkbox" />)

  //   expect(document.body).toHaveFocus()

  //   userEvent.tab()

  //   expect(screen.getByRole(/checkbox/i)).toHaveFocus()
  // })
})
