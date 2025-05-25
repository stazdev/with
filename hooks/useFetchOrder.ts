import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addCart,
  fetchCart,
  updateCart,
  deleteCart,
  checkout,
  submitReview,
  fetchOrders,
} from "@/services/orderService";
import {
  CheckoutResponse,
  ReviewRequest,
  ReviewResponse,
} from "@/interfaces/types";

export const useAddToCart = (onSuccess: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCart,
    onSuccess: (data) => {
      console.log("Item added to cart successfully:", data);
      queryClient.invalidateQueries(["cart"]);
      onSuccess(data.message);
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
    },
  });
};

export const useFetchCart = (cartSessionId: string) => {
  return useQuery({
    queryKey: ["cart", cartSessionId],
    queryFn: () => fetchCart(cartSessionId),
  });
};

export const useUpdateCart = (onSuccess: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      console.log("Cart item updated successfully:", data);
      queryClient.invalidateQueries(["cart"]);
      onSuccess(data.message);
    },
    onError: (error) => {
      console.error("Error updating cart item:", error);
    },
  });
};

export const useDeleteCart = (onSuccess: (message: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCart,
    onSuccess: (data) => {
      console.log("Cart item deleted successfully:", data);
      queryClient.invalidateQueries(["cart"]);
      onSuccess(data.message);
    },
    onError: (error) => {
      console.error("Error deleting cart item:", error);
    },
  });
};

export const useCheckout = (onSuccess: (data: CheckoutResponse) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
      queryClient.invalidateQueries(["cart"]);
      onSuccess(data);
    },
    onError: (error) => {
      console.error("Error during checkout:", error);
    },
  });
};

export const useSubmitReview = (onSuccess: (message: string) => void) => {
  return useMutation({
    mutationFn: submitReview,
    onSuccess: (data) => {
      console.log("Review submitted successfully:", data);
      onSuccess(data.message);
    },
    onError: (error) => {
      console.error("Error submitting review:", error);
    },
  });
};

export const useFetchOrders = (ordersEnum: number) => {
  return useQuery({
    queryKey: ["orders", ordersEnum],
    queryFn: () => fetchOrders(ordersEnum),
  });
};
