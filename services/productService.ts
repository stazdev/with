import apiClient from "@/api/apiClient";
import {
  ProductCategoriesResponse,
  ProductsByCategoryResponse,
  ProductDetailsResponse,
  AddFavoriteFolderResponse,
} from "@/interfaces/product";

export const fetchProductCategories =
  async (): Promise<ProductCategoriesResponse> => {
    try {
      const response = await apiClient.get<ProductCategoriesResponse>(
        "Products/categories"
      );

      if (!response.data.status) {
        throw new Error(
          response.data.message || "Failed to fetch product categories"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching product categories:", error);
      throw error;
    }
  };

export const fetchProductsByCategory = async (
  categoryId: number
): Promise<ProductsByCategoryResponse> => {
  try {
    const response = await apiClient.get<ProductsByCategoryResponse>(
      `Products/categories/${categoryId}`
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch products by category"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const fetchProductDetails = async (
  productId: number
): Promise<ProductDetailsResponse> => {
  try {
    const response = await apiClient.get<ProductDetailsResponse>(
      `Products/${productId}`
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch product details"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

export const addFavoriteFolder = async (
  folderName: string
): Promise<AddFavoriteFolderResponse> => {
  try {
    const response = await apiClient.post<AddFavoriteFolderResponse>(
      "Products/add-favorite-folder",
      { name: folderName }
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to create favorite folder"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error creating favorite folder:", error);
    throw error;
  }
};

interface FavoriteFoldersResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    name: string;
    id: number;
  }>;
}

export const fetchFavoriteFolders =
  async (): Promise<FavoriteFoldersResponse> => {
    try {
      const response = await apiClient.get<FavoriteFoldersResponse>(
        "Products/favorite-folders"
      );

      if (!response.data.status) {
        throw new Error(
          response.data.message || "Failed to fetch favorite folders"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching favorite folders:", error);
      throw error;
    }
  };

interface AddFavoriteResponse {
  status: boolean;
  message: string;
  statusCode: number;
}

interface AddFavoriteRequest {
  folderId: number;
  productId: number;
}

export const addProductToFavorite = async (
  data: AddFavoriteRequest
): Promise<AddFavoriteResponse> => {
  try {
    const response = await apiClient.post<AddFavoriteResponse>(
      "Products/add-favorite",
      data
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to add product to favorites"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error;
  }
};

interface RemoveFavoriteResponse {
  status: boolean;
  message: string;
  statusCode: number;
}

interface RemoveFavoriteRequest {
  productId: number;
}

export const removeProductFromFavorite = async (
  data: RemoveFavoriteRequest
): Promise<RemoveFavoriteResponse> => {
  try {
    console.log("Request payload:", data); // Log the request payload
    const response = await apiClient.delete<RemoveFavoriteResponse>(
      `Products/remove-favorite?productId=${data.productId}`
    );
    console.log("Response:", response.data); // Log the response

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to remove product from favorites"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error removing product from favorites:", error);
    throw error;
  }
};

interface MyFavoritesResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    folderId: number;
    folderName: string;
    totalProducts: number;
    productImages: string[];
  }>;
}

export const fetchMyFavorites = async (): Promise<MyFavoritesResponse> => {
  try {
    const response = await apiClient.get<MyFavoritesResponse>(
      "Products/my-favorites"
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch favorite folders"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching my favorites:", error);
    throw error;
  }
};

interface RecommendedProductsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    id: number;
    name: string;
    description: string;
    discountPercentage: number;
    unitPrice: number;
    color: string;
    colorValue: string;
    storeName: string;
    isFavorite: boolean;
    productImages: Array<{
      imageUrl: string;
      name: string;
    }>;
    jaraExtras: {
      name: string;
      value: string;
    };
  }>;
}

export const fetchRecommendedProducts =
  async (): Promise<RecommendedProductsResponse> => {
    try {
      const response = await apiClient.get<RecommendedProductsResponse>(
        "Products/recommend"
      );

      if (!response.data.status) {
        throw new Error(
          response.data.message || "Failed to fetch recommended products"
        );
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching recommended products:", error);
      throw error;
    }
  };

interface BannerResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    name: string;
    id: number;
  }>;
}

export const fetchBanners = async (): Promise<BannerResponse> => {
  try {
    const response = await apiClient.get<BannerResponse>("/Products/banners");

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch banners");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    throw error;
  }
};

interface FavoritesByFolderResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: Array<{
    productImages: string;
    productId: number;
    name: string;
    description: string;
    discountPercentage: number;
    unitPrice: number;
    folderId: number;
  }>;
  errors: string[];
}

export const fetchFavoritesByFolder = async (
  folderId: number
): Promise<FavoritesByFolderResponse> => {
  try {
    const response = await apiClient.get<FavoritesByFolderResponse>(
      `Products/favorites?FolderId=${folderId}`
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch favorites by folder"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching favorites by folder:", error);
    throw error;
  }
};
