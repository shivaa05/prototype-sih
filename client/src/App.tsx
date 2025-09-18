import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/context/language-context";
import FarmerHome from "@/pages/farmer-home";
import Marketplace from "@/pages/marketplace";
import AiMode from "@/pages/ai-mode";
import AiChat from "@/pages/ai-chat";
import Messages from "@/pages/messages";
import Weather from "@/pages/weather";
import Notifications from "@/pages/notifications";
import Calls from "@/pages/calls";
import FarmingTips from "@/pages/farming-tips";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={FarmerHome} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/ai-mode" component={AiMode} />
      <Route path="/ai-chat" component={AiChat} />
      <Route path="/messages" component={Messages} />
      <Route path="/weather" component={Weather} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/calls" component={Calls} />
      <Route path="/farming-tips" component={FarmingTips} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
