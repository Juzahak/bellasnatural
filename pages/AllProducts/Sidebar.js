export default function Sidebar({ setCategorySelected, categorySelected, setSubCategorySelected, category, initialid }) {

  return (
    <div className="col-lg-3">
      <ul className="ec-cat-tab-nav nav">
        <li
          onClick={() => setCategorySelected("Todos os Produtos")}
          className="cat-item mt-2"
        >
          <a className="cat-link" data-bs-toggle="tab" href="#tab-cat-1">
            <div className="cat-desc">
              <span>Todos os Produtos</span>
            </div>
          </a>
        </li>

        {category?.map((item) => {
          if(item.id === parseInt(initialid)) {
            return (
              <li
                key={item.id}
                onClick={() => 
                  {setCategorySelected(item.id)
                  setSubCategorySelected('')}}
                className="cat-item mt-2"
              >
                <a className="cat-link active" data-bs-toggle="tab" href="#tab-cat-1">
                  <div className="cat-desc">
                    <span>{item.name}</span>
                    {/* <span>440 Products</span> */}
                  </div>
                </a>
              </li>
            );
          }else{
            return (
              <li
                key={item.id}
                onClick={() => 
                  {setCategorySelected(item.id)
                  setSubCategorySelected('')}}
                className="cat-item mt-2"
              >
                <a className="cat-link" data-bs-toggle="tab" href="#tab-cat-1">
                  <div className="cat-desc">
                    <span>{item.name}</span>
                    {/* <span>440 Products</span> */}
                  </div>
                </a>
              </li>
            );
          }
          
        })}
      </ul>
    </div>
  );
}
