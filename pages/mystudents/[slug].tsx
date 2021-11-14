import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import type { NextPage } from "next";
import { saveAs } from 'file-saver'

import { getAllStudentsOrTeachers, getHomework, getHomeworkData, getHomeworks, getStudentDetails } from '@/utils/supabaseClient';
import Container from '@/container/Container';
import { App } from '@/interfaces/app';

const Slug: NextPage<App.StudentDetailandBucket> = ({ data, bucket }) => {
    const [allHomework, setAllHomework] = useState<App.Homeworks | null>(null)
    const bucketData = Array.isArray(bucket.data) && bucket.data.reduce(
        (acc: any, cur: any) => ({ ...acc, [cur.name.split('.')[0]]: cur.name }),
        {}
    );
    const dataID = data[0].id
    const handleAnswer = async(key: string) => {
        const homeworkData = bucketData[key+dataID];
        const { error, data } = await getHomeworkData(homeworkData)
        if (data) {
            saveAs(data, `${homeworkData}`) 
        }
    }

    useEffect(() => {
        (async(data) => {
            const homeworks: any = await getHomework(data[0].teacher_id)
            setAllHomework(homeworks.data[0].homework)
        })(data)
    }, [data])

    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10">
                {Array.isArray(allHomework) && allHomework.map((homeworkObject, idx) => {
                    const key = Object.keys(homeworkObject)[0]
                    return (
                        <div key={idx} className="flex justify-between py-4">
                            <div>
                                {Object.values(homeworkObject)}
                            </div>

                            {bucketData[key+data[0].id] && (
                            <button onClick={() => handleAnswer(key)} className="button">
                                Answer
                            </button>)}
                            {!bucketData[key+data[0].id] && (
                                <div>Not Answered</div>
                            )}
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await getAllStudentsOrTeachers(false)
    return {
      paths: (data as []).map((info: any) => ({
        params: {
          slug: info.id
        },
      })),
      fallback: false,
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({
    params,
  }: GetStaticPropsContext) => {
    const slug = params?.slug;
    const { data } = await getStudentDetails(slug as string)
    const bucket = await getHomeworks()
    return {
      props: {
        data,
        bucket
      },
      revalidate: 5
    };
  };


  export default Slug