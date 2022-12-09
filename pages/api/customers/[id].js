import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getCustomersById,
  updateCustomers,
  saveCustomers,
  deleteCustomersById,

} from "../../../controller/customers/customers";

const handler = nc({ onError });
handler.get(getCustomersById);
handler.put(updateCustomers);
handler.post(saveCustomers);
handler.delete(deleteCustomersById);
export default handler;