'use client';

import { useForm, useFormFieldsSchema, useToggle, useYupSchema } from '@/hooks';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { Button, Input, InputPassword } from '@/components/UI/atoms';
import { useCallback, useState } from 'react';
import { webRoutes } from '@/settings';
import { authenticationService } from '@/api';
import { SignUpFC, SignUpForm } from './types';
import { Wrapper } from './styles';

const SignUp: SignUpFC = () => {
  const [form] = useForm<SignUpForm>();
  const [loading, toggleLoading] = useToggle();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const { requiredString, requiredOnlyLetters } = useFormFieldsSchema();

  const schema = useYupSchema({
    username: requiredOnlyLetters,
    password: requiredString,
  });

  const onClick = useCallback(() => {
    (async () => {
      try {
        toggleLoading();

        await form.validateFields();

        const user = form.getFieldsValue();
        const { error } = await authenticationService.signUp(user);

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        setErrorMessage('');

        router.push(webRoutes.public.SIGN_IN);
      } catch (e) {
        console.error(e);
      } finally {
        toggleLoading();
      }
    })().catch(console.error);
  }, [form, router, toggleLoading]);

  return (
    <Wrapper title="Sign up form">
      <Form form={form} layout="vertical" disabled={loading}>
        <FormItem name="username" schema={schema} label="Username">
          <Input placeholder="Enter first name" />
        </FormItem>
        <FormItem name="password" schema={schema} label="Password">
          <InputPassword placeholder="Enter password" />
        </FormItem>
        <div className="error">{errorMessage || ''}</div>
        <Button onClick={onClick}>Sign up</Button>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
