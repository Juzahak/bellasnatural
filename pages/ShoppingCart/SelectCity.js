import axios from "axios";
import { useEffect } from "react";

export default function SelectCity() {
  useEffect(() => {
    (async function getCities() {
      await axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <span className="ec-cart-wrap">
      <label>Cidade</label>
      <span className="ec-cart-select-inner">
        <select
          name="ec_cart_state"
          id="ec-cart-select-state"
          className="ec-cart-select"
        >
          <option selected="" disabled="">
            Selecione uma cidade
          </option>
          <option value="1">Cidade 1</option>
          <option value="2">Cidade 2</option>
          <option value="3">Cidade 3</option>
          <option value="4">Cidade 4</option>
          <option value="5">Cidade 5</option>
        </select>
      </span>
    </span>
  );
}
