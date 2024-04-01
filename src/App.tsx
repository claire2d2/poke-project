import "./App.css";
import { Routes, Route } from "react-router-dom";

// import pages
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AllPokemon from "./pages/AllPokemon";
import OnePoke from "./pages/OnePoke";
import NotFound from "./pages/NotFound";
import TeamPage from "./pages/TeamPage";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <div className="App h-screen">
      <div className="pages h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="pokemon">
              <Route index element={<AllPokemon />} />
              <Route path=":pokeId" element={<OnePoke />} />
            </Route>
            <Route path="team" element={<TeamPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
