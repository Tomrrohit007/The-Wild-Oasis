import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase
    .from("cabin")
    .select("*")
    .order("created_at");
  if (error) {
    console.error(error);
    throw new Error("Could not get cabins");
  }
  return data;
};

export const createEditCabins = async (newCabin, id) => {
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    "-"
  );

  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  let query = await supabase.from("cabin");
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Could not create cabins");
  }
  if (hasImage) return data;

  const { error: fileError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (fileError) {
    await supabase.from("cabin").delete().eq("id", newCabin.id);
    throw new Error("Unable to upload image and create new cabin");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabin").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Could not delete cabin");
  }
};
