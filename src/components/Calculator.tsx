import { useState } from "react";
import { evaluate } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    if (display === "0" && num !== ".") {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperator = (op: string) => {
    const lastChar = expression.slice(-1);
    if (["+", "-", "×", "÷", "*", "/"].includes(lastChar)) {
      setExpression(expression.slice(0, -1) + op);
    } else {
      setExpression(expression + op);
    }
    setDisplay(display + op);
  };

  const handleEquals = () => {
    try {
      const result = evaluate(
        expression.replace(/×/g, "*").replace(/÷/g, "/").replace(/\^/g, "^")
      );
      const resultStr = Number(result).toString();
      setHistory([...history, `${expression} = ${resultStr}`]);
      setDisplay(resultStr);
      setExpression(resultStr);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleDelete = () => {
    if (display.length === 1) {
      setDisplay("0");
      setExpression("");
    } else {
      setDisplay(display.slice(0, -1));
      setExpression(expression.slice(0, -1));
    }
  };

  const handleFunction = (func: string) => {
    try {
      let result;
      const currentValue = parseFloat(expression || display);
      
      switch (func) {
        case "√":
          result = Math.sqrt(currentValue);
          break;
        case "x²":
          result = Math.pow(currentValue, 2);
          break;
        case "%":
          result = currentValue / 100;
          break;
        case "+/-":
          result = currentValue * -1;
          break;
        case "sin":
          result = Math.sin(currentValue);
          break;
        case "cos":
          result = Math.cos(currentValue);
          break;
        case "tan":
          result = Math.tan(currentValue);
          break;
        case "log":
          result = Math.log10(currentValue);
          break;
        case "ln":
          result = Math.log(currentValue);
          break;
        case "exp":
          result = Math.exp(currentValue);
          break;
        case "π":
          result = Math.PI;
          setDisplay(result.toString());
          setExpression(result.toString());
          return;
        case "e":
          result = Math.E;
          setDisplay(result.toString());
          setExpression(result.toString());
          return;
        default:
          return;
      }
      
      const resultStr = result.toString();
      setHistory([...history, `${func}(${currentValue}) = ${resultStr}`]);
      setDisplay(resultStr);
      setExpression(resultStr);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
    }
  };

  const handlePower = () => {
    const lastChar = expression.slice(-1);
    if (!["+", "-", "×", "÷", "*", "/", "^"].includes(lastChar)) {
      setExpression(expression + "^");
      setDisplay(display + "^");
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const buttons = [
    { label: "C", type: "function", action: handleClear },
    { label: "( )", type: "function", action: () => handleNumber("(") },
    { label: "%", type: "function", action: () => handleFunction("%") },
    { label: "÷", type: "operator", action: () => handleOperator("÷") },
    
    { label: "7", type: "number", action: () => handleNumber("7") },
    { label: "8", type: "number", action: () => handleNumber("8") },
    { label: "9", type: "number", action: () => handleNumber("9") },
    { label: "×", type: "operator", action: () => handleOperator("×") },
    
    { label: "4", type: "number", action: () => handleNumber("4") },
    { label: "5", type: "number", action: () => handleNumber("5") },
    { label: "6", type: "number", action: () => handleNumber("6") },
    { label: "-", type: "operator", action: () => handleOperator("-") },
    
    { label: "1", type: "number", action: () => handleNumber("1") },
    { label: "2", type: "number", action: () => handleNumber("2") },
    { label: "3", type: "number", action: () => handleNumber("3") },
    { label: "+", type: "operator", action: () => handleOperator("+") },
    
    { label: "√", type: "function", action: () => handleFunction("√") },
    { label: "0", type: "number", action: () => handleNumber("0") },
    { label: ".", type: "number", action: () => handleNumber(".") },
    { label: "=", type: "equals", action: handleEquals },
  ];

  const scientificButtons = [
    { label: "sin", action: () => handleFunction("sin") },
    { label: "cos", action: () => handleFunction("cos") },
    { label: "tan", action: () => handleFunction("tan") },
    { label: "log", action: () => handleFunction("log") },
    { label: "ln", action: () => handleFunction("ln") },
    { label: "exp", action: () => handleFunction("exp") },
    { label: "π", action: () => handleFunction("π") },
    { label: "e", action: () => handleFunction("e") },
    { label: "x^y", action: handlePower },
  ];

  const extraButtons = [
    { label: "+/-", action: () => handleFunction("+/-") },
    { label: "x²", action: () => handleFunction("x²") },
    { label: "⌫", action: handleDelete },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto p-4">
      <div className="flex-1 max-w-md mx-auto w-full">
        <Card className="bg-card border-border overflow-hidden shadow-2xl">
          {/* Display */}
          <div className="bg-[hsl(var(--calc-display))] p-6 min-h-[140px] flex flex-col justify-end">
            <div className="text-muted-foreground text-right text-sm mb-2 h-6 overflow-hidden">
              {expression || " "}
            </div>
            <div className="text-foreground text-right text-5xl font-light tracking-tight overflow-x-auto">
              {display}
            </div>
          </div>

          {/* Scientific functions */}
          <div className="grid grid-cols-3 gap-2 p-4 pb-2 bg-card/30">
            {scientificButtons.map((btn) => (
              <Button
                key={btn.label}
                onClick={btn.action}
                className="h-10 bg-[hsl(var(--calc-function))] hover:bg-[hsl(var(--calc-function))]/80 text-foreground font-medium text-sm rounded-xl transition-all active:scale-95"
              >
                {btn.label}
              </Button>
            ))}
          </div>

          {/* Extra functions */}
          <div className="grid grid-cols-3 gap-2 p-4 pb-2 bg-card/50">
            {extraButtons.map((btn) => (
              <Button
                key={btn.label}
                onClick={btn.action}
                className="h-12 bg-[hsl(var(--calc-function))] hover:bg-[hsl(var(--calc-function))]/80 text-foreground font-medium text-lg rounded-xl transition-all active:scale-95"
              >
                {btn.label}
              </Button>
            ))}
          </div>

          {/* Main buttons */}
          <div className="grid grid-cols-4 gap-3 p-4">
            {buttons.map((btn, index) => (
              <Button
                key={index}
                onClick={btn.action}
                className={`h-16 text-xl font-medium rounded-2xl transition-all active:scale-95 ${
                  btn.type === "number"
                    ? "bg-[hsl(var(--calc-number))] hover:bg-[hsl(var(--calc-number))]/80 text-foreground"
                    : btn.type === "operator"
                    ? "bg-[hsl(var(--calc-operator))] hover:bg-[hsl(var(--calc-operator))]/80 text-foreground"
                    : btn.type === "equals"
                    ? "bg-[hsl(var(--calc-equals))] hover:bg-[hsl(var(--calc-equals))]/80 text-foreground"
                    : "bg-[hsl(var(--calc-function))] hover:bg-[hsl(var(--calc-function))]/80 text-foreground"
                }`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* History */}
      {history.length > 0 && (
        <Card className="flex-1 max-w-md mx-auto w-full bg-card border-border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Historique</h3>
            <Button
              onClick={clearHistory}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {history.slice().reverse().map((item, index) => (
              <div
                key={index}
                className="p-3 bg-secondary/50 rounded-lg text-foreground text-sm font-mono"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Calculator;
