import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";

const HomePage = () => (
  <>
    <Header className="root__header" />
    <main className="main">
      <Hero className="main__hero" />
    </main>
  </>
);

export default HomePage;
