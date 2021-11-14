import React, { ChangeEvent, useState } from 'react'
import type { NextPage } from "next";
import { GetStaticProps, GetStaticPropsContext } from "next";

import Container from '@/container/Container';
import { getAllStudentsOrTeachers } from '@/utils/supabaseClient';
import { App } from '@/interfaces/app';

const Students: NextPage<App.StudentsProp> = ({ data }) => {
    const [search, setSearch] = useState("")

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const filterData = search.length > 0 ? data?.filter((student:any) => student["username"].toLowerCase().includes(search.toLowerCase())) : data
    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10">
                <label className="font-semibold text-gray-600 pb-1 block">
                      <span className="text-lg">Student List</span>
                </label>
                <input className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" onChange={(e) => handleSearch(e) } value={search} type="text" />        
                    <div>
                    <div className="flex justify-between py-4 border-b">
                        <div>
                            Students
                        </div>
                        <div>
                            Teachers
                        </div>
                    </div>
                    {filterData && (
                        filterData.map((student:any, idx:number) => {
                            return (
                                <div key={idx} className="flex justify-between py-2">
                                    <div>
                                        {student["username"]}  
                                    </div>
                                    <div>
                                        {student["teacher"]}
                                    </div>
                                </div>
                            )   
                        })
                    )}
                    </div>
            </div>
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async ({
    params,
  }: GetStaticPropsContext) => {
    const { data } = await getAllStudentsOrTeachers(false)
    return {
      props: {
        data,
      },
      revalidate: 60,
    };
  };

export default Students;