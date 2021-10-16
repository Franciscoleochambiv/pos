/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
//import UserProfile from "views/UserProfile/UserProfile.js";
//import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

//import CategoriasHooks from "./Components/CategoriasHooks"
//import ViewCate from "./Components/ViewCate"
import Categoriafile from "./views/Categorias/Categoriafile"

//import ViewTipo from "./Components/ViewTipo"
import Tipofile from "./views/Tipos/Tipofile"



import Menu from "./views/Mantenimiento/Menu"


import ProductList from "./views/ProductList/ProductList"
//import CartDialog from "./views/CartDialog/CartDialog"
import Venta from "./views/Venta/Venta";

import ViewVentaserieHooks  from  "./views/Ventaserie/ViewVentaserieHooks"
import ViewValidaHooks from  "./views/Ventaserie/ViewValidaHooks"
import ViewVentaserieHookstot  from  "./views/Ventaserie/ViewVentaserieHookstot"
import PosHooks from  "./views/Pos/PosHooks"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/pos",
    name: "POS",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:PosHooks,
    layout: "/pos"
  },
 

 

  {
    path: "/Menumant",
    name: "Mantenimiento",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Menu,
    layout: "/admin"
  },
  {
    path: "/dxserie",
    name: "Documentos x Serie",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ViewVentaserieHooks,
    layout: "/admin"
  },
  {
    path: "/totdocu",
    name: "Todos los Documentos",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ViewVentaserieHookstot,
    layout: "/admin"
  },
  {
    path: "/validoc",
    name: "Validacion CPE SUNAT",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: ViewValidaHooks,
    layout: "/admin"
  }

  
];

export default dashboardRoutes;


/*{
    path: "/categoriafile",
    name: "Categorias Principal",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Categoriafile,
    layout: "/admin"
  },
  {
    path: "/tipofile",
    name: "Tipos Principal",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Tipofile,
    layout: "/admin"
  },
  
 
  
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin"
  },
  {
    path: "/rtl-page",
    name: "RTL Support",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: RTLPage,
    layout: "/rtl"
  },
  {
    path: "/upgrade-to-pro",
    name: "Upgrade To PRO",
    rtlName: "التطور للاحترافية",
    icon: Unarchive,
    component: UpgradeToPro,
    layout: "/admin"
  }



    {
    path: "/venta",
    name: "Venta",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component:Venta,
    layout: "/admin"
  },
  */
