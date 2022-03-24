import type { FC } from 'react'
import type { Rule } from 'antd/lib/form'

import styled from 'styled-components'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

import { useRegisterEmailMutation } from 'graphQL/generated/operations'

import { path } from 'setup/PageRouter'

import { baseFormProps } from 'helper/antdUtils'

const RegisterPage: FC = () => {
  const navigate = useNavigate()

  const [registerEmail, registerEmailResp] = useRegisterEmailMutation({
    onCompleted() {
      message.success('Register successfully')
      navigate(path.signIn)
    },
    onError(error) {
      console.log(error)
    },
  })

  const ruleRequired: Rule = {
    required: true,
    message: 'Required',
  }

  return (
    <RegisterPageContainer>
      <h1>Register Page</h1>

      <Form
        {...baseFormProps}
        onFinish={(values) =>
          registerEmail({
            variables: {
              input: values,
            },
          })
        }
      >
        <Form.Item name="email" label="Email" rules={[ruleRequired]}>
          <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={[ruleRequired]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[ruleRequired]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={['attribute', 'firstName']}
          label="First Name"
          rules={[ruleRequired]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={['attribute', 'lastName']}
          label="First Name"
          rules={[ruleRequired]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Link to={path.signIn}>Already have an account? Go to sign in.</Link>
        </Form.Item>

        <Button
          block
          type="primary"
          htmlType="submit"
          loading={registerEmailResp.loading}
        >
          Register
        </Button>
      </Form>
    </RegisterPageContainer>
  )
}

export default RegisterPage

const RegisterPageContainer = styled.div`
  text-align: center;
`
