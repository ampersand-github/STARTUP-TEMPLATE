import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useController, Control } from 'react-hook-form';

interface IPasswordForm {
  control: Control<any>;
  name: string;
  label: string;
  rules: any;
  isError: boolean;
  errorText: string | undefined;
  defaultValue?: string;
  placeholder?: string;
}

export const PasswordForm = (props: IPasswordForm): JSX.Element => {
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const { field } = useController({
    control: props.control,
    name: props.name,
    rules: props.rules,
  });
  const label = { inputProps: { 'aria-label': 'Checkbox Password' } };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {isRevealPassword ? (
        <TextField
          id={field.name}
          name={field.name}
          label={props.label}
          type="text"
          onChange={field.onChange}
          error={props.isError}
          helperText={props.errorText}
          value={field.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
        />
      ) : (
        <TextField
          id={field.name}
          name={field.name}
          label={props.label}
          type="password"
          onChange={field.onChange}
          error={props.isError}
          helperText={props.errorText}
          value={field.value}
          defaultValue={props.defaultValue}
          placeholder={props.placeholder}
        />
      )}
      <FormControlLabel
        control={
          <Checkbox
            {...label}
            onChange={() => setIsRevealPassword(!isRevealPassword)}
          />
        }
        label={
          <Typography variant={'caption'}>パスワードを表示する</Typography>
        }
      />
    </Box>
  );
};
