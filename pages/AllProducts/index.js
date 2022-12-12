import { useEffect, useState } from "react";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import useSwr, { mutate } from "swr";
import { useRouter } from "next/router";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AllProducts() {
  const [categorySelected, setCategorySelected] = useState("");
  const [subCategorySelected, setSubCategorySelected] = useState();

  const { data: products } = useSwr(`/api/products`, fetcher);
  const { data: category } = useSwr(`/api/category`, fetcher);
  const { data: subCategory } = useSwr(`/api/subcategory`, fetcher);

  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    setCategorySelected(id)
  }, [])

  return (
    <>
      <Header />
    
      <section className="sec-cbb el-prod section-space-p">
        <div className="container">
          <div className="col-12 row pt-5">
            <Sidebar
              setCategorySelected={setCategorySelected}
              setSubCategorySelected={setSubCategorySelected}
              categorySelected={categorySelected}
              category={category}
              initialid={categorySelected}
            />
            <div className="col-9 row">
              <TopBar categorySelected={categorySelected} setSubCategorySelected={setSubCategorySelected} subCategory={subCategory} initialid={categorySelected}/>

              <ProductList categorySelected={categorySelected} subCategorySelected={subCategorySelected} products={products} initialid={categorySelected}/>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
