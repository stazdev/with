export interface StoreType {
  name: string;
  id: number;
}

export interface StoreTypesResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: StoreType[];
  errors: string[];
}
export interface Store {
  id: number;
  storeName: string;
  storeOwner: string;
  coverImage: string;
  storeWebSiteUrl: string;
}
export interface TopStore {
  id: number;
  storeName: string;
  storeOwner: string;
  coverImage: string;
  storeWebSiteUrl: string;
  rating: number;
  storeType: string;
}

export interface StoresResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: Store[];
  errors: string[];
}

export interface StoreResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    totalFollowers: number;
    totalProducts: number;
    id: number;
    storeName: string;
    storeOwner: string;
    coverImage: string;
    storeWebSiteUrl: string;
  };
}

export interface TopRatedStoreResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: TopStore[];
  errors: string[];
}

export interface FavoriteStore {
  id: number;
  storeName: string;
  storeOwner: string;
  totalFollowers: number;
  isFollowing: boolean;
  coverImage: string;
}

export interface FavoriteStoreResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  currentPage: number;
  data: FavoriteStore[];
  errors: string[];
}

export interface FollowStoreResponse {
  status: boolean;
  message: string;
  statusCode: number;
}

export interface StoreProductImage {
  imageUrl: string;
  name: string | null;
}

export interface StoreProduct {
  id: number;
  name: string;
  description: string;
  discountPercentage: number;
  unitPrice: number;
  color: string | null;
  colorValue: string | null;
  storeName: string;
  isFavorite: boolean;
  productImages: StoreProductImage[];
}

export interface StoreProductsResponse {
  status: boolean;
  statusCode: number;
  message: string;
  totalRecord: number;
  pages: number;
  currentPageCount: number;
  data: StoreProduct[];
}
