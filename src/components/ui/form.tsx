import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { View, Text, StyleSheet, ViewStyle, TextStyle, ViewProps, TextProps } from "react-native";
import { Label } from "./label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

interface FormItemProps extends ViewProps {
  style?: ViewStyle;
}

const FormItem = React.forwardRef<View, FormItemProps>(
  ({ style, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <View ref={ref} style={[styles.formItem, style]} {...props} />
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = "FormItem";

interface FormLabelProps extends TextProps {
  style?: TextStyle;
}

const FormLabel = React.forwardRef<Text, FormLabelProps>(
  ({ style, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
      <Label
        ref={ref}
        style={StyleSheet.flatten([error ? styles.errorLabel : undefined, style])}
        nativeID={formItemId}
        {...props}
      />
    );
  }
);

FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<View, ViewProps>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <View
        ref={ref}
        nativeID={formItemId}
        aria-invalid={!!error}
        {...props}
      />
    );
  }
);

FormControl.displayName = "FormControl";

interface FormDescriptionProps extends TextProps {
  style?: TextStyle;
}

const FormDescription = React.forwardRef<Text, FormDescriptionProps>(
  ({ style, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
      <Text
        ref={ref}
        nativeID={formDescriptionId}
        style={[styles.description, style]}
        {...props}
      />
    );
  }
);

FormDescription.displayName = "FormDescription";

interface FormMessageProps extends TextProps {
  style?: TextStyle;
}

const FormMessage = React.forwardRef<Text, FormMessageProps>(
  ({ style, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : children;

    if (!body) {
      return null;
    }

    return (
      <Text
        ref={ref}
        nativeID={formMessageId}
        style={[styles.errorMessage, style]}
        {...props}
      >
        {body}
      </Text>
    );
  }
);

FormMessage.displayName = "FormMessage";

const styles = StyleSheet.create({
  formItem: {
    gap: 8,
    marginBottom: 16,
  },
  errorLabel: {
    color: '#ef4444',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6b7280',
  },
  errorMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ef4444',
    fontWeight: '500',
  },
});

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};


