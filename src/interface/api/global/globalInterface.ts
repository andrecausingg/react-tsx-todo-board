// Start MutatePayload
export interface MutatePayloadInterface {
  payload: any;
  api: string;
  method: string;
  is_fetch_enable: boolean;
}
// End MutatePayload

// Start Api Success
export interface ApiSuccessInterface {
  title_message: string;
  message: string;
  date_time?: string;
  // data: Data[];
  data: any;
  pagination?: Pagination;
  filters?: Filter;
  filter_keys?: FilterKey[]; // <- fixed type
  relative_buttons?: RelativeButtons;

  // Eu device
  eu_device?: string;
}

export interface FilterKey {
  label: string;
  value: string;
}

export interface Data {}

export interface Pagination {
  count: number;
  has_page: boolean;
  has_more_pages: boolean;
  current_page: number;
  last_page: number;
  per_page: number;
  next_page_url: any;
  previous_page_url: any;
}

export type Filter = any;

export type RelativeButtons = any;
// End Api Success

// Start Api Error
export interface ApiErrorInterface {
  title_message?: string;
  message: string;
  errors?: Record<string, string[]>;
}
// End Api Error

// Start Query param index
export interface QueryParamIndexInterface {
  target_query?: string;
  page?: number;
  size?: number;
  arr_like?: any[];
  arr_equal?: any[];
  arr_date?: ArrDate[];
  eu_device?: string;
}

export interface ArrDate {
  created_at?: CreatedAt;
  updated_at?: UpdatedAt;
}

export interface CreatedAt {
  start_date: string;
  end_date: string;
}

export interface UpdatedAt {
  start_date: string;
  end_date: string;
}
// End Query param index

// Start setting config react tanstack query. USE QUERY
export interface SettingUseQuery {
  enabled?: boolean;
  staleTime?: number;
  refetchInterval?: number | false;
  refetchIntervalInBackground?: boolean;
}

// End setting config react tanstack query. USE QUERY

// Start Query Api
export type QueryApiType = string;
// End Query Api
