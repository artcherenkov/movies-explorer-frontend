import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import AboutProject from "../components/AboutProject/AboutProject";
import Technologies from "../components/Technologies/Technologies";
import Student from "../components/Student/Student";
import Footer from "../components/Footer/Footer";

const HomePage = () => (
  <>
    <Header className="root__header" />
    <main className="main">
      <Hero className="main__hero" />
      <AboutProject />
      <Technologies />
      <Student />
    </main>
    <Footer />
  </>
);

export default HomePage;
