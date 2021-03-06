import Vue from 'vue'
import Router from 'vue-router'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Index from './components/IndexPage'
import Products from './components/products/ProductsPage'
import Tops from './components/products/TopsPage'
import Bottoms from './components/products/BottomsPage'
import Accs from './components/products/AccsPage'
import Details from './components/products/DetailsPage'
import CreateProduct from './components/products/CreateProductPage'
import EditProduct from './components/products/EditProductPage'
import Login from './components/login/LoginPage'
import Logout from './components/login/LogoutPage'
import SignUp from './components/login/SignUpPage'
import Forgot from './components/login/ForgotPage'
import Reset from './components/login/ResetPage'
import Basket from './components/users/BasketPage'
import Orders from './components/users/OrdersPage'
import PurchaseState from './components/users/PurchaseState'
import MyPage from './components/users/MyPage'
import EditUser from './components/users/EditUserPage'
import Management from './components/users/Management'
import {store} from './store/store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //Index
    {
      path: '/',
      name: 'index',
      components: {
        'header': Header,
        'footer': Footer,
        default: Index
      }
    },
    //All Products
    {
      path: '/products',
      name: 'products',
      components: {
       'header': Header,
       'footer': Footer,
       default: Products
      },
    },
    //Tops Products
    {
      path: '/products/tops',
      name: 'tops',
      components: {
       'header': Header,
       'footer': Footer,
       default: Tops
      },
    },
    //Bottoms Products
    {
      path: '/products/bottoms',
      name: 'bottoms',
      components: {
       'header': Header,
       'footer': Footer,
       default: Bottoms
      },
    },
    //Accs Products
    {
      path: '/products/accs',
      name: 'accs',
      components: {
       'header': Header,
       'footer': Footer,
       default: Accs
      },
    },

    //Create New Product
    {
      path: '/products/new',
      name: 'createProduct',
      components: {
        'header': Header,
        default: CreateProduct
      }
    },

    //Details Product
    {
      path: '/products/:id',
      name: 'details',
      components: {
        'header': Header,
        'footer': Footer,
        default: Details
      }
    },

    //Edit Product
    {
      path: '/products/:id/edit',
      name: 'editProduct',
      components: {
        'header': Header,
        default: EditProduct
      }
    },

    //Login
    {
      path: '/login',
      name: 'login',
      components: {
        'header': Header,
        default: Login
      }

    },
    //Logout
    {
      path: '/logout',
      name: 'logout',
      components: {
        'header': Header,
        default: Logout
      }

    },
    //Sign Up
    {
      path: '/signup',
      name: 'signUp',
      components: {
        'header': Header,
        default: SignUp
      }

    },
    //forgot page
    {
      path: '/forgot',
      name: 'forgot',
      components: {
        'header': Header,
        default: Forgot
      }

    },
    //reset page
    {
      path: '/reset/:token',
      name: 'reset',
      components: {
        'header': Header,
        default: Reset
      }


    },

    //shopping Basket
    {
      path: '/:id/basket',
      name: 'basket',
      components: {
        'header': Header,
        'footer': Footer,
        default: Basket
      }
    },
    //Management
    {
      path:'/management',
      name:'management',
      components: {
        'header':Header,
        'footer':Footer,
        default:Management
      }
    },
    //Order Inquiry
    {
      path: '/:id/orders',
      name: 'orders',
      components: {
        'header': Header,
        'footer': Footer,
        default: Orders
      }
    },
    //customers purchaseState
    {
      path:'/:id/purchaseState',
      name:'purchaseState',
      components: {
        'header': Header,
        'footer': Footer,
        'purchaseState': PurchaseState
      }
    },

    //my information
    {
      path: '/:id/myPage',
      components: {
        'header': Header,
        default: MyPage
      }
    },

    //User edit
    {
      path: '/:id/myPage/edit',
      components: {
        'header': Header,
        default: EditUser
      }
    }
  ]
})
