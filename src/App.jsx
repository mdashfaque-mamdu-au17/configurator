import MainLayout from "./components/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Konva from "./pages/konva/Konva";
import KonvaDynamic from "./pages/konv-dynamic/KonvaDynamic";
import ShapeEditor from "./pages/konva/components/ShapeEditor";
import KonvaNewStart from "./pages/konva-new-strat/KonvaNewStart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/konva-dynamic",
    element: <KonvaDynamic />,
  },
  {
    path: "/konva",
    element: <ShapeEditor />,
  },
  {
    path: "konva-new-strat",
    element: <KonvaNewStart />,
  },
]);

function App() {
  document.title = "Configurator";
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
