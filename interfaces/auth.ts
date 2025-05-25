export interface SignUpResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: {
    id: string;
    email: string;
  };
  errors?: string[];
  [key: string]: any;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}
export interface VerifyEmailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: {
    id: string;
    email: string;
  };
  errors: [string];
}
export interface CompleteSignupRequest {
  email: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  address: {
    shippingAddress: string;
    billingAddress: string;
  };
}

export interface CompleteSignupResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: {
    authId: string;
    customerId: number;
    fullName: string;
    token: string;
    phoneNumber: string;
    email: string;
  };
  errors?: string[];
}
