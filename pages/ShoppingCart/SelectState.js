export default function SelectState() {
  return (
    <span className="ec-cart-wrap">
      <label>Estado</label>
      <span className="ec-cart-select-inner">
        <select
          name="ec_cart_state"
          id="ec-cart-select-state"
          className="ec-cart-select"
        >
          <option selected="" disabled="">
            Selecione um estado
          </option>
          <option value="1">Estado 1</option>
          <option value="2">Estado 2</option>
          <option value="3">Estado 3</option>
          <option value="4">Estado 4</option>
          <option value="5">Estado 5</option>
        </select>
      </span>
    </span>
  );
}
