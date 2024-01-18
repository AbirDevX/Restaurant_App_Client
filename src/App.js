import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CheckOut from "./Components/CheckOut";
import Foods from "./Components/Foods";
import NotFound from "./Components/NotFound";
import { useAutoLogin } from "./Hooks/useLogin";
import Layout from "./Layout/Layout";
import About from "./Pages/About";
import Booking from "./Pages/Booking";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Menu from "./Pages/Menu";
import OrderDetails from "./Pages/OrderDetails";
import OrderList from "./Pages/OrderList";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import ResetPw from "./Pages/ResetPw";
import Service from "./Pages/Service";
import Team from "./Pages/Team";
import Testimonial from "./Pages/Testimonial";
import GustRoute from "./routes/GustRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { loading } = useAutoLogin();
  const router = createBrowserRouter([
    // REGISTER
    {
      path: "/sing-up",
      element: (
        <Layout>
          <GustRoute>
            <Register />
          </GustRoute>
        </Layout>
      ),
    },
    // LOGIN
    {
      path: "/login",
      element: (
        <Layout>
          <GustRoute>
            <Login />
          </GustRoute>
        </Layout>
      ),
    },
    // RESET PASSWORD
    {
      path: "/reset-password",
      element: (
        <Layout>
          <GustRoute>
            <ResetPw />
          </GustRoute>
        </Layout>
      ),
    },
    // HOME
    {
      path: "/",
      element: (
        <Layout isHome={true}>
          <ProtectedRoute>
            <>
              <Service />
              <About />
              <Menu />
              <Booking />
              <Team />
              <Testimonial />
            </>
          </ProtectedRoute>
        </Layout>
      ),
    },
    // ABOUT
    {
      path: "/about",
      element: (
        <Layout isAbout={true}>
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // SERVICE
    {
      path: "/service",
      element: (
        <Layout isService={true}>
          <ProtectedRoute>
            <Service />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // MENU
    {
      path: "/menu",
      element: (
        <Layout isMenu={true}>
          <ProtectedRoute>
            <Menu />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // CONTACT
    {
      path: "/contact",
      element: (
        <Layout isContact={true}>
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // BOOKING
    {
      path: "/booking",
      element: (
        <Layout isBooking={true}>
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // OUR-TEAM
    {
      path: "/our-team",
      element: (
        <Layout isOurTeam={true}>
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // TESTIMONIAL
    {
      path: "/testimonial",
      element: (
        <Layout isTestimonial={true}>
          <ProtectedRoute>
            <Testimonial />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // FOODS
    {
      path: "/foods",
      element: (
        <Layout isFoods={true}>
          <ProtectedRoute>
            <Foods />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // CHECKOUT
    {
      path: "/checkout",
      element: (
        <Layout isCheckout={true}>
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // VIEW CART
    {
      path: "/view-cart",
      element: (
        <Layout isCart={true}>
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // VIEW ORDER
    {
      path: "/view-orders",
      element: (
        <Layout isOrderList={true}>
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // ORDER DETAILS
    {
      path: "/orders-details/:orderId",
      element: (
        <Layout isOrderDetails={true}>
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // PROFILE
    {
      path: "/profile/:id",
      element: (
        <Layout>
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        </Layout>
      ),
    },
    // NOT FOUND
    {
      path: "*",
      element: (
        <Layout>
          <NotFound />
        </Layout>
      ),
    },
  ]);

  if (loading) {
    return (
      <div
        id="spinner"
        className=" show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
export default App;
