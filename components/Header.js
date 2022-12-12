import { FaUserAlt, FaShoppingCart, FaSearch, FaAngleDown } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react';

import useSwr, { mutate } from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
// import teste from '../assets';

function Header() {
  const { data: mainCategories } = useSwr(`/api/category`, fetcher);
  const [cartProd, setCartProd] = useState([])
  const [cartSubTotal, setSubTotal] = useState(0)
  
  let subTotal = 0;
  let Total = 0;


  useEffect(() => {
    // Perform localStorage action
    setCartProd(JSON.parse(localStorage.getItem('produtos')));
  }, [])

  console.log(subTotal)

  const cartContainer = useRef();

  const toggleCart = () => {
    cartContainer.current.classList.add("ec-open")
  }

  const closeCart = () => {
    cartContainer.current.classList.remove("ec-open")
  }

  const closeAllCart = () => {
    cartContainer.current.classList.remove("ec-open")
  }


  function removeProducts(id) {

    let product = cartProd.filter(function(obj) {

        return obj.id != id;

    });

    localStorage.setItem("produtos", JSON.stringify(product));
    setCartProd(product);
    console.log(product)
}


  /*--------------------- ecart Responsive Menu -----------------------------------*/
  // function ResponsiveMobileEcartMenu() {
  //     var $ecartNav = $(".ec-menu-content, .overlay-menu"),
  //     $ecartNavSubMenu = $ecartNav.find(".sub-menu");
  //     $ecartNavSubMenu.parent().prepend('<span className="menu-toggle"></span>');

  //     $ecartNav.on("click", "li a, .menu-toggle", function(e) {
  //         var $this = $(this);
  //         if ($this.attr("href") === "#" || $this.hasClass("menu-toggle")) {
  //             e.preventDefault();
  //             if ($this.siblings("ul:visible").length) {
  //                 $this.parent("li").removeClass("active");
  //                 $this.siblings("ul").slideUp();
  //                 $this.parent("li").find("li").removeClass("active");
  //                 $this.parent("li").find("ul:visible").slideUp();
  //             } else {
  //                 $this.parent("li").addClass("active");
  //                 $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
  //                 $this.closest("li").siblings("li").find("ul:visible").slideUp();
  //                 $this.siblings("ul").slideDown();
  //             }
  //         }
  //     });
  // }







  return (
    <>

      <header className="ec-header">

        <div className="header-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col header-top-left col-md-5">
                <div className="header-top-message">contato@aspapoulas.com.br</div>
              </div>
              <div className="col header-top-right d-none d-lg-block col-md-7">
                <div className="header-top-right-inner d-flex justify-content-end">
                  <div className="header-top-link">
                    <Link href="/bellasnatural">Home</Link>
                  </div>
                  <div className="header-top-link">
                    <Link href="/sobre-nos">Sobre</Link>
                  </div>
                  <div className="header-top-link">
                    <a href="/bellasnatural">Contato</a>
                  </div>
                  <div className="header-top-link">
                    <a href="/bellasnatural">Ajuda</a>
                  </div>
                </div>
              </div>
              <div className="col header-top-res d-lg-none">
                <div className="ec-header-bottons">
                  <div className="ec-header-user dropdown">
                    <button className="dropdown-toggle" data-bs-toggle="dropdown">
                      <FaUserAlt className="svg_img header_svg" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li><a className="dropdown-item" href="/bellasnatural">Registrar</a></li>
                      <li><a className="dropdown-item" href="/bellasnatural">Entrar</a></li>
                      <li><a className="dropdown-item" href="/bellasnatural">Meus Dados</a></li>
                      <li><a className="dropdown-item" href="/bellasnatural">Meus Pedidos</a></li>
                      <li><a className="dropdown-item" href="/bellasnatural">Sair</a></li>
                    </ul>
                  </div>
                  <a className="ec-header-btn ec-side-toggle">
                    <div className="header-icon">
                      <FaShoppingCart className="svg_img header_svg" />
                    </div>
                    <span className="ec-header-count ec-cart-count">{cartProd.length || "*"}</span>
                  </a>
                  <a
                    href="#ec-mobile-menu"
                    className="ec-header-btn ec-side-toggle d-lg-none"
                  >
                    <i className="ecicon eci-bars"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="ec-header-bottom d-none d-lg-block">
          <div className="container position-relative">
            <div className="row">
              <div className="ec-flex">
                <div className="align-self-center ec-header-logo">
                  <div className="header-logo">
                    <Link href="/"
                    ><Image src={require("../assets/img/logo.jpg")} alt="Site Logo" width={250} height={120} />
                      <Image
                        className="dark-logo"
                        src={require("../assets/img/logo-dark.jpg")}
                        alt="Site Logo"
                        style={{ display: 'none' }}
                        width={250} height={120}
                      /></Link>
                  </div>
                </div>
                <div className="align-self-center ec-header-search">
                  <div className="header-search">
                    <form className="ec-search-group-form" action="#">
                      <input
                        className="form-control"
                        placeholder="Busca"
                        type="text"
                      />
                      <button className="search_submit" type="submit">
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                </div>


                <div className="align-self-center">
                  <div className="ec-header-bottons">
                    <div className="ec-header-user dropdown">
                      <button className="dropdown-toggle" data-bs-toggle="dropdown">
                        <FaUserAlt className="svg_img header_svg" />
                        <span className="ec-btn-title">Minha conta</span>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li><a className="dropdown-item" href="/bellasnatural">Registrar</a></li>
                        <li><a className="dropdown-item" href="/bellasnatural">Entrar</a></li>
                        <li><a className="dropdown-item" href="/bellasnatural">Meus Dados</a></li>
                        <li>
                          <a className="dropdown-item" href="/bellasnatural">Meus Pedidos</a>
                        </li>
                        <li><a className="dropdown-item" href="/bellasnatural">Sair</a></li>
                      </ul>
                    </div>
                    <a onClick={toggleCart} className="ec-header-btn ec-side-toggle">
                      <div className="header-icon">
                        <FaShoppingCart className="svg_img header_svg" />
                        <span className="ec-header-count ec-cart-count">{cartProd.length || 0}</span>
                      </div>
                      <span className="ec-btn-title">Carrinho</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ec-header-bottom d-lg-none">
          <div className="container position-relative">
            <div className="row">
              <div className="col">
                <div className="header-logo">
                  <Link href="/"
                  ><Image src={require("../assets/img/logo.jpg")} alt="Site Logo" style={{ width: '180px !important' }} height={120} /><Image
                      className="dark-logo"
                      src={require("../assets/img/logo-dark.jpg")}
                      alt="Site Logo"
                      style={{ display: 'none' }}
                      height={120}
                    /></Link>
                </div>
              </div>
              <div className="col align-self-center ec-header-search">
                <div className="header-search">
                  <form className="ec-search-group-form" action="#">
                    <input
                      className="form-control"
                      placeholder="Search"
                      type="text"
                    />
                    <button className="search_submit" type="submit">
                      <i className="ecicon eci-search" aria-hidden="true"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <div className="ec-main-menu">
                  <ul>
                    <li><Link href="/">Home</Link></li>

                    <li className="dropdown">
                      <Link href={{
                        pathname: '/AllProducts',
                        query: { id: `Todos os Produtos` }
                      }}>
                        Produtos <FaAngleDown /></Link>
                      <ul className="sub-menu">
                        {mainCategories?.map((item, index) => {
                          return (
                            <li key={index}><Link href={{
                              pathname: '/AllProducts',
                              query: { id: `${item?.id}` }
                            }}>{item?.name}</Link></li>
                          )
                        })}
                      </ul>
                    </li>
                    <li>
                      <Link href="/sobre-nos">Sobre nós</Link>
                    </li>
                    <li>
                      <Link href="/Contact">Contato</Link>
                    </li>
                    <li className="dropdown">
                      <a href="#">Mais <FaAngleDown /></a>
                      <ul className="sub-menu">
                        <li><Link href="/TermsResponsability">Termos e Condições</Link></li>
                        <li><Link href="/PrivacyPolicy">Política de Privacidade</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="ec-mobile-menu" className="ec-side-cart ec-mobile-menu">
          <div className="ec-menu-title">
            <span className="menu_title">Menu</span>
            <button className="ec-close">×</button>
          </div>
          <div className="ec-menu-inner">
            <div className="ec-menu-content">
              <ul>
                <li><a href="/bellasnatural">Home</a></li>
                <li><a href="/bellasnatural">Todos os Produtos</a></li>
                <li>
                  <a href="/bellasnatural">Camisas</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Regatas</a></li>
                    <li><a href="/bellasnatural">Manga Curta</a></li>
                    <li><a href="/bellasnatural">Manga Média</a></li>
                    <li><a href="/bellasnatural">Manga Longa</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/bellasnatural">Calças</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Jeans</a></li>
                    <li><a href="/bellasnatural">Tecido</a></li>
                    <li><a href="/bellasnatural">Legging</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/bellasnatural">Shorts</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Jeans</a></li>
                    <li><a href="/bellasnatural">Tecido</a></li>
                    <li><a href="/bellasnatural">Legging</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/bellasnatural">Vestidos</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Curtos</a></li>
                    <li><a href="/bellasnatural">Longos</a></li>
                    <li><a href="/bellasnatural">Tomara que caia</a></li>
                    <li><a href="/bellasnatural">Tubo</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/bellasnatural">Agasalhos</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Moleton</a></li>
                    <li><a href="/bellasnatural">Jaquetas</a></li>
                    <li><a href="/bellasnatural">Sobretudo</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/bellasnatural">Acessórios</a>
                  <ul className="sub-menu">
                    <li><a href="/bellasnatural">Lenços</a></li>
                    <li><a href="/bellasnatural">Toucas</a></li>
                    <li><a href="/bellasnatural">Echarpes</a></li>
                    <li><a href="/bellasnatural">Cintos</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="header-res-lan-curr">
              <div className="header-res-social">
                <div className="header-top-social">
                  <ul className="mb-0">
                    <li className="list-inline-item">
                      <a href="/bellasnatural"><i className="ecicon eci-facebook"></i></a>
                    </li>
                    <li className="list-inline-item">
                      <a href="/bellasnatural"><i className="ecicon eci-twitter"></i></a>
                    </li>
                    <li className="list-inline-item">
                      <a href="/bellasnatural"><i className="ecicon eci-instagram"></i></a>
                    </li>
                    <li className="list-inline-item">
                      <a href="/bellasnatural"><i className="ecicon eci-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </header>

      {/* <!-- Ekka Cart Start --> */}
      <div onClick={closeAllCart} className="ec-side-cart-overlay"></div>
      <div ref={cartContainer} id="ec-side-cart" className="ec-side-cart">
        <div className="ec-cart-inner">
          <div className="ec-cart-top">
            <div className="ec-cart-title">
              <span className="cart_title">Meu Carrinho</span>
              <button onClick={closeCart} className="ec-close">×</button>
            </div>
            <ul className="eccart-pro-items">

              {cartProd?.map((item, index) => {
                return (
                  <li key={index}>
                    <a href="product-left-sidebar.html" class="sidecart_pro_img">
                      {JSON.parse(item.imagem)?.map((item2, index) => {
                        if (index < 1) {
                          return (
                            <Image key={index} src={item2.url}
                              width={250} height={250}></Image>
                          )
                        }
                      })}
                    </a>
                    <div class="ec-pro-content">
                      <a href="product-left-sidebar.html" class="cart_pro_title">Woolen hat for men</a>
                      <span class="cart-price"><span>R${item.valor},00</span> x {item.quantidadeCompra}</span>
                      <a href="#" onClick={() => removeProducts(item.id)} class="remove">×</a>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="ec-cart-bottom">
            <div className="cart-sub-total">
              <table className="table cart-table">
                <tbody>
                  <tr>
                    <td className="text-left">Sub-Total :</td>
                    <td className="text-right">
                    R${cartProd?.map((item2, index) => {
                      subTotal = item2.valor * item2.quantidadeCompra + subTotal
                      if(index + 1 === cartProd.length || 0){return(subTotal)}
                    })}.00
                    </td>
                  </tr>
                  <tr>
                    <td className="text-left">Total :</td>
                    <td className="text-right primary-color">
                    R${cartProd?.map((item2, index) => {
                      Total = item2.valor * item2.quantidadeCompra + Total
                      if(index + 1 === cartProd.length || 0){return(Total)}
                    })}.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="cart_btn">
              <a href="/bellasnatural" className="btn btn-primary">Visualizar Carrinho</a>
              <a href="/bellasnatural" className="btn btn-secondary">Fechar Compra</a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Ekka Cart End --> */}
    </>
  );
}

export default Header;
