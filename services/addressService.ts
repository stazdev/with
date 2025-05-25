import apiClient from "@/api/apiClient";

export const getAddresses = async (): Promise<{
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    addressesResponses: {
      customerDeliveryAddressId: number;
      address: string;
      city: string;
      country: string;
      latitude: string;
      longitude: string;
      postalCode: string;
      isActive: boolean;
    }[];
    type: string;
  }[];
}> => {
  const response = await apiClient.get<{
    status: boolean;
    statusCode: number;
    message: string;
    data: {
      addressesResponses: {
        customerDeliveryAddressId: number;
        address: string;
        city: string;
        country: string;
        latitude: string;
        longitude: string;
        postalCode: string;
        isActive: boolean;
      }[];
      type: string;
    }[];
  }>("Address");

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to fetch addresses");
  }

  return response.data;
};

export const setActiveAddress = async (
  addressId: number
): Promise<{
  status: boolean;
  statusCode: number;
  message: string;
}> => {
  const response = await apiClient.patch<{
    status: boolean;
    statusCode: number;
    message: string;
  }>(`Address/${addressId}/set-active`);

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to set address as active");
  }

  return response.data;
};

export const getActiveAddress = async (): Promise<{
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    customerDeliveryAddressId: number;
    type: string;
    address: string;
    city: string;
    country: string;
    latitude: string;
    longitude: string;
    postalCode: string;
    isActive: boolean;
  };
}> => {
  const response = await apiClient.get<{
    status: boolean;
    statusCode: number;
    message: string;
    data: {
      customerDeliveryAddressId: number;
      type: string;
      address: string;
      city: string;
      country: string;
      latitude: string;
      longitude: string;
      postalCode: string;
      isActive: boolean;
    };
  }>("Address/active");

  if (!response.data.status) {
    throw new Error(response.data.message || "Failed to fetch active address");
  }

  return response.data;
};
