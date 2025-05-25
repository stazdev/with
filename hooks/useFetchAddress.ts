import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAddresses,
  setActiveAddress,
  getActiveAddress,
} from "@/services/addressService";

export const useFetchAddress = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });
};
export const useFetchActiveAddress = () => {
  return useQuery({
    queryKey: ["activeAddress"],
    queryFn: getActiveAddress,
  });
};
export const useSetActiveAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setActiveAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
      queryClient.invalidateQueries("activeAddress");
    },
  });
};
