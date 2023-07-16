import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEditCabins,
  deleteCabin,
  getCabins,
} from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const getCabinHook = () => {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return { isLoading, cabins, error };
};

export const deleteCabinHook = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteFunc } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deleteFunc };
};

export const editCabinHook = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editFunc } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabins(newCabin, id),
    onSuccess: () => {
      toast.success("Successfully Updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isEditing, editFunc };
};

export const createCabinHook = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createFunc } = useMutation({
    mutationFn: createEditCabins,
    onSuccess: () => {
      toast.success("Successfully Created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createFunc };
};
