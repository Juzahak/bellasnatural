import Image from "next/image";

import { FaShoppingBag } from "react-icons/fa";

export default function ProductList({ categorySelected, subCategorySelected, products, initialid }) {

  return (
    <>
      {products?.map((item) => {
        if (
          parseInt(categorySelected) === item.category &&
          subCategorySelected === item.subcategory
        ) {
          let valores = JSON.parse(item.price);
          let imagem = '';
          JSON.parse(item.image)?.map((item4, index) => { if (index === 0) { imagem = item4.url } })
          return (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-6 pb-5 pl-0">
              <div className="ec-product-cbb">
                <div className="ec-product-image">
                  <a href="#" className="image">
                    <Image
                      className="pic-1"
                      src={imagem}
                      alt=""
                      width={150}
                      height={150}
                    />
                    <Image
                      className="pic-2"
                      src={imagem}
                      alt=""
                      width={150}
                    height={150}
                    />
                  </a>
                  <ul className="ec-product-links">
                    <li>
                      <a href="#" data-tip="Add To Cart">
                        <FaShoppingBag size={20} />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="ec-product-body">

                  <h3 className="ec-title">
                    <a href="#">{item.name}</a>
                  </h3>
                  <div className="ec-price">
                  R${valores[0].price}.00
                  </div>
                  {/* <div className="ec-size">
                    <a href="#">S</a>
                    <a href="#">M</a>
                    <a href="#">L</a>
                  </div> */}
                  <div className='col-12 pt-3'>
                    <span className="ec-offer-btn"><a className="btn btn-lg btn-primary w-100 itemBtn d-flex">Compre Já</a></span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (categorySelected === "Todos os Produtos" || parseInt(initialid) === "Todos os Produtos") {
          let valores = JSON.parse(item.price);
          let imagem = '';
          JSON.parse(item.image)?.map((item4, index) => { if (index === 0) { imagem = item4.url } })
          return (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-6 pb-5 pl-0">
              <div className="ec-product-cbb">
                <div className="ec-product-image">
                  <a href="#" className="image">
                    <Image
                      className="pic-1"
                      src={imagem}
                      alt=""
                      width={150}
                    height={150}
                    />
                    <Image
                      className="pic-2"
                      src={imagem}
                      alt=""
                      width={150}
                    height={150}
                    />
                  </a>
                  <ul className="ec-product-links">
                    <li>
                      <a href="#" data-tip="Add To Cart">
                        <FaShoppingBag size={20} />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="ec-product-body">
                  <h3 className="ec-title">
                    <a href="#">{item.name}</a>
                  </h3>
                  <div className="ec-price">
                  R${valores[0].price}.00
                  </div>
                  {/* <div className="ec-size">
                    <a href="#">S</a>
                    <a href="#">M</a>
                    <a href="#">L</a>
                  </div> */}
                  <div className='col-12 pt-3'>
                    <span className="ec-offer-btn"><a className="btn btn-lg btn-primary w-100 itemBtn d-flex">Compre Já</a></span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (parseInt(categorySelected) === parseInt(item.category) && subCategorySelected === "" || parseInt(initialid) === parseInt(item.category) && subCategorySelected === undefined) {
          let valores = JSON.parse(item.price);
          let imagem = '';
          JSON.parse(item.image)?.map((item4, index) => { if (index === 0) { imagem = item4.url } })
          return (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-6 pb-5 pl-0">
              <div className="ec-product-cbb">
                <div className="ec-product-image">
                  <a href="#" className="image">
                    <Image
                      className="pic-1"
                      src={imagem}
                      alt=""
                      width={150}
                    height={150}
                    />
                    <Image
                      className="pic-2"
                      src={imagem}
                      alt=""
                      width={150}
                    height={150}
                    />
                  </a>
                  <ul className="ec-product-links">
                    <li>
                      <a href="#" data-tip="Add To Cart">
                        <FaShoppingBag size={20} />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="ec-product-body">

                  <h3 className="ec-title">
                    <a href="#" style={{color: '#A9713D'}}>{item.name}</a>
                  </h3>
                  <div className="ec-price">
                    R${valores[0].price}.00
                  </div>
                  {/* <div className="ec-size">
                    <a href="#">S</a>
                    <a href="#">M</a>
                    <a href="#">L</a>
                  </div> */}
                  <div className='col-12 pt-3'>
                    <span className="ec-offer-btn"><a className="btn btn-lg btn-primary w-100 itemBtn d-flex">Compre Já</a></span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}

      {/* {allProducts?.map((item) => {
        return (
          <div className="col-lg-4 col-md-6 col-sm-6 pb-5 pl-0">
            <div key={item.id} className="ec-product-cbb">
              <div className="ec-product-image">
                <a href="#" className="image">
                  <Imag
                    className="pic-1"
                    src={require("../../assets/images/product-image/6_1.jpg")}
                    alt=""
                    width={150}
                    height={150}
                  />
                  <Imag
                    className="pic-2"
                    src={require("../../assets/images/product-image/6_2.jpg")}
                    alt=""
                    width={150}
                    height={150}
                  />
                </a>
                <ul className="ec-product-links">
                  <li>
                    <a href="#" data-tip="Add To Cart">
                      <FaShoppingBag size={20} />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ec-product-body">
                <ul className="ec-rating">
                  <li className="ecicon eci-star fill"></li>
                  <li className="ecicon eci-star fill"></li>
                  <li className="ecicon eci-star fill"></li>
                  <li className="ecicon eci-star fill"></li>
                  <li className="ecicon eci-star"></li>
                </ul>

                <h3 className="ec-title">
                  <a href="#">{item.name}</a>
                </h3>
                <div className="ec-price">
                  <span>$46.00</span> $29.00
                </div>
                <div className="ec-color">
                  <a href="#">
                    <span className="red"></span>
                  </a>
                  <a href="#">
                    <span className="blue"></span>
                  </a>
                  <a href="#">
                    <span className="pink"></span>
                  </a>
                  <a href="#">
                    <span className="green"></span>
                  </a>
                </div>
                <div className="ec-size">
                  <a href="#">S</a>
                  <a href="#">M</a>
                  <a href="#">L</a>
                </div>
              </div>
            </div>
          </div>
        );
      })} */}
    </>
  );
}
