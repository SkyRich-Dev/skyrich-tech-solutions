import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CustomCursor } from "@/components/ui/CustomCursor";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Products from "./pages/Products";
import AidaProduct from "./pages/products/Aida";
import AivaProduct from "./pages/products/Aiva";
import OrbitProduct from "./pages/products/Orbit";
import Insights from "./pages/Insights";
import InsightArticle from "./pages/InsightArticle";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/industries" component={Industries} />
      <Route path="/products" component={Products} />
      <Route path="/products/aida" component={AidaProduct} />
      <Route path="/products/aiva" component={AivaProduct} />
      <Route path="/products/orbit-crm" component={OrbitProduct} />
      <Route path="/insights" component={Insights} />
      <Route path="/insights/:slug" component={InsightArticle} />
      <Route path="/about" component={About} />
      <Route path="/careers" component={Careers} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
