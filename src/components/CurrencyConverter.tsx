import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, ArrowRightLeft } from "lucide-react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [rates, setRates] = useState<Record<string, number>>({
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.5,
    CAD: 1.36,
    AUD: 1.53,
    CHF: 0.88,
    CNY: 7.24,
    INR: 83.12,
    MXN: 17.15,
    BRL: 4.97,
    ZAR: 18.75,
    RUB: 92.5,
    KRW: 1320.5,
    SGD: 1.34,
    AED: 3.67,
    MAD: 10.12,
  });

  const currencies = [
    { code: "USD", name: "Dollar US", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Livre Sterling", symbol: "£" },
    { code: "JPY", name: "Yen Japonais", symbol: "¥" },
    { code: "CAD", name: "Dollar Canadien", symbol: "C$" },
    { code: "AUD", name: "Dollar Australien", symbol: "A$" },
    { code: "CHF", name: "Franc Suisse", symbol: "CHF" },
    { code: "CNY", name: "Yuan Chinois", symbol: "¥" },
    { code: "INR", name: "Roupie Indienne", symbol: "₹" },
    { code: "MXN", name: "Peso Mexicain", symbol: "MX$" },
    { code: "BRL", name: "Real Brésilien", symbol: "R$" },
    { code: "ZAR", name: "Rand Sud-Africain", symbol: "R" },
    { code: "RUB", name: "Rouble Russe", symbol: "₽" },
    { code: "KRW", name: "Won Sud-Coréen", symbol: "₩" },
    { code: "SGD", name: "Dollar Singapourien", symbol: "S$" },
    { code: "AED", name: "Dirham UAE", symbol: "د.إ" },
    { code: "MAD", name: "Dirham Marocain", symbol: "DH" },
  ];

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      setResult(null);
      return;
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    const converted = (amountNum / fromRate) * toRate;
    setResult(converted);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed top-4 right-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg rounded-full w-12 h-12 p-0 z-50"
          size="icon"
        >
          <DollarSign className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Convertisseur de Devises</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Convertissez instantanément entre différentes devises
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Montant</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-input border-border text-foreground"
              placeholder="Entrez un montant"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">De</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {currencies.map((currency) => (
                  <SelectItem
                    key={currency.code}
                    value={currency.code}
                    className="text-popover-foreground"
                  >
                    {currency.symbol} {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={swapCurrencies}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-secondary"
            >
              <ArrowRightLeft className="w-5 h-5 text-foreground" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Vers</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-input border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {currencies.map((currency) => (
                  <SelectItem
                    key={currency.code}
                    value={currency.code}
                    className="text-popover-foreground"
                  >
                    {currency.symbol} {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {result !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-sm text-muted-foreground mb-1">Résultat</div>
              <div className="text-3xl font-bold text-foreground">
                {result.toFixed(2)}{" "}
                <span className="text-xl text-muted-foreground">{toCurrency}</span>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground text-center mt-4">
            Les taux de change sont approximatifs et à titre indicatif
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CurrencyConverter;
