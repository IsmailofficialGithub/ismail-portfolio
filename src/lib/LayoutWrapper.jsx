import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mt-24 mx-auto pl-12 pr-12 py-4" style={{paddingLeft:"3rem",paddingRight:"3rem"}}>{children}</div>
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
