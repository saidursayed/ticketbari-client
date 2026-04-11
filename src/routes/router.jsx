import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Dashboard/Profile/Profile";
import BookedTickets from "../pages/Dashboard/User/BookedTickets";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import AddedTickets from "../pages/Dashboard/Vendor/AddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement: errorpage,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/all-tickets",
        Component: AllTickets,
      },
      {
        path: "/tickets/:id",
        Component: TicketDetails,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        // index: true,
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "booked-tickets",
        element: <BookedTickets></BookedTickets>,
      },
      {
        path: "transaction-history",
        element: <TransactionHistory></TransactionHistory>,
      },

      {
        path: "add-ticket",
        element: <AddTicket></AddTicket>,
      },
      {
        path: "added-tickets",
        element: <AddedTickets></AddedTickets>,
      },
      {
        path: "booking-requests",
        element: <RequestedBookings></RequestedBookings>,
      },
      {
        path: "revenue-overview",
        element: <RevenueOverview></RevenueOverview>,
      },

      {
        path: "manage-tickets",
        element: <ManageTickets></ManageTickets>,
      },
      {
        path: "manage-users",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "advertise-tickets",
        element: <AdvertiseTickets></AdvertiseTickets>,
      },
    ],
  },
]);
