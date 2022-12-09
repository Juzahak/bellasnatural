
import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getAllProducts_limit,
  saveProducts_limit,
  deleteProducts_limitById,
  updateProducts_limit,
  getProducts_limitById,
  
} from "../../../controller/products_limit/products_limit";
const handler = nc(onError);
handler.get(getAllProducts_limit);
handler.post(saveProducts_limit);
handler.delete(deleteProducts_limitById);
handler.get(getProducts_limitById);
export default handler;

