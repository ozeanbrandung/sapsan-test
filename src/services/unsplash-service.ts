interface IUnsplashError {
  errors: string[];
}

interface IUnsplashSearchResult {
  total: number;
  total_pages: number;
  results: {
    id: string;
    alt_description: string;
    urls: {
      regular: string;
      full: string;
      small: string;
      thumb: string;
    };
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorUnsplashError(error: any): error is IUnsplashError {
  return "errors" in error;
}

class UnsplashService {
  private baseUrl: string;
  private client_id: string = import.meta.env.VITE_UNSPLASH_CLIENT_ID;
  constructor() {
    this.baseUrl = "https://api.unsplash.com";
  }

  private async fetchFromUnsplash(url: string, params = {}):Promise<IUnsplashSearchResult> {
    const queryParams = new URLSearchParams(params).toString();
    const fullUrl = `${this.baseUrl}${url}?${queryParams}`;
    //   const headers = {
    //     Authorization: `Client-ID ${this.accessToken}`,
    //   };

    try {
      const response = await fetch(fullUrl /*, { headers }*/);
      if (!response.ok) {
        throw new Error(`Ошибка при запросе к API: ${response.status}`);
      }
      return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (isErrorUnsplashError(error)) {
        console.error("Ошибка при работе с API Unsplash:", error.errors);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  async searchPhotos(query: string, page = 1 /*, perPage = 10*/) {
    if (!query) {
      throw new Error("Поисковый запрос не может быть пустым");
    }

    const params = {
      query,
      page,
      client_id: this.client_id,
      //per_page: perPage
    };

    return this.fetchFromUnsplash("/search/photos", params);
  }
}

export default UnsplashService;
