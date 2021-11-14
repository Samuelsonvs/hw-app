/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { GetStaticProps, GetStaticPropsContext } from "next";

import { useUser } from "@/context/Context";
import { getAllStudentsOrTeachers, setUserProfiles } from "@/utils/supabaseClient";
import Container from "@/container/Container";
import AuthContainer from "@/container/AuthContainer";
import Input from "@/components/Input";
import { App } from "@/interfaces/app";
import useFormRef from "@/hooks/useFormRefs";

export const Signup: NextPage<App.StudentsProp> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [registerName, setRegisterName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [checkbox, setCheckbox] = useState<boolean | null>(null);
  const [selectbox, setSelectbox] = useState<string>("Kelsea Ortiz");
  const { session, signUp } = useUser();
  const { passwordRef, usernameRef, emailRef } = useFormRef();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<App.FormValues>();
  const router = useRouter();

  const checkboxHandler = (e: MouseEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked
    setCheckbox(status) 
  }

  const selectboxHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectbox(e.target.value)
  }

  const handleRegister: SubmitHandler<App.FormValues> = async () => {
    if (registerName && email && password) {
      const { error, user } = await signUp({ email, password });
      if (error) {
        return alert(error.message);
      } else {
        if (user) {
          const id = data.filter((d) => {
            if (d.username === selectbox) {
              return d.id
            }
          })
          const { error } = await setUserProfiles(user, {
            username: registerName,
            is_teacher: checkbox ? true : false,
            teacher: checkbox ? selectbox : null,
            teacher_id: checkbox ? null : id[0].id
          });
        }
      }
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
                  onSubmit={handleSubmit(handleRegister)}
                >
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      <span>Username</span>
                    </label>
                    <Input
                      type={"text"}
                      ref={usernameRef.ref}
                      placeholder={"Your username"}
                      onChange={setRegisterName}
                      onBlur={usernameRef.onBlur}
                      name={usernameRef.name}
                    />
                
                  
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">
                      <span>Email</span>
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
                      <span>Password</span>
                    </label>
                    <Input
                      type={"password"}
                      ref={passwordRef.ref}
                      placeholder={"Your password"}
                      onChange={setPassword}
                      onBlur={passwordRef.onBlur}
                      name={passwordRef.name}
                    />

                    <div className="py-2 flex flex-col sm:flex-row">
                      <label htmlFor="teachers">If you are student select teacher</label>
                      <select onChange={(e) => selectboxHandler(e)} className="ml-0 mt-3 sm:ml-1 sm:mt-0" name="teachers" id="teachers">
                        {data && data.map((teacher, idx:number) => {
                          return (
                            <option key={idx} value={teacher.username}>{teacher.username}</option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" onClick={(e) => checkboxHandler(e)} />
                      <label className="font-semibold text-sm text-gray-600 pb-1 mt-1 block">
                        <span>If you want to register as teacher click checkbox</span>
                      </label>
                    </div>
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
                    <label className="font-semibold text-sm text-gray-600 pb-1 mt-4 block">
                      <span>
                        <span>Already a member? </span>
                        <Link passHref href="/signin">
                          <a className="label-text-alt font-semibold text-blue-600 border-b border-blue-400">
                            Sign in.
                          </a>
                        </Link>
                      </span>
                    </label>
                  
                  <div className="pt-4">
                    <input
                      disabled={loading}
                      className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg cursor-pointer text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
                      type="submit"
                      value="Signup"
                    />
                  </div>
                </form>
              </AuthContainer>
        </Container>
      )}
    </>
  );
};


export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { data } = await getAllStudentsOrTeachers(true)
  return {
    props: {
      data,
    },
    revalidate: 60,
  };
};

export default Signup;
