import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import Image from "next/legacy/image";
import { Product } from "../../models";
import { ListAltOutlined } from "@mui/icons-material";


async function ListProductsPage() {
  let products: Product[] | undefined;
  try {
    const response = await fetch(`${process.env.PRODUCTS_API_URL}/product`, {
      next: { revalidate: 30 }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    products = await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  
  return (
    <Grid2 container spacing={2}>
      {products?.length === 0 && (
        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h5">No products found</Typography>
        </Grid2>
      )}
      {products?.map((product: any, key: any) => (
        <Grid2 xs={12} sm={6} md={4} key={key}>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingTop: "56.25%",
              }}
            >
              <Image
                src={product.image_url}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                priority
              />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography
                sx={{
                  color: "primary.main",
                }}
              >
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Link
                href={`/products/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small" startIcon={<ListAltOutlined />}>
                  Details
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ListProductsPage