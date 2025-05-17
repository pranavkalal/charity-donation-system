
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

//
// Factory Pattern – Payment Button Factory
//
const StripeButton = ({ onClick, amount }) => (
  <button onClick={onClick} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
    Pay ${amount} with Stripe
  </button>
);

const PayPalButton = ({ onClick, amount }) => (
  <button onClick={onClick} className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600">
    Pay ${amount} with PayPal
  </button>
);

const PaymentButtonFactory = {
  create(method, amount, onClick) {
    switch (method) {
      case 'Stripe': return <StripeButton onClick={onClick} amount={amount} />;
      case 'PayPal': return <PayPalButton onClick={onClick} amount={amount} />;
      default: throw new Error("Unsupported payment method");
    }
  }
};

const MockPaymentForm = () => {
  const { id } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = parseFloat(amount || customAmount);

    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        `/api/campaigns/${id}/donate`,
        { amount: finalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(` Donated $${finalAmount} via ${paymentMethod}`);
      navigate(`/campaigns/${id}`);
    } catch (error) {
      console.error("Donation failed:", error);
      if (error.response?.status === 401) {
        alert(" You must be logged in to donate.");
        navigate('/login');
      } else {
        alert(" Donation failed. Please try again later.");
      }
    }
  };

  const paymentButton = PaymentButtonFactory.create(paymentMethod, amount || customAmount, handleSubmit);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <form className="bg-white w-full max-w-xl rounded-xl shadow-md p-6 space-y-6">
        <div>
          <label className="block text-gray-800 font-medium mb-2">How much would you like to donate?</label>
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

        <div>
          <label className="block text-gray-800 font-medium mb-2">Select Payment Method</label>
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

        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md"
          >
            Back
          </button>
          {paymentButton}
        </div>
      </form>
    </div>
  );
};

export default MockPaymentForm;