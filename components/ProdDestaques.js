import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaRegEye, FaCartPlus } from "react-icons/fa";

function ProdDestaques({products, mainCategories}) {

 
  return (
    <>
    {/* <!-- Trending Item Start --> */}
    <section className="section ec-trend-product section-space-p">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12 text-center">
              <div className="section-title">
                <h2 className="ec-title mb-4">Produtos em Destaque</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='pl-5 pr-5'>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={1}>
             <SwiperSlide>
              <div className="container" style={{padding: '0'}}>
                <div className='d-flex mob-featured'>
                  { 
                    products?.slice(4, 8).map(item => {
                    let valores = JSON.parse(item.price);
                    let mainName = '';
                    mainCategories?.map((item3, index) => { if (item3.id === item.category) { mainName = item3.name } })
                      return (
                      <div key={item.id} className="ec-product-content col-lg-3 col-12">
                        <div className="ec-product-inner">
                          <div className="ec-pro-image-outer">
                            <div className="ec-pro-image">
                              <a href="/bellasnatural" className="image">
                                <Image
                                  className="main-image"
                                  src={item.image1}
                                  alt="Product"
                                  width={260}
                                  height={260}
                                  style={{ width: '100%' }}
                                />
                                <Image
                                  className="hover-image"
                                  src={item.image1}
                                  alt="Product"
                                  width={260}
                                  height={260}
                                  style={{ width: '100%' }}
                                />
                              </a>
                              <button title="Adicionar ao Carrinho" className="add-to-cart">
                                <FaCartPlus className="svg_img pro_svg" />
                                Adicionar ao Carrinho
                              </button>

                              <div className="ec-pro-actions">
                                <a
                                  href="/bellasnatural"
                                  className="ec-btn-group quickview">
                                  <FaRegEye className="svg_img pro_svg" /></a>
                              </div>
                            </div>
                          </div>
                          <div className="ec-pro-content">
                            <h5 className="ec-pro-title">
                              <a href="/bellasnatural">{item.name}</a>
                              <a>{mainName}</a>
                            </h5>
                            <span className="ec-price">
                              <span className="new-price">R${valores[0].price}.00</span>
                            </span>
                          </div>
                          <div className='col-12 pt-3'>
                          <span className="ec-offer-btn"><a className="btn btn-lg btn-primary w-100 itemBtn d-flex">Compre Já</a></span>
                          </div>
                        </div>
                      </div>
                    )})
                  }
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      {/* // <!-- Trending Item end --> */}
    </>
  );
}

export default ProdDestaques;
