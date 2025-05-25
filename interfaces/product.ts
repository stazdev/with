export interface ProductCategory {
  name: string;
  image: string;
  id: number;
}

export interface ProductCategoriesResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: ProductCategory[];
  errors: string[];
}

export interface ProductImage {
  imageUrl: string;
  name: string;
}

export interface Product {
  productImages: ProductImage[];
  id: number;
  name: string;
  description: string;
  discountPercentage: number;
  unitPrice: number;
  color: string;
  colorValue: string;
  storeName: string;
  isFavorite: boolean;
}

export interface ProductsByCategoryResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: Product[];
  errors: string[];
}

export interface ProductionSpecification {
  name: string;
  unit: string;
  description: string;
}

export interface ReviewerDetails {
  reviewerName: string;
  reviewerPhoto: string;
}

export interface Review {
  reviewTime: string;
  reviewDate: string;
  reviewerDetails: ReviewerDetails;
  review: string;
  rating: number;
}

export interface ProductReviewDetails {
  totalReview: number;
  maxRating: number;
  reviews: Review[];
}

export interface ProductDetails {
  productImages: ProductImage[];
  id: number;
  name: string;
  description: string;
  discountPercentage: number;
  unitPrice: number;
  color: string;
  colorValue: string;
  storeName: string;
  storeAddress: string;
  storeCoverImage: string;
  productionSpecifications: ProductionSpecification[];
  categoryId: number;
  productReviewDetails: ProductReviewDetails;
  productCode: string;
  serialNumber: string;
}

export interface ProductDetailsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: ProductDetails;
  errors: string[];
}

export interface AddFavoriteFolderResponse {
  status: boolean;
  message: string;
  statusCode: number;
}
