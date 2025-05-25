import apiClient from "@/api/apiClient";
import {
  StoresResponse,
  StoreTypesResponse,
  TopRatedStoreResponse,
  FavoriteStoreResponse,
  FollowStoreResponse,
  StoreProductsResponse,
  StoreResponse,
} from "@/interfaces/store";

export const fetchStoreTypes = async (): Promise<StoreTypesResponse> => {
  try {
    const response = await apiClient.get<StoreTypesResponse>("/Stores/types");

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch store types");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching store types:", error);
    throw error;
  }
};

export const fetchStoresByType = async (
  storeTypeId: number
): Promise<StoresResponse> => {
  try {
    const response = await apiClient.get<StoresResponse>(
      `Stores?storeTypeId=${storeTypeId}`
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch stores");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};
export const fetchStore = async (storeId: number): Promise<StoreResponse> => {
  try {
    const response = await apiClient.get<StoreResponse>(`Stores/${storeId}`);

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch store");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching store:", error);
    throw error;
  }
};

export const fetchTopRatedStores = async (): Promise<TopRatedStoreResponse> => {
  try {
    const response = await apiClient.get<TopRatedStoreResponse>(
      "Stores/top-rated"
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch top-rated stores"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated stores:", error);
    throw error;
  }
};

export const fetchFollowedStores = async (): Promise<FavoriteStoreResponse> => {
  try {
    const response = await apiClient.get<FavoriteStoreResponse>(
      "Stores/followed-stores"
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch favorite stores"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching favorite stores:", error);
    throw error;
  }
};

interface FollowUnfollowResponse {
  status: boolean;
  message: string;
  statusCode: number;
}

export const followStore = async (
  storeId: number
): Promise<FollowUnfollowResponse> => {
  try {
    const response = await apiClient.patch<FollowUnfollowResponse>(
      "Stores/follow-store",
      {
        storeId,
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to follow store");
    }

    return response.data;
  } catch (error) {
    console.error("Error following store:", error);
    throw error;
  }
};

export const unfollowStore = async (
  storeId: number
): Promise<FollowUnfollowResponse> => {
  try {
    const response = await apiClient.patch<FollowUnfollowResponse>(
      "Stores/unfollow-store",
      {
        storeId,
      }
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to unfollow store");
    }

    return response.data;
  } catch (error) {
    console.error("Error unfollowing store:", error);
    throw error;
  }
};

export const fetchStoreProducts = async (
  storeId: number
): Promise<StoreProductsResponse> => {
  try {
    const response = await apiClient.get<StoreProductsResponse>(
      `/Stores/products?StoreId=${storeId}`
    );

    if (!response.data.status) {
      throw new Error(
        response.data.message || "Failed to fetch store products"
      );
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching store products:", error);
    throw error;
  }
};
