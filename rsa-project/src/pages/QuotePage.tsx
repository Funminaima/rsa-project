import { useState, useEffect } from "react";
import axios from "axios";
import Quote from "../components/Quote";
import { getQuote, getaddons } from "../apiCalls/api";
import { IQuote, IAddon } from "../type.d";

const QuotePage = () => {
  const [quote, setQuote] = useState<IQuote | null>(null);
  const [addons, setAddons] = useState<IAddon[]>([]);
  const [switchType, setSwitchType] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<any[]>([]);

  useEffect(() => {
    // Fetch quote data
    getQuote().then((quoteData: any) => {
      setQuote(quoteData[0]);
    });

    // Fetch addons data
    getaddons().then((addonsData: any) => {
      setAddons(
        addonsData.map((addon: any) => ({
          ...addon,
          isSelected: false,
          id: Math.floor(Math.random() * 100),
        }))
      );
    });
  }, []);

  const formatQuoteDate = (dateString: string): string | undefined => {
    try {
      const dateObject = new Date(dateString);

      // Array of month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Get components of the date
      const month = monthNames[dateObject.getMonth()];
      const day = dateObject.getDate();
      const year = dateObject.getFullYear();

      // Function to add ordinal suffix to day
      const getOrdinalSuffix = (day: number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const relevantDigits = day < 30 ? day % 20 : day % 30;
        const suffix =
          relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
        return `${day}${suffix}`;
      };

      const formattedDate = `${month} ${getOrdinalSuffix(day)} ${year}`;
      return formattedDate;
    } catch (error) {
      console.error("Error parsing or formatting date:", error);
    }
  };

  const onClickSwitchButton = () => {
    setSwitchType(!switchType);
  };

  const onClickSelectExtra = (addon: IAddon) => {
    console.log(addon, "addon");
    const selectedAddon = addons.map((prevAddon: any) =>
      prevAddon.id === addon.id
        ? { ...prevAddon, isSelected: !prevAddon.isSelected }
        : prevAddon
    );
    setAddons(selectedAddon);
  };

  const calculateTotalPrice = () => {
    const basePrice = switchType
      ? parseFloat(quote?.annualPrice?.toString() ?? "0") || 0
      : parseFloat(quote?.monthlyPrice?.toString() ?? "0") || 0;
    if (switchType) {
      const extrasTotal = addons.reduce((total, extra) => {
        if (extra.isSelected) {
          return total + extra.annualPrice;
        } else {
          return total;
        }
      }, 0);
      return basePrice + extrasTotal;
    } else {
      const extrasTotal = addons.reduce((total, extra) => {
        if (extra.isSelected) {
          return total + extra.monthlyPrice;
        } else {
          return total;
        }
      }, 0);
      return basePrice + extrasTotal;
    }
  };
  console.log(addons);
  return (
    <div>
      <Quote
        quote={quote}
        formatQuoteDate={formatQuoteDate}
        onClickSwitchButton={onClickSwitchButton}
        switchType={switchType}
        addons={addons}
        onClickSelectExtra={onClickSelectExtra}
        calculateTotalPrice={calculateTotalPrice}
      />
    </div>
  );
};

export default QuotePage;
