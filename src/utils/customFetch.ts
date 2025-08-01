import { BASE_API_URL } from "../constants/config";

export async function customFetch<T>(url: string): Promise<T> {
  try {
    const response = await fetch(BASE_API_URL + url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
