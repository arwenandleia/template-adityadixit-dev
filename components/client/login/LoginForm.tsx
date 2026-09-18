"use client";

import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import ControlledFieldInput from "@/components/ui/custom/ControlledFieldInput";

const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password should be atleast 8 characters")
    .max(32, "Password can be a maximum of 32 characters"),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, isSubmitted },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your Account</CardTitle>
        <CardDescription>
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="root-login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* --- EMAIL --- */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-login-form-email"
                  customLabel="Email"
                  type="email"
                />
              )}
            />
            {/* --- EMAIL --- */}

            {/* --- PASSWORD --- */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <ControlledFieldInput
                  field={field}
                  fieldState={fieldState}
                  customId="root-login-form-password"
                  customLabel="Password"
                  type="password"
                />
              )}
            />
            {/* --- PASSWORD --- */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="flex-1"
          >
            Reset
          </Button>
          <Button
            type="submit"
            form="root-login-form"
            disabled={isSubmitting || isSubmitted}
            className="flex-1"
          >
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
