/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

import { useUser } from "@/context/Context";
import Container from "@/container/Container";
import AuthContainer from "@/container/AuthContainer";
import { App } from "@/interfaces/app";
import Input from "@/components/Input";
import useFormRef from "@/hooks/useFormRefs";

export const Signin: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { passwordRef, emailRef } = useFormRef();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<App.FormValues>();
  const { session, signIn } = useUser();
  const router = useRouter();

  const handleLogin: SubmitHandler<App.FormValues> = async () => {
    try {
      setLoading(true);
      if (email && password) {
        const { error } = await signIn({ email, password });
        if (error) throw error;
      }
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  return (
    <>
      {!session && (
        <Container>
          <AuthContainer>
                <form
                  onSubmit={handleSubmit(handleLogin)}
                  className="custom-card"
                >
                  
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      <span className="label-text">Email</span>
                    </label>
                    <Input
                      type={"email"}
                      ref={emailRef.ref}
                      placeholder={"Your email"}
                      onChange={setEmail}
                      onBlur={emailRef.onBlur}
                      name={emailRef.name}
                    />
                  
                  
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      <span className="label-text">Password</span>
                    </label>
                    <Input
                      type={"password"}
                      ref={passwordRef.ref}
                      placeholder={"Your password"}
                      onChange={setPassword}
                      onBlur={passwordRef.onBlur}
                      name={passwordRef.name}
                    />
                    {errors.password && (
                      <div className="alert alert-warning mt-2">
                        <div className="flex-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-6 h-6 mx-2 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            ></path>
                          </svg>
                          <label>Password min 6</label>
                        </div>
                      </div>
                    )}
                   
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      <span>
                        <span>New User? </span>
                        <Link passHref href="/signup">
                          <a className="label-text-alt font-semibold text-blue-600 border-b border-blue-400">
                            Create an account.
                          </a>
                        </Link>
                      </span>
                    </label>
                  
                  <div className="pt-4">
                    <input
                      disabled={loading}
                      className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg cursor-pointer text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                      type="submit"
                      value="Signin"
                    />
                  </div>
                </form>
            </AuthContainer>
        </Container>
      )}
    </>
  );
};

export default Signin;
