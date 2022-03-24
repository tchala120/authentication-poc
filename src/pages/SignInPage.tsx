import type { FC } from 'react'
import type { Rule } from 'antd/lib/form'

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import {
  EnumAuthType,
  useLoginEmailMutation,
} from 'graphQL/generated/operations'

import useAuthContext from 'contexts/useAuthContext'

import { path } from 'setup/PageRouter'

import { baseFormProps } from 'helper/antdUtils'

const SignInPage: FC = () => {
  const { signIn } = useAuthContext()

  const [loginEmail, loginEmailResp] = useLoginEmailMutation({
    onCompleted(resp) {
      signIn(resp.loginEmail.payload.token)
    },
  })

  const ruleRequired: Rule = {
    required: true,
    message: 'Required',
  }

  return (
    <SignInPageContainer>
      <h1>Sign In Page</h1>

      <Form
        {...baseFormProps}
        onFinish={(values) => {
          const { email, password } = values

          loginEmail({
            variables: {
              authType: EnumAuthType.AuthToken,
              email,
              password,
            },
          })
        }}
      >
        <Form.Item name="email" label="Email" rules={[ruleRequired]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[ruleRequired]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Link to={path.register}>Have no account? Create it.</Link>
        </Form.Item>

        <Button
          block
          type="primary"
          htmlType="submit"
          loading={loginEmailResp.loading}
        >
          Sign In
        </Button>
      </Form>
    </SignInPageContainer>
  )
}

export default SignInPage

const SignInPageContainer = styled.div`
  text-align: center;
`
