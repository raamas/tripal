import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("Error getting user object (api/users/me): ", error);
    return Response.json({ status: 400, message: error.message });
  }
  console.log(data);
  return Response.json({ ...data.user.user_metadata });
}
