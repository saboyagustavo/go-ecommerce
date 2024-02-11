import { NextRequest, NextResponse } from "next/server";
import { ProductService } from "../../../services/product.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('search') as string;
  const category_id = searchParams.get('category_id') as string;

  const productService = new ProductService();
  const products = await productService.getProducts(search, category_id);
  return NextResponse.json(products);
}
