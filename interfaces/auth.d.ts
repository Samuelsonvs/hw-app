import { Dispatch, SetStateAction } from "react";
import {
  User,
  AuthSession,
  UserCredentials,
  Provider,
} from "@supabase/supabase-js";
import { ApiError } from "@supabase/gotrue-js/dist/main/GoTrueApi";

namespace Auth {
  interface Children {
    children: JSX.Element;
  }

  interface Homeworks {
    [key: string] : string
  }

  interface UserDetails {
    id: string;
    username: string;
    is_teacher: boolean;
    teacher: string | null;
    teacher_id: string | null;
  }

  interface Context {
    session?: AuthSession | null;
    user: User | null;
    userDetails: UserDetails | null;
    setUserDetails: Dispatch<SetStateAction<UserDetails | null>>;
    loading: boolean;
    signIn: (options: UserCredentials) => Promise<{
      session: AuthSession | null;
      user: User | null;
      provider?: Provider | undefined;
      url?: string | null | undefined;
      error: ApiError | null;
      data: AuthSession | null;
    }>;
    signUp: (options: UserCredentials) => Promise<{
      user: User | null;
      session: AuthSession | null;
      error: ApiError | null;
      data: AuthSession | User | null;
    }>;
    signOut: () => Promise<{
      error: ApiError | null;
    }>;
  }
}
