import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const MockPaymentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [amount, setAmount] = useState("20");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);

    const finalAmount = parseFloat(amount || customAmount);

    if (isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      // Get auth token from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));

      if (!userData || !userData.token) {
        alert("You need to be logged in to make a donation.");
        navigate('/login', { state: { from: `/campaigns/${id}` } });
        return;
      }

      // Include auth token in request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`
        }
      };

      const response = await axios.post(`/api/campaigns/${id}/donate`, {
        amount: finalAmount,
      },config);

      console.log('Donation response:', response.data);

      alert(`✅ Thank you! You donated $${finalAmount} to campaign ID: ${id} via ${paymentMethod}`);
      
      // Navigate back to campaign page
      navigate(`/campaigns/${id}`);
    } catch (error) {
      console.error("Donation failed:", error);
      alert("❌ Donation failed. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xl rounded-xl shadow-md p-6 space-y-6"
      >
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
            disabled={isProcessing}
            className={`${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-6 py-2 rounded-md`}
          >
            {isProcessing ? 'Processing...' : `Pay with ${paymentMethod}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MockPaymentForm;
