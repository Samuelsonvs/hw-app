import React, { ChangeEvent, useEffect, useState } from 'react'
import Link from "next/link";
import type { NextPage } from "next";

import Container from '@/container/Container';
import { useUser } from '@/context/Context';
import { addHomework, getHomework, getMyStudents } from '@/utils/supabaseClient';
import { App } from '@/interfaces/app';


const Mystudents: NextPage = () => {
    const {user, userDetails } = useUser();
    const [students, setStudents] = useState<any | null>(null)
    const [currentHomeworks, setCurrentHomeworks] = useState<App.Homeworks | null>(null)
    const [homeworkInput, setHomeworkInput] = useState("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setHomeworkInput(e.target.value)
    }

    const handleHomework = async() => {
        if (user) {
            const { error } = await addHomework(user?.id, homeworkInput, currentHomeworks)
            if (!error) {

            }
        }
    }

    
    useEffect(() => {
        if (userDetails && user) {
            (async() => {
                const { data, error } = await getMyStudents(userDetails.username, userDetails.is_teacher)
                setStudents(data ?? error)
                const homeworks: any = await getHomework(user.id)
                setCurrentHomeworks(homeworks.data[0].homework)
            })()
        }
    }, [userDetails, user])
    
    return (
        <Container>
            <div className="max-w-2xl mx-auto mt-10">
            {typeof students !== "string" && students !== null && (
                <>
                    <input value={homeworkInput} onChange={(e) => handleInput(e)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" type="text" />
                    <button onClick={() => handleHomework()} className="button">Add Homework</button>
                </>
            )}
                <ul>
                {Array.isArray(students) && (
                    students.map((student:any, idx:number) => {
                        return (
                            <li key={idx} className="py-4">
                                <div className="flex justify-between">
                                    <div>
                                        {student["username"]}
                                    </div>
                                    <div>
                                        <Link passHref href={`/mystudents/${student.id}`}>
                                            <a className="button">Detail</a>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        )   
                    })
                )}
                {typeof students === "string" && (
                    <li>{students}</li>
                )}
                </ul>
                </div>
        </Container>
    )
}


export default Mystudents;