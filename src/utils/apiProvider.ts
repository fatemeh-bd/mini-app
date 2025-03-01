
import axios, { AxiosRequestConfig, Method } from "axios";

// export const BASE_URL = "https://botapi.zeroai.ir"; //Production
export const BASE_URL = "https://localhost:7044"; // Development

interface RequestOptions {
  method: Method;
  endpoint: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

export const apiRequest = async <T>({ method, endpoint, headers = {}, body, params }: RequestOptions): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers,
      data: body,
      params,
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};