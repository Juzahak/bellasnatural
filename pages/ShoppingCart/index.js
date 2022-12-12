import Image from "next/image";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Summary from "./Summary";
import { useEffect, useState } from "react";
import { mutate } from "swr";

export default function ShoppingCart() {
  const [cartProd, setCartProd] = useState([]);
  const [value, setValue] = useState(0);
  const [quantityInput, setQuantity] = useState(1);

  useEffect(() => {
    // Perform localStorage action
    setCartProd(JSON.parse(localStorage.getItem('produtos')));
  }, [])

  

  const inputQtd = (e, id, quantidade) => {

    cartProd.forEach(item => {
      if(item.id === id){
        console.log(e, id, quantidade)
        if (e === 'mais') {
          item.quantidadeCompra = quantidade + 1
           console.log(cartProd)
          return setCartProd(cartProd);
        }
        if (quantidade < 1) {
          item.quantidadeCompra = 0
           console.log(cartProd)
          return setCartProd(cartProd);
        }
        if (e === 'menos' && quantidade >= 2) {
          item.quantidadeCompra = quantidade - 1
           console.log(cartProd)
          return setCartProd(cartProd);
        }
      }
    })
   
  }


 
  return (
    <>
      <Header />

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-cart-leftside col-lg-8 col-md-12 ">
              <div className="ec-cart-content">
                <div className="ec-cart-inner">
                  <div className="row">
                    <form action="#">
                      <div className="table-content cart-table-content">
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Name</th>
                              <th>Preço</th>
                              <th style={{ textAlign: "center" }}>Quantidade</th>
                              <th>Total</th>
                              <th></th>
                            </tr>
                          </thead>
                          {cartProd?.map((item, index) => {
                            let quantityInput = item.quantidadeCompra;
                            
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td
                                    data-label="Product"
                                    className="ec-cart-pro-name"
                                    style={{ width: '20% !important' }}
                                  >
                                    {JSON.parse(item.imagem)?.map((item, index) => {
                                      if (index < 1) {
                                        return (
                                          <Image key={index} src={item.url} width={150} height={150} />
                                        )
                                      }
                                    })}
                                  </td>
                                  <td
                                    data-label="Product"
                                    className="ec-cart-pro-name"
                                  >
                                    <a href="product-left-sidebar.html">
                                      {item.titulo}
                                    </a>
                                  </td>
                                  <td
                                    data-label="Price"
                                    className="ec-cart-pro-price"
                                  >
                                    <span className="amount">R$ {item.valor}.00</span>
                                  </td>
                                  <td
                                    data-label="Quantity"
                                    style={{ textAlign: "center" }}
                                  >
                                      <div className="qty-plus-minus">
                                        <div className="dec ec_qtybtn" onClick={() => inputQtd('menos', item.id, item.quantidadeCompra)}>-</div>
                                        <input className="qty-input" value={quantityInput} />
                                        <div className="inc ec_qtybtn" onClick={() => inputQtd('mais', item.id, item.quantidadeCompra)}>+</div>
                                      </div>
                                    
                                  </td>
                                  <td
                                    data-label="Total"
                                    className="ec-cart-pro-subtotal"
                                  >
                                    R$ 00.00
                                  </td>
                                  <td
                                    data-label="Remove"
                                    className="ec-cart-pro-remove"
                                  >
                                    <a href="#">
                                      <i className="ecicon eci-trash-o"></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            )
                          })}

                        </table>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="ec-cart-update-bottom">
                            <a href="#">Continuar Comprando</a>
                            <button className="btn btn-primary">
                              Finalizar
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <Summary />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
