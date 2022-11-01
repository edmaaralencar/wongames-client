import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Email } from '@styled-icons/material-outlined'

import { renderWithTheme } from 'utils/tests/helpers'

import TextField from '.'

describe('<TextField />', () => {
  it('renders with Label', () => {
    renderWithTheme(<TextField label="Label" labelFor="Field" id="Field" />)

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('renders without Label', () => {
    renderWithTheme(<TextField />)

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    renderWithTheme(<TextField placeholder="hey you" />)

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('changes its value when typing', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        onInput={onInput}
        label="TextField"
        labelFor="TextField"
        id="TextField"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).toHaveValue(text)
      expect(onInput).toHaveBeenCalledTimes(text.length)
    })
    expect(onInput).toHaveBeenCalledWith(text)
  })

  it('is accessible by tab', async () => {
    renderWithTheme(
      <TextField label="TextField" labelFor="TextField" id="TextField" />
    )

    const input = screen.getByLabelText('TextField')

    userEvent.tab()

    await waitFor(() => {
      expect(input).toHaveFocus()
    })
  })

  it('should render icon in the right side', () => {
    renderWithTheme(
      <TextField iconPosition="right" icon={<Email data-testid="icon" />} />
    )

    expect(screen.getByTestId(/icon/i).parentElement).toHaveStyle({ order: 1 })
  })

  it('should render with a icon', () => {
    renderWithTheme(<TextField icon={<Email data-testid="icon" />} />)

    expect(screen.getByTestId(/icon/i)).toBeInTheDocument()
  })

  it('is not acessible by tab when disabled', () => {
    renderWithTheme(
      <TextField
        label="TextField"
        labelFor="TextField"
        id="TextField"
        disabled={true}
      />
    )

    const input = screen.getByLabelText('TextField').closest('input')

    expect(input).toBeDisabled()

    userEvent.tab()

    expect(input).not.toHaveFocus()
  })

  it('should not change its value when disabled', async () => {
    const onInput = jest.fn()
    renderWithTheme(
      <TextField
        label="TextField"
        labelFor="TextField"
        id="TextField"
        onInput={onInput}
        disabled={true}
      />
    )

    const input = screen.getByRole('textbox')

    expect(input).toBeDisabled()

    const text = 'This is my new text'
    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })

    expect(onInput).not.toHaveBeenCalled()
  })

  it('should render with  error', () => {
    const { container } = renderWithTheme(
      <TextField
        label="TextField"
        labelFor="TextField"
        id="TextField"
        error="Error Message"
        disabled={true}
      />
    )

    expect(screen.getByText('Error Message')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
