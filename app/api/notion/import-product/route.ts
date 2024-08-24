import { NextRequest, NextResponse } from 'next/server';
import { Client } from "@notionhq/client";
import { ProductFormData } from '@/src/types/product';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const productId = searchParams.get('id');
      
      if (!productId) {
        return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
      }
      
      if (!databaseId) {
        return NextResponse.json({ error: 'Notion database ID is not configured' }, { status: 500 });
      }
      
      console.log(`Searching for product with ID: ${productId}`);
      
      const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'ID',
          number: {
            equals: parseInt(productId)
          }
        }
      });
      
      console.log(`Notion API response:`, JSON.stringify(response, null, 2));
      
      if (response.results.length === 0) {
        return NextResponse.json({ error: 'Product not found in Notion database' }, { status: 404 });
      }
      
      const productPage = response.results[0];
      const product = convertNotionPageToProduct(productPage);
      
      return NextResponse.json(product);
    } catch (error: unknown) {
      console.error('Error importing product from Notion:', error);
      
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = error.message as string;
      }
      
      console.error('Detailed error information:', {
        error,
        errorMessage,
        stack: error instanceof Error ? error.stack : 'No stack trace available'
      });
      
      return NextResponse.json({ error: 'Error importing product from Notion', details: errorMessage }, { status: 500 });
    }
  }
  
  function convertNotionPageToProduct(page: any): ProductFormData {
    try {
      const product: ProductFormData = {
        id: page.properties.ID.number?.toString() || '',
        name: page.properties.Name.title[0]?.plain_text || '',
        brand: page.properties.Brands.rich_text[0]?.plain_text || '',
        price: page.properties.Price.number || 0,
        rating: page.properties['Rating '].number || 0,
        shortDescription: page.properties['Short Description '].rich_text[0]?.plain_text || '',
        originalPrice: page.properties['Original Price'].number || 0,
        color: page.properties['Color '].rich_text[0]?.plain_text || '',
        category: page.properties.Category.select?.name || '',
        subcategory: page.properties['Subcategory '].select?.name || '',
        image: null,
        images: null,
        fullDescription: page.properties['Full Description '].rich_text[0]?.plain_text || '',
        seller: page.properties['Seller '].rich_text[0]?.plain_text || '',
        hasStock: page.properties['Has Stock '].checkbox || false,
        stock: page.properties.Stock.number || null,
      };
  
      console.log('Converted product:', product);
      return product;
    } catch (error) {
      console.error('Error converting Notion page to product:', error);
      console.error('Problematic page data:', JSON.stringify(page, null, 2));
      throw error;
    }
  }