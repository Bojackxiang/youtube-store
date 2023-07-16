import Link from "next/link";

import MainNav from "@/components/helpers/main-nav";

// import NavbarActions from "@/components/navbar-actions";
// import getCategories from "@/actions/get-categories";
import Container from "../helpers/container";
import { getCategories } from "@/actions/get-categories";
import { Category } from "@/types";
import NavbarActions from "./nav-bar-action";

const Navbar = async () => {
  const categories: Category[] = await getCategories();
  console.log("categories: ", categories);

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
