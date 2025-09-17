import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mx-auto px-4 md:px-12 py-4 " style={{marginTop:"5rem"}}>
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
