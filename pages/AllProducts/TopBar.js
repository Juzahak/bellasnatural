export default function TopBar({ categorySelected, setSubCategorySelected, subCategory, initialid }) {

  return (
    <>
      {categorySelected !== "" && (
        <div className="col-12 row pb-3 justify-content-center" style={{ maxHeight: "87px" }}>
          {subCategory?.map((item) => {
            if (categorySelected === parseInt(item.main_category) || parseInt(item.main_category) === parseInt(initialid)) {
              return (
                <span
                  key={item.id}
                  className="col-auto px-4 py-2 sub-category-btn mt-2 cat-link"
                  onClick={() => setSubCategorySelected(item.id)}
                >
                  {item.name}
                </span>
              );
            }
          })}
        </div>
      )}
    </>
  );
}
