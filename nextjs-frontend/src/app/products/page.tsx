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
import { ListAltOutlined } from "@mui/icons-material";
import { ProductService } from "@/services/product.service";

async function ListProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category_id?: string };
}) {
  const productService = new ProductService();
  const products = await productService.getProductsViaNextApi(
    searchParams.search,
    searchParams.category_id
  );
  
  return (
    <Grid2 container spacing={2}>
      {(!products || products?.length === 0) && (
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