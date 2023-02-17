'use client';

import { useForm, useFormFieldsSchema, useToggle, useYupSchema } from '@/hooks';
import { Form } from '@/components/UI/organisms';
import { FormItem } from '@/components/UI/molecules';
import { Button, Input, InputPassword, Link } from '@/components/UI/atoms';
import { useCallback, useState } from 'react';
import { tokenService } from '@/services';
import { webRoutes } from '@/settings';
import { authenticationService } from '@/api';
import { useUserContext } from '@/context';
import { useRouter } from 'next/navigation';
import { SignInFC, SignInForm } from './types';
import { Wrapper } from './styles';

const SignIn: SignInFC = () => {
  const [form] = useForm<SignInForm>();
  const [loading, toggleLoading] = useToggle();
  const { requiredString } = useFormFieldsSchema();
  const { setUserState } = useUserContext();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const schema = useYupSchema({
    username: requiredString,
    password: requiredString,
  });

  const onClick = useCallback(() => {
    (async () => {
      try {
        toggleLoading();

        await form.validateFields();

        const user = form.getFieldsValue();
        const { error, data } = await authenticationService.signIn(user);

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        setErrorMessage('');

        tokenService.set.access(data.accessToken);

        await setUserState();

        setTimeout(() => router.push(webRoutes.private.SCHEDULE));
      } catch (e) {
        console.error(e);
      } finally {
        toggleLoading();
      }
    })().catch(console.error);
  }, [form, router, setUserState, toggleLoading]);

  return (
    <Wrapper title="Sign in form">
      <Form form={form} layout="vertical" disabled={loading}>
        <FormItem name="username" schema={schema} label="Username">
          <Input placeholder="Enter username" />
        </FormItem>
        <FormItem name="password" schema={schema} label="Password">
          <InputPassword placeholder="Enter password" />
        </FormItem>
        <div className="error">{errorMessage || ''}</div>
        <Button onClick={onClick}>Sign in</Button>
      </Form>
      <br />
      Have not an account? <Link href={webRoutes.public.SIGN_UP}>Sign up</Link>
    </Wrapper>
  );
};

export default SignIn;
