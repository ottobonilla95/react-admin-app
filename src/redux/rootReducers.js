import { combineReducers } from "redux";
import authReducers from "./auth/reducers";
import settingsReducers from "./settings/reducers";
import sidebarReducers from "./settings/SidebarReducer";
import customerReducer from "./customer/reducers";
import agentReducer from "./agent/reducers";
import productReducer from "./product/reducers";
import taskReducer from "./task/reducers";
import planogramReducer from "./planogram/reducers";
import userReducer from "./admin/userReducers";
import companyReducer from "./company/reducers";

export default combineReducers({
  auth: authReducers,
  settings: settingsReducers,
  sidebar: sidebarReducers,
  customer: customerReducer,
  agent: agentReducer,
  product: productReducer,
  task: taskReducer,
  planogram: planogramReducer,
  user: userReducer,
  company: companyReducer,
});
