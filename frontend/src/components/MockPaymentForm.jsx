import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MockPaymentForm = () => {
  const { id } = useParams(); // ✅ Using ID from route
  const navigate = useNavigate();

  const [amount, setAmount] = useState("20");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Stripe");

  const handleAmountChange = (value) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setAmount("");
    setCustomAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAmount = amount || customAmount;
    alert(`✅ You donated $${finalAmount} to campaign ID: ${id} via ${paymentMethod}`);
    navigate(`/campaigns/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-8 px-4">
      <h1 className="text-4xl font-bold text-[#242067] mb-10">Donate Now</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-xl shadow p-6 space-y-6"
      >
        {/* Donation Amount */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            How much would you like to donate?
          </label>
          <div className="space-y-2">
            {["20", "30", "60"].map((val) => (
              <label key={val} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="amount"
                  value={val}
                  checked={amount === val}
                  onChange={() => handleAmountChange(val)}
                />
                <span>${val}</span>
              </label>
            ))}
            <input
              type="text"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            How would you like to pay?
          </label>
          <div className="space-y-2">
            {["Stripe", "PayPal"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md"
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Pay with {paymentMethod}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MockPaymentForm;
