import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212]">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 md:px-12 pb-4 pt-20 sm:pb-6 md:pt-24">
        {children}
      </div>
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
