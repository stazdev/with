export interface SignupFormValues {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
export interface SigninFormValues {
  email: string;
  password: string;
}
export interface NewPasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export interface ForgotPasswordValues {
  email: string;
}
export interface AccountInfoFormValues {
  fullName?: string;
  dob?: string;
  gender?: string;
}
export interface AddressInfoFormValues {
  shippingAddress?: string;
  billingAddress?: string;
}
export interface AddDeliveryAddressValues {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  postCode?: string;
  city: string;
  country: string;
}
export interface UpdateCartRequest {
  cartId: number;
  quantity: number;
  price: number;
}

export interface UpdateCartResponse {
  status: boolean;
  message: string;
  statusCode: number;
}
export interface FetchCartResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    countCartQuantity: number;
    orderCartStore: Array<{
      storeId: number;
      totalPrice: number;
      storeName: string;
      totalItem: number;
      orderCartProducts: Array<{
        id: number;
        price: number;
        productName: string;
        quantity: number;
        cartSessionId: string;
        image: string;
        cartId: number;
      }>;
    }>;
  };
}

export interface AddCartRequest {
  cartSessionId: string;
  productId: number;
  quantity: number;
  price: number;
}

export interface AddCartResponse {
  status: boolean;
  message: string;
  statusCode: number;
}
export interface DeleteCartResponse {
  status: boolean;
  message: string;
  statusCode: number;
}
export interface GetProfileResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: {
    email: string;
    fullName: string;
    phoneNumber: string;
    gender: string;
    profileImage: string;
    bio: string;
    dateOfBirth: string;
  };
  errors: string[];
}
export interface CheckoutRequest {
  storeId: number;
  shippingAddressId: number;
  cartSessionId: string;
  promoCode: string;
  customerIPAddress: string;
  paymentType: number;
  shippingFees: number;
  totalPrice: number;
}

export interface CheckoutResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: {
    referenceNumber: string;
    checkoutUrl: string;
    paymentType: string;
  };
  errors: string[];
}

export interface ReviewRequest {
  productId: number;
  storeId: number;
  deliveryAgentId: number;
  content: string;
  photo: string;
  rating: number;
  reviewType: number;
}

export interface ReviewResponse {
  status: boolean;
  message: string;
  statusCode: number;
}
