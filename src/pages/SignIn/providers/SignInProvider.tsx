import React from "react";
import { useForm, FormProvider } from "react-hook-form";

export type SignInFormType = {
  identifier: string;
  password: string;
};

const SignInProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const methods = useForm<SignInFormType>({
    defaultValues: {
      identifier: "64070108",
      password: "Earththai",
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default SignInProvider;
