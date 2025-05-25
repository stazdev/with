import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchStoreTypes,
  fetchStoresByType,
  fetchTopRatedStores,
  fetchFollowedStores,
  followStore,
  unfollowStore,
  fetchStoreProducts,
  fetchStore,
} from "@/services/storeService";

export const useFetchStoreTypes = () => {
  return useQuery({
    queryKey: ["storeTypes"],
    queryFn: fetchStoreTypes,
  });
};

export const useFetchStoresByType = (storeTypeId: number) => {
  return useQuery({
    queryKey: ["stores", storeTypeId],
    queryFn: () => fetchStoresByType(storeTypeId),
  });
};

export const useFetchTopRatedStores = () => {
  return useQuery({
    queryKey: ["topRatedStores"],
    queryFn: fetchTopRatedStores,
  });
};

export const useFetchFollowedStores = () => {
  return useQuery({
    queryKey: ["followedStores"],
    queryFn: fetchFollowedStores,
  });
};

export const useFollowStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: followStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followedStores"] });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
  });
};

export const useUnfollowStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unfollowStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followedStores"] });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
  });
};

export const useFetchStoreProducts = (storeId: number) => {
  return useQuery({
    queryKey: ["storeProducts", storeId],
    queryFn: () => fetchStoreProducts(storeId),
  });
};
export const useFetchStore = (storeId: number) => {
  return useQuery({
    queryKey: ["store", storeId],
    queryFn: () => fetchStore(storeId),
  });
};
