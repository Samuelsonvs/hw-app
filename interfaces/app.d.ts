import { Auth } from "./auth";
import { Dispatch, SetStateAction } from "react";
import { ChangeHandler } from "react-hook-form";

export namespace App {
  interface ContainerProps extends Auth.Children {
    customTitle?: string;
  }

  interface Path {
    filePath: string;
    file: File;
  }

  interface Updates {
    username: string | null;
    is_teacher: boolean;
    teacher: string | null;
    teacher_id: string | null;
  }

  interface Homeworks {
    [key: string] : string
  }

  interface Homeworks {
    [key: number] : Homeworks
  }

  interface UpdatesHomework {
    id: string | null;
    homework: Homeworks[] | null;
  }

  interface FormValues {
    username?: string | null;
    email?: string | null;
    password?: string;
  }

  interface InputTypes {
    type: string;
    placeholder: string;
    name: string;
    defaultValue?: string;
    className?: string;
    disabled?: boolean;
    onChange?: Dispatch<SetStateAction<string | null>>;
    onBlur: ChangeHandler;
  }

  interface Students {
    id: string;
    username: string;
  }

  interface StudentsProp {
    data : Students[];
  }

  interface StudentDetailandBucket {
    data: {
        [key: number]: {
            id: string;
            username: string;
            teacher: string;
            teacher_id: string;
        }
    },
    bucket: {
        data: {
            [key: number] : {
                name: string
            }
        }
    }
}
}
