import Vue from 'vue'
import Router from 'vue-router'
import Header from './components/partials/Header'
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
import MyPage from './components/users/MyPage'
import EditUser from './components/users/EditUserPage'
import NewComments from './components/comments/NewPage'
import EditComments from './components/comments/EditPage'
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
        default: Index
      }
    },
    //All Products
    {
      path: '/products',
      name: 'products',
      components: {
       'header': Header,
       default: Products
      },
    },
    //Tops Products
    {
      path: '/products/tops',
      name: 'tops',
      components: {
       'header': Header,
       default: Tops
      },
    },
    //Bottoms Products
    {
      path: '/products/bottoms',
      name: 'bottoms',
      components: {
       'header': Header,
       default: Bottoms
      },
    },
    //Accs Products 
    {
      path: '/products/accs',
      name: 'accs',
      components: {
       'header': Header,
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
        default: Basket
      }  
    },
    //Order Inquiry
    {
      path: '/:id/orders',
      name: 'orders',
      components: {
        'header': Header,
        default: Orders
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
    },

    //Create Comments
    {
      path: '/products/:id/comments/new',
      name: 'newComments',
      components: {
        'header': Header,
        default: NewComments
      }
    },
    //Edit Comments
    {
      path: '/products/:id/comments/:comments_id/edit',
      name: 'editComments',
      components: {
        'header': Header,
        default: EditComments
      }
    }
  ]
})
