
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import dotenv from "dotenv";

dotenv.config();

async function testConnection() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  console.log("Testing connection with:", {
    storeDomain,
    publicAccessToken: publicAccessToken ? publicAccessToken.slice(0, 5) + "..." : "MISSING",
  });

  const client = createStorefrontApiClient({
    storeDomain,
    publicAccessToken,
    apiVersion: "2025-01", // Using a current supported version
  });

  const query = `
    query Products {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  try {
    const response = await client.request(query);
    console.log("Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

testConnection();
