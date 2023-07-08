import supabase from "./supabase";

export const getCabins = async () => {
  let { data, error } = await supabase.from("cabin").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not get cabins");
  }
  return data;
};
