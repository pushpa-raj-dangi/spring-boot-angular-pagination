export interface ApiResponse<T> {
  timeStamp: string;
  statusCode: string;
  status: number;
  message: string;
  data: { page: T };
}
