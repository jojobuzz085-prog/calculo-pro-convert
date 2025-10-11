import Calculator from "@/components/Calculator";
import CurrencyConverter from "@/components/CurrencyConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Calculatrice Pro</h1>
          <p className="text-muted-foreground">Ultra-optimisée et professionnelle</p>
        </div>
        <Calculator />
      </div>
      <CurrencyConverter />
    </div>
  );
};

export default Index;
