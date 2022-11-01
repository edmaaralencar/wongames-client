import { Email, Lock } from '@styled-icons/material-outlined'
import TextField from 'components/TextField'
import Button from 'components/Button'
import { FormWrapper, FormLink } from 'components/Form'

import * as S from './styles'
import Link from 'next/link'

const FormSignIn = () => (
  <FormWrapper>
    <form action="">
      <TextField
        name="email"
        placeholder="Email"
        type="email"
        icon={<Email />}
      />
      <TextField
        name="password"
        placeholder="Password"
        type="password"
        icon={<Lock />}
      />
      <S.ForgotPassword href="#">Forgot you password?</S.ForgotPassword>

      <Button size="large" fullWidth>
        Sign in now
      </Button>

      <FormLink>
        Dont have an account?{' '}
        <Link href="/sign-up">
          <a>Sign up</a>
        </Link>
      </FormLink>
    </form>
  </FormWrapper>
)

export default FormSignIn
