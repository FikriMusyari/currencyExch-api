import { useState, useEffect } from "react";
import DropdownA from "./DropdownA";
import LoadingButton from "./LoadingButton";
import InputText from "./InputText";
import SpotlightCard from "./SpotlightCard";

function Konversi() {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [options, setOptions] = useState([]);
  const [NilaiTukar, setNilaiTukar] = useState({});
  const [amount, setAmount] = useState("");
  const [Hasil, setHasil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiDate, setApiDate] = useState("");

  const fetchData = () => {
    fetch('https://api.vatcomply.com/currencies')
      .then(response => response.json())
      .then(data => {
        const MataUangData = [];
        for (const matauang in data) {
          MataUangData.push({
            value: matauang,
            label: `${data[matauang].name} (${data[matauang].symbol})`
          });
        }
        setOptions(MataUangData);
      })
      .catch(error => {
        console.error('Error Ambil Data:', error);
      });

    fetch('https://api.vatcomply.com/rates')
      .then(response => response.json())
      .then(data => {
        setNilaiTukar(data.rates);
        setApiDate(data.date);
      })
      .catch(error => {
        console.error('Error Ambil Data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFromCurrencyChange = (selectedOption) => {
    setFromCurrency(selectedOption);
  };

  const handleToCurrencyChange = (selectedOption) => {
    setToCurrency(selectedOption);
  };

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const handleConversion = () => {
    if (fromCurrency && toCurrency && amount) {
      const fromRate = NilaiTukar[fromCurrency.value];
      const toRate = NilaiTukar[toCurrency.value];
      if (fromRate && toRate) {
        setLoading(true);
        setTimeout(() => {
          const result = (amount / fromRate) * toRate;
          setHasil(result);
          setLoading(false);
        }, 2000);
      }
    }
  };

  return (
    <div>
        <div className="bg-gradient-to-r from-sky-500 via-green-600 to-red-600 p-2 animate-gradient">
        <h1 className="text-6xl font-bold text-center mx-10 mb-20">Konversi Mata Uang By
        <a className="top-10" href="https://www.vatcomply.com/documentation"> API VATComply.com</a>
        </h1>
        </div>
      <div className="mt-8">
      <DropdownA
        options={options}
        selectedCurrency={fromCurrency}
        onCurrencyChange={handleFromCurrencyChange}
      />
      <InputText amount={amount} onAmountChange={handleAmountChange} />
      <DropdownA
        options={options}
        selectedCurrency={toCurrency}
        onCurrencyChange={handleToCurrencyChange}
      />
      <LoadingButton onClick={handleConversion} loading={loading} />

      <div className="mb-14" />

      {Hasil !== null && !loading && (
      <div className="flex justify-center items-center h-32">
      <SpotlightCard className="custom-spotlight-card w-1/2 h-auto" spotlightColor="rgba(0, 229, 255, 0.2)">
        <h2 className="text-lg font-bold text-blue-700 text-center">HASIL</h2>
          <p className="text-xl font-bold text-lime-600">Base: {fromCurrency?.label}</p>
          <p className="text-xl text-lime-600">Tanggal: {apiDate}</p>
          <p className="text-xl text-lime-600">Hasil: {Hasil.toFixed(2)} {toCurrency?.label}</p>
        </SpotlightCard>
      </div>
    )}
    </div>
    </div>
  );
}

export default Konversi;
