import { getBillboard } from "@/actions/get-billboards";
import { getProducts } from "@/actions/get-products";
import Container from "@/components/helpers/container";
import Billboard from "@/components/ui/billboard";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("4e23f157-dd3f-4652-afd8-aa3b27537a24");
  
  if(!billboard){
    return null;
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {/* <ProductList title="Featured Products" items={products} /> */}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
