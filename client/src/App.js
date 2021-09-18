import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { loadStripe } from "@stripe/stripe-js";

import Home from "./pages/Home";
import Result from "./pages/Result";
import Product from "./pages/Product";
import { CartProvider } from "use-shopping-cart";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const stripePromise = loadStripe('pk_test_51JaInbHujC1nLecaRDt6MjPVh6PMQVEUCP5mLAdMzhqMEMW7LmygqqZJ62PULaaU8FnQMXTji4wMbq36N74M3w2100iiTSZdWw');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currency="USD"
      >
        <BrowserRouter>
          <Toaster position='bottom-center' />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/:productID" component={Product} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
