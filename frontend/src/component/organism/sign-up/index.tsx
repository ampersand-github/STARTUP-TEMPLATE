import { NextPage } from 'next';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Avatar, Grid, Stack, Typography, Button } from '@mui/material';
import { EmailTextField } from 'component/atom/email-text-field';
import { PasswordTextField } from 'component/atom/password-text-field';
import { useRouter } from 'next/router';
import { ISignUpResult, signUp } from 'util/auth/sign-up';
import {Auth} from "@firebase/auth";

interface ISignUp2 {
    auth:Auth
    email: string;
    password: string;
}

const SignUp = (props:ISignUp2): JSX.Element   => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>('');
    const router = useRouter();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // ボタン押下時処理
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const onSubmit: SubmitHandler<any> = async (data) => {
        const signUpResult: ISignUpResult = await signUp({
            auth:props.auth,
            email: data.email,
            password: data.password,
        });
        if (signUpResult.result === 'ok') {
            await router.push({
                pathname: '/',
            });
        } else {
            setMessage(signUpResult.message);
            setOpen(true);
        }
    };

    return (
            <Stack
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                spacing={2}
                sx={{ marginTop: 8 }}
            >
                <EmailTextField control={control} errors={errors} />
                <PasswordTextField control={control} errors={errors} />
                <Button variant="contained" type="submit">
                    <Typography>新規登録する</Typography>
                </Button>
            </Stack>
    );
};

export default SignUp;
