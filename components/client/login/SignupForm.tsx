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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signupFormSchema = z
  .object({
    fullName: z
      .string()
      .min(4, "Name must be atleast 4 letters")
      .max(32, "Name can be a maximum of 32 characters"),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password should be atleast 8 characters")
      .max(32, "Password can be a maximum of 32 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password should be atleast 8 characters")
      .max(32, "Password can be a maximum of 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupFormSchema>;

const SignupForm = () => {
  const { handleSubmit, control, reset } = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignupFormType) => {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>
          Enter your information below to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="root-signup-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* --- FULL NAME --- */}
            <Controller
              control={control}
              name="fullName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="root-signup-form-full-name">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="root-signup-form-full-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* --- FULL NAME --- */}

            {/* --- EMAIL --- */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="root-signup-form-email">
                    Email Address
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="root-signup-form-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="test@test.com"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* --- EMAIL --- */}

            {/* --- PASSWORD --- */}
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="root-signup-form-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="root-signup-form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Password"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* --- PASSWORD --- */}

            {/* --- CONFIRM PASSWORD --- */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="root-signup-form-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="root-signup-form-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm Password"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* --- CONFIRM PASSWORD --- */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" form="root-signup-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
