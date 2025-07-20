import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const Amadeus = require("amadeus");
export const amadeus = new Amadeus({
  clientId: process.env.NEXT_PUBLIC_AMADEUS_KEY,
  clientSecret: process.env.NEXT_PUBLIC_AMADEUS_SECRET,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export interface Message {
  id: number;
  type: "modelResponse" | "userPrompt";
  text: string;
}
interface Part {
  text: string;
}
export interface ChatHistoryMessage {
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

class AmadeusClass {
  async getAccessToken() {
    const tokenHeaders = new Headers();
    tokenHeaders.append("content-type", "application/x-www-form-urlencoded");

    const responseToken = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: tokenHeaders,
        body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_AMADEUS_KEY}&client_secret=${process.env.NEXT_PUBLIC_AMADEUS_SECRET}`,
      }
    );

    const data = await responseToken.json();
    return `${data.token_type} ${data.access_token}`;
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
    const token = await this.getAccessToken(); // `${data.token_type} ${data.access_token}`;

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
    const token = await this.getAccessToken();

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
    const token = await this.getAccessToken();

    const searchHeaders = new Headers();
    searchHeaders.append("Authorization", token);

    const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelId}`;
    const searchResponse = await fetch(url, {
      method: "GET",
      headers: searchHeaders,
    });

    const searchResults = await searchResponse.json();
    console.log(searchResults);

    return searchResults.data;
  }
}

export const AmadeusAPI = new AmadeusClass();
