import { createClient, User } from "@supabase/supabase-js";
import { App } from "@/interfaces/app";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "url";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const setUserProfiles = async (user: User, features: App.Updates) => {
  const { is_teacher } = features
  const { error } = await supabase
    .from("users")
    .update({
      ...features,
    })
    .eq("id", user!.id);
  
  if (is_teacher) {
    const { error } = await supabase
    .from("homeworks")
    .insert({
      "id": user.id
    })
  }
  return { error };
};

export const searchUser = async (user: User | null) => {
  const { data, error, status } = await supabase
    .from("users")
    .select(`id, username, is_teacher, teacher, teacher_id`)
    .eq("id", user!.id)
    .single();
  return { data, error, status };
};

export const getUserDetails = async (user: User | null) => {
  const { data, error, status } = await searchUser(user);
  const { id, username, is_teacher, teacher, teacher_id } = data;

  if (username) {
    return { id, username, is_teacher, teacher, teacher_id };
  }
  return { error };
};

export const getAllStudentsOrTeachers = async (bool: boolean) => {
  const { data, error, status } = await supabase
  .from("users")
  .select(`id, username, teacher`)
  .eq("is_teacher", bool)
  return { data, error, status };
}

export const getMyStudents = async (name: string | null, isTeacher: boolean) => {
  if (isTeacher === true) {
    const { data, error, status } = await supabase
    .from("users")
    .select(`id, username`)
    .eq("teacher", name)
    return { data, error, status };
  } else {
    return { error: 'Sory I cant help you :/'}
  }
}

export const getStudentDetails = async (id: string) => {
  const { data, error, status } = await supabase
  .from("users")
  .select(`id, username, teacher, teacher_id`)
  .eq("id", id);
  return { data, error, status };
}

export const getHomework = async (id: string) => {
  const { data, error, status } = await supabase
  .from("homeworks")
  .select(`homework`)
  .eq("id", id);
  return { data, error, status };
}

export const addHomework = async (id: string, homework: string, currentHomework:any) => {
  const key = Date.now()
  const { error } = await supabase
  .from("homeworks")
  .update({
    "homework":[...currentHomework, {[key]: homework}]
  })
  .eq("id", id)
  return { error }
}

export const setHomeworkData = async (path: string, file: File) => {
  let { error } = await supabase.storage.from("homeworkdata").upload(path, file);
  return { error };
};

export const getHomeworkData = async (path: string) => {
  const { data, error } = await supabase.storage.from("homeworkdata").download(path);
  return { data, error };
};


export const getHomeworks = async () => {
  const { data, error } = await supabase
  .storage
  .from('homeworkdata')
  .list()
  return { data, error };
};