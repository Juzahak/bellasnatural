// import SelectCity from "./SelectCity";
// import SelectState from "./SelectState";

export default function Summary() {
  return (
    <div className="ec-cart-rightside col-lg-4 col-md-12">
      <div className="ec-sidebar-wrap">
        <div className="ec-sidebar-block">
          <div className="ec-sb-title">
            <h3 className="ec-sidebar-title">Calcular Frete</h3>
          </div>
          <div className="ec-sb-block-content">
            {/* <h4 className="ec-ship-title">Calcular Frete</h4> */}
            <div className="ec-cart-form">
              <p>Use os campos abaixo para calcular o frete</p>
              <form action="#" method="post">
                {/* <SelectCity />
                <SelectState /> */}

                <span className="ec-cart-wrap">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    name="postalcode"
                    id="cep"
                    placeholder="CEP"
                  />
                </span>
              </form>
            </div>
          </div>

          <div className="ec-sb-block-content">
            <div className="ec-cart-summary-bottom">
              <div className="ec-cart-summary">
                <div>
                  <span className="text-left">Sub-Total</span>
                  <span className="text-right">R$ 80.00</span>
                </div>
                <div>
                  <span className="text-left">Frete</span>
                  <span className="text-right">R$ 80.00</span>
                </div>
                {/* <div>
                  <span className="text-left">Coupan Discount</span>
                  <span className="text-right">
                    <a className="ec-cart-coupan">Apply Coupan</a>
                  </span>
                </div> */}
                <div className="ec-cart-coupan-content">
                  <form
                    className="ec-cart-coupan-form"
                    name="ec-cart-coupan-form"
                    method="post"
                    action="#"
                  >
                    <input
                      className="ec-coupan"
                      type="text"
                      required
                      placeholder="Enter Your Coupan Code"
                      name="ec-coupan"
                      value=""
                    />
                    <button
                      className="ec-coupan-btn button btn-primary"
                      type="submit"
                      name="subscribe"
                      value=""
                    >
                      Apply
                    </button>
                  </form>
                </div>
                <div className="ec-cart-summary-total">
                  <span className="text-left">Total do Pedido</span>
                  <span className="text-right">R$ 160.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
