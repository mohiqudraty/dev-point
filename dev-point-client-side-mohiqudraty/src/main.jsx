import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
     
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="container mx-auto">
            <RouterProvider router={router}></RouterProvider>
          </div>
        </AuthProvider>
        <Toaster />
      </QueryClientProvider>
      
    </HelmetProvider>
  </React.StrictMode>
);
