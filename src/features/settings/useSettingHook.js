import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting as updateSettingApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export const useSettings = () => {
  const { data:settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return {settings, isLoading}
};

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("Successfully Updated");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
    return { isUpdating, updateSetting };
};
