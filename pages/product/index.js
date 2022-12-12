import Image from "next/image";
import useSwr, { mutate } from "swr";
// import ProdDestaques from "../components/ProdDestaques";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProdDestaques from '../../components/ProdDestaques';
import { toast } from "react-toastify";
import axios from "axios";

import {
    FaItalic,
    FaMapMarkedAlt,
    FaPhoneAlt,
    FaMailBulk,
} from "react-icons/fa";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { useRouter } from "next/router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantityInput, setQuantity] = useState(1);
    const [value, setValue] = useState(0);
    const [sizeName, setSizeName] = useState('');
    const { data: products } = useSwr(`api/products`, fetcher);
    const { data: sizes } = useSwr(`api/product_sizes`, fetcher);
    const { data: mainCategories } = useSwr(`api/category`, fetcher);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {



        products?.forEach((item, index) => {
            if (item?.id === parseInt(id)) {
                JSON.parse(item.price)?.forEach((item2, index) => {
                    if (index < 1) {
                        setValue(parseInt(item2?.price))
                        sizes?.map(item3 => {
                            if (item3?.id === parseInt(item2?.size)) {
                                setSizeName(item3?.name)
                            }
                        })
                    }
                })
            }
        })
    }, [])

    const inputQtd = (e) => {
        let valorAtual = quantityInput;
        if (e === 'mais') {
            setQuantity(valorAtual + 1);
        }
        if (valorAtual < 1) {
            setQuantity(valorAtual = 1);
        }
        if (e === 'menos' && valorAtual >= 2) {
            setQuantity(valorAtual - 1);
        }
    }

    const addProduct = () => {
        var product = JSON.parse(localStorage.getItem('produtos'));
        if (product == null) product = [];
        var prodArr = [];

        product.forEach(producto => {

            if (producto.id == parseInt(id)) {
                prodArr = producto.id;
            }
        })

        products.forEach((item, index) => {
            if (prodArr == item.id) {
                alert('Produto ja adicionado')

            } else if (item.id === parseInt(id)) {
                var entry = {
                    id: item.id,
                    titulo: item.name,
                    embalagem: sizeName,
                    valor: value,
                    imagem: item.image,
                    peso: item.peso,
                    largura: item.largura,
                    altura: item.altura,
                    comprimento: item.comprimento,
                    quantidadeCompra: quantityInput,
                    total: value * quantityInput
                }
                localStorage.setItem('entry', JSON.stringify(entry));
                product.push(entry);
                localStorage.setItem("produtos", JSON.stringify(product));
                return (
                    router.push("/AllProducts?id=Todos+os+Produtos"),
                    toast('Produto adicionado com sucesso!', {
                        position: "top-right",
                    }))
            }
        })
    }


    console.log(value, sizeName)
    return (
        <>
            <Header />

            {products?.map((item) => {
                let idItem = parseInt(id);

                return item.id == idItem ? (
                    <>
                        <section className="section ec-offer-section section-space-mt breadcumb">
                            <div className="ec-offer-inner">
                                <div className="row justify-content-center ">
                                    <div className="breadcumb-area w-100 col-lg-12 col-md-7 col-sm-7 ec-offer-content">
                                        <h2 className="breadcumb-product-title">{item.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="ec-page-content section-space-p">
                            <div className="container">
                                <div className="row">
                                    <div className="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">
                                        <div className="single-pro-block">
                                            <div className="single-pro-inner">
                                                <div className="row">
                                                    <div className="col-12 col-md-5">
                                                        <Swiper
                                                            style={{
                                                                "--swiper-navigation-color": "#fff",
                                                                "--swiper-pagination-color": "#fff",
                                                                'margin-bottom': '30px',
                                                            }}
                                                            loop={true}
                                                            spaceBetween={10}
                                                            navigation={true}
                                                            modules={[FreeMode, Navigation, Thumbs]}
                                                            className="mySwiper2"
                                                        >
                                                            {JSON.parse(item.image)?.map((item2, index) => {
                                                                return (
                                                                    <SwiperSlide key={index}>
                                                                        <Image src={item2.url} alt="" width={300} height={300} />
                                                                    </SwiperSlide>)
                                                            })}
                                                        </Swiper>

                                                        <Swiper
                                                            onSwiper={setThumbsSwiper}
                                                            loop={true}
                                                            spaceBetween={10}
                                                            slidesPerView={5}
                                                            freeMode={true}
                                                            watchSlidesProgress={true}
                                                            modules={[FreeMode, Navigation, Thumbs]}
                                                            className="mySwiper"
                                                        >
                                                            {JSON.parse(item.image)?.map((item2, index) => {
                                                                return (
                                                                    <SwiperSlide key={index}>
                                                                        <Image src={item2.url} alt="" width={300} height={300} />
                                                                    </SwiperSlide>)
                                                            })}
                                                        </Swiper>
                                                    </div>

                                                    <div className="single-pro-desc col-12 col-md-7">
                                                        <div className="single-pro-content h-100 d-flex flex-column justify-content-between">
                                                            <div>
                                                                <div className="ec-single-desc pt-4 pb-4" style={{ whiteSpace: 'pre-wrap' }}>
                                                                    {item.short_description}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                {JSON.parse(item.price).map((item, index) => {
                                                                    if (index < 1) {
                                                                        return (
                                                                            <>
                                                                                <div className="ec-single-price-stoke">
                                                                                    <div className="ec-single-price">
                                                                                        <span className="ec-single-ps-title">
                                                                                            Valor
                                                                                        </span>
                                                                                        <span className="new-price">
                                                                                            R${(value * quantityInput).toFixed(2)}
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="ec-single-stoke">
                                                                                        <span className="ec-single-ps-title">
                                                                                            Peças em Estoque:
                                                                                        </span>
                                                                                        <span className="ec-single-sku">
                                                                                            {item.quantity}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                        );
                                                                    }
                                                                })}

                                                                <div className="ec-pro-variation">
                                                                    <div className="ec-pro-variation-inner ec-pro-variation-size">
                                                                        <span>Tamanhos disponíveis</span>
                                                                        <div className="ec-pro-variation-content">
                                                                            <ul className="ec-cat-tab-nav nav d-flex flex-row">
                                                                                {sizes?.map((itemSize) => {
                                                                                    return (<>
                                                                                        {JSON.parse(item.price).map((item) => {
                                                                                            if (itemSize.id === parseInt(item.size)) {
                                                                                                console.log(item)
                                                                                                return (
                                                                                                    <>
                                                                                                        <li onClick={() => {
                                                                                                            setValue(parseInt(item.price));
                                                                                                            setSizeName(itemSize.name);
                                                                                                        }}>
                                                                                                            <a data-bs-toggle="tab" className="cat-link selected"
                                                                                                                href="#tab-cat-1">
                                                                                                                <span >{itemSize.name}</span>

                                                                                                            </a>
                                                                                                        </li>
                                                                                                    </>
                                                                                                )
                                                                                            }
                                                                                        })}
                                                                                    </>)
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="ec-single-qty">
                                                                    <div class="qty-plus-minus">
                                                                        <div class="dec ec_qtybtn" onClick={() => inputQtd('menos')}>-</div>
                                                                        <input class="qty-input" disable type="text" value={quantityInput} />
                                                                        <div class="inc ec_qtybtn" onClick={() => inputQtd('mais')}>+</div>
                                                                    </div>
                                                                    <div class="ec-single-cart ">
                                                                        <button class="btn btn-primary" onClick={addProduct}>Adicionar ao carrinho</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-product mt-7">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link active"
                                                        id="home-tab"
                                                        data-bs-toggle="tab"
                                                        data-bs-target="#home"
                                                        type="button"
                                                        role="tab"
                                                        aria-controls="home"
                                                        aria-selected="true"
                                                    >
                                                        Descrição Completa
                                                    </button>
                                                </li>
                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div
                                                    className="tab-pane fade show active pt-5 pb-5"
                                                    id="home"
                                                    role="tabpanel"
                                                    aria-labelledby="home-tab"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                >
                                                    {item.full_description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <ProdDestaques products={products} mainCategories={mainCategories} />
                    </>
                ) : (
                    <></>
                );
            })}

            <Footer />
        </>
    );
}
