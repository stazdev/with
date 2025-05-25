import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductCategories,
  fetchProductsByCategory,
  fetchProductDetails,
  addProductToFavorite,
  fetchFavoriteFolders,
  fetchMyFavorites,
  fetchRecommendedProducts,
  removeProductFromFavorite,
  fetchBanners,
  fetchFavoritesByFolder, // Add this import
} from "@/services/productService";

export const useFetchProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: fetchProductCategories,
  });
};

export const useFetchProductsByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["productsByCategory", categoryId],
    queryFn: () => fetchProductsByCategory(categoryId),
  });
};

export const useFetchProductDetails = (productId: number) => {
  return useQuery({
    queryKey: ["productDetails", productId],
    queryFn: () => fetchProductDetails(productId),
  });
};

export const useFetchFavoriteFolders = () => {
  return useQuery({
    queryKey: ["favoriteFolders"],
    queryFn: fetchFavoriteFolders,
  });
};

export const useAddToFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductToFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteFolders"] });
      queryClient.invalidateQueries({ queryKey: ["myFavorites"] });
      queryClient.invalidateQueries({ queryKey: ["productsByCategory"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedProducts"] });
    },
  });
};

export const useRemoveFromFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProductFromFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoriteFolders"] });
      queryClient.invalidateQueries({ queryKey: ["myFavorites"] });
      queryClient.invalidateQueries({ queryKey: ["productsByCategory"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedProducts"] });
    },
  });
};

export const useFetchMyFavorites = () => {
  return useQuery({
    queryKey: ["myFavorites"],
    queryFn: fetchMyFavorites,
  });
};

export const useFetchRecommendedProducts = () => {
  return useQuery({
    queryKey: ["recommendedProducts"],
    queryFn: fetchRecommendedProducts,
  });
};

export const useFetchBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
  });
};

export const useFetchFavoritesByFolder = (folderId: number) => {
  return useQuery({
    queryKey: ["favoritesByFolder", folderId],
    queryFn: () => fetchFavoritesByFolder(folderId),
  });
};
