import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthController from "./controllers/AuthController";
import { AuthProvider } from "./models/providers/AuthProvider";
import LandingPage from "./views/LandingPage";
import AboutUsPage from "./views/AboutUs";
import BrandPage from "./views/Brands";
import ExplorePage from "./views/Explore";
import AcademyPage from "./views/Academy";
import Authguard from "./components/Authguard";
import BuilderProfileController from "./controllers/BuilderProfileController";
import BuilderController from "./controllers/BuilderController";
import ScrapeWithProductController from "./controllers/ProductController";
import { ProfileProvider } from "./models/providers/ProfileProvider";
import Merchant from "./views/Merchantpage";
import NotFoundPage from "./views/NotFoundPage";
import SettingsController from "./controllers/SettingsController";
import toast, { Toaster } from "react-hot-toast";
import { BuilderProvider } from "./models/providers/BuilderProvider";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/:title", element: <Merchant /> },
  { path: "/AboutUs", element: <AboutUsPage /> },
  { path: "/Brands", element: <BrandPage /> },
  { path: "/Explore", element: <ExplorePage /> },
  { path: "/Academy", element: <AcademyPage /> },
  { path: "/login", element: <AuthController /> },
  { path: "/NotFoundPage", element: <NotFoundPage /> },
  { path: "/Settings", element: <SettingsController /> },

  {
    path: "/home",
    element: (
      <Authguard>
        <ScrapeWithProductController />
      </Authguard>
    ),
  },
  {
    path: "/builder",
    element: (
      <Authguard>
        <BuilderController />{" "}
      </Authguard>
    ),
  },
  {
    path: "/builder/profile",
    element: (
      <Authguard>
        <BuilderProfileController />
      </Authguard>
    ),
  },
  {
    path: "/settings",
    element: (
      <Authguard>
        <SettingsController />
      </Authguard>
    ),
  },
]);

function App() {
  return (
    <BuilderProvider>
    <ProfileProvider>
      <AuthProvider>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
        <RouterProvider router={router} />
      </AuthProvider>
    </ProfileProvider>
    </BuilderProvider>
  );
}

export default App;
