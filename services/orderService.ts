import apiClient from "@/api/apiClient";
import {
  AddCartRequest,
  AddCartResponse,
  DeleteCartResponse,
  FetchCartResponse,
  UpdateCartRequest,
  UpdateCartResponse,
  CheckoutRequest,
  CheckoutResponse,
  ReviewRequest, // Add this import
  ReviewResponse, // Add this import
} from "@/interfaces/types";

export const addCart = async (
  data: AddCartRequest
): Promise<AddCartResponse> => {
  try {
    const response = await apiClient.post<AddCartResponse>(
      "/Orders/add-cart",
      data
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to add item to cart");
    }

    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const fetchCart = async (
  cartSessionId: string
): Promise<FetchCartResponse> => {
  try {
    const response = await apiClient.get<FetchCartResponse>(
      `/Orders/carts?cartSessionId=${cartSessionId}`
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch cart items");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

export const updateCart = async (
  data: UpdateCartRequest
): Promise<UpdateCartResponse> => {
  try {
    const response = await apiClient.patch<UpdateCartResponse>(
      "Orders/update-cart",
      data
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to update cart item");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const deleteCart = async (
  cartId: number
): Promise<DeleteCartResponse> => {
  try {
    const response = await apiClient.delete<DeleteCartResponse>(
      `Orders/delete-cart?cartId=${cartId}`
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to delete cart item");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting cart item:", error);
    throw error;
  }
};

export const checkout = async (
  data: CheckoutRequest
): Promise<CheckoutResponse> => {
  try {
    const response = await apiClient.post<CheckoutResponse>(
      "/Orders/checkout",
      data
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to checkout");
    }

    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};

export const submitReview = async (
  data: ReviewRequest
): Promise<ReviewResponse> => {
  try {
    const response = await apiClient.post<ReviewResponse>(
      "/Orders/review",
      data
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to submit review");
    }

    return response.data;
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error;
  }
};

export const fetchOrders = async (ordersEnum: number) => {
  try {
    const response = await apiClient.get(
      `/Orders/my-orders?ordersEnum=${ordersEnum}`
    );

    if (!response.data.status) {
      throw new Error(response.data.message || "Failed to fetch orders");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
