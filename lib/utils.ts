import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SupabaseClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type Message = {
  id: number;
  type: "modelResponse" | "userPrompt";
  text: string;
};
type Part = {
  text: string;
};
export type ChatHistoryMessage = {
  role: "user" | "assistant" | "system" | "data";
  content: string;
};

export class AmadeusClass {
  private key: string;
  private secret: string;

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  async getAccessToken() {
    const tokenHeaders = new Headers();
    tokenHeaders.append("content-type", "application/x-www-form-urlencoded");

    const responseToken = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: tokenHeaders,
        body: `grant_type=client_credentials&client_id=${this.key}&client_secret=${this.secret}`,
      }
    );

    const data = await responseToken.json();
    if (!data.access_token) {
      // console.log("Error ");
      return {
        error: new Error("Could not generate access token"),
        token: null,
      };
    }
    return { error: null, token: `${data.token_type} ${data.access_token}` };
  }

  async getFlights({
    origin,
    destination,
    date,
  }: {
    origin: string;
    destination: string;
    date: string;
  }) {
    /*
    Function Adapter for endpoint: v2/shopping/flight-offers
    origin: origin location airport's IATA code
    destination: destination location airport's IATA code
    date: departure date in YYYY-MM-DD format
    */
    const { token, error } = await this.getAccessToken(); // `${data.token_type} ${data.access_token}`;
    if (error) {
      console.log("Could not get API access token");
      return;
    }

    const searchHeaders = new Headers();
    searchHeaders.append("Authorization", token);

    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${date}&adults=1&max=3`;
    const searchResponse = await fetch(url, {
      method: "GET",
      headers: searchHeaders,
    });

    const searchResults = await searchResponse.json();
    console.log(searchResults);

    return searchResults.data;
  }
  async getHotelsList(cityCode: string) {
    const { token, error } = await this.getAccessToken();
    if (error) {
      console.log("Could not get API access token");
      return;
    }
    const searchHeaders = new Headers();
    searchHeaders.append("Authorization", token);

    const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`;
    const searchResponse = await fetch(url, {
      method: "GET",
      headers: searchHeaders,
    });

    const searchResults = await searchResponse.json();
    console.log(searchResults);
    console.log(searchResults.data);

    return searchResults.data;
  }

  async getHotelOffer(hotelId: string) {
    const { token, error } = await this.getAccessToken();
    if (error) {
      console.log("Could not get API access token");
      return;
    }
    const searchHeaders = new Headers();
    searchHeaders.append("Authorization", token);

    const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}`;
    const searchResponse = await fetch(url, {
      method: "GET",
      headers: searchHeaders,
    });

    const searchResults = await searchResponse.json();
    console.log(searchResults);

    if (
      searchResults.data.errors &&
      searchResults.data.errors[0].code === 3664
    ) {
      return {
        result: "no rooms",
      };
    }
    return searchResults.data;
  }
}

export type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
};

export const getSession = async (
  supabase: SupabaseClient<any, "public", any>
) => {
  const { error } = await supabase.auth.getUser();
  if (error) {
    console.log("Error getting user object (/welcome header): ", error.message);
    return false;
  }
  return true;
};

export const getUserMetadata = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return { error, user: null };
  }
  return { user: user.user_metadata, error: null };
};
