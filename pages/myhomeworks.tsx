import React, { ChangeEvent, useEffect, useState } from 'react'
import type { NextPage } from "next";
import { saveAs } from 'file-saver'

import Container from '@/container/Container';
import { useUser } from '@/context/Context';
import { getHomework, getHomeworkData, getHomeworks, setHomeworkData } from '@/utils/supabaseClient';
import { App } from '@/interfaces/app';



const Myhomeworks: NextPage = () => {
    const { userDetails } = useUser();
    const [homeworks, setHomeworks] = useState<App.Homeworks | null>(null)
    const [bucketData, setBucketData] = useState<any | null>(null)
    const reBucketData = bucketData?.reduce(
        (acc: any, cur: any) => ({ ...acc, [cur.name.split('.')[0]]: cur.name }),
        {}
    );

    const getAnswer = async (homeworkID: string) => {
        const homeworkData = reBucketData[homeworkID+userDetails?.id]
        const { error, data } = await getHomeworkData(homeworkData)
        if (data) {
            saveAs(data, `${homeworkData}`) 
        } 
    }

    const addAnswer = async (event: ChangeEvent<HTMLInputElement>, homeworkID: string) =>  {
        try {
    
          if (!event.target.files || event.target.files.length === 0) {
            throw new Error("You must select an image to upload.");
          }
          const file = event.target.files[0];
          const fileExt = file.name.split(".").pop();
          const fileName = `${homeworkID+userDetails?.id}.${fileExt}`;
          const filePath = `${fileName}`;
    
          const { error } = await setHomeworkData(filePath, file);
          const { data } = await getHomeworks();
          setBucketData(data)
        } catch (error) {
          if (error instanceof Error) {
            alert(error.message);
          }
        }
      }

    useEffect(() => {
        (async () => {
            const { data, error } = await getHomeworks()
            setBucketData(data)
        })()
    }, [])

    useEffect(() => {
        if (userDetails?.teacher_id) {
            (async() => {
                const homework: any = await getHomework(userDetails.teacher_id as string)
                setHomeworks(homework.data[0].homework)
            })()
        }
    }, [userDetails])
    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10">
                <ul>
                {Array.isArray(homeworks) && (
                        homeworks.map((homework:any, idx:number) => {
                            const homeworkID = Object.keys(homework)[0]
                            return (
                                <li key={idx} className="py-4">
                                    <div className="flex justify-between">
                                        <div>
                                            {Object.values(homework)}
                                        </div>
                                        <div>
                                       {!reBucketData[homeworkID+userDetails?.id] && (
                                           <>
                                            <label
                                                className="button"
                                                htmlFor="addFile"
                                                >
                                                Add
                                            </label>
                                            <input
                                                className="hidden absolute"
                                                type="file"
                                                id="addFile"
                                                onChange={(e) => addAnswer(e, homeworkID)}
                                                />
                                            </>
                                        )}
                                   
                                        </div>
                                       {reBucketData[homeworkID+userDetails?.id] && ( <div>
                                        <button onClick={() => getAnswer(homeworkID)} className="button -mt-2">
                                            Answer
                                        </button>
                                        </div>)}
                                    </div>
                                </li>
                            )   
                        })
                    )} 
                </ul>
            </div>
        </Container>
    )
}

export default Myhomeworks;