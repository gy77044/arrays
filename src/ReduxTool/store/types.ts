export interface ICalculate<T> {
  isLoading: boolean
  data: T,
  isError: boolean
}
  
export interface IApiResponse<T> {
  code: string;
  message: string;
  responseData: T;
}