import React, { ChangeEvent, useState } from 'react'
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPropsContext } from "next";

import Container from '@/container/Container';
import { getAllStudentsOrTeachers } from '@/utils/supabaseClient';
import { App } from '@/interfaces/app';

const Students: NextPage<App.StudentsProp> = ({ data }) => {
    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10">
                <div className="text-lg font-semibold text-gray-600">Teacher List</div>
                <ul>
                {data && (
                    data.map((teacher:any, idx:number) => {
                        return (
                            <li key={idx} className="py-2">
                                {teacher["username"]}
                            </li>
                        )   
                    })
                )}
                </ul>
            </div>
        </Container>
    )
}

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

export default Students;