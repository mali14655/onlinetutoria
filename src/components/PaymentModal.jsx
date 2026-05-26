import React, { useState } from "react";
import { FaTimes, FaWhatsapp, FaCopy } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import QRcode from "../../public/QRCode.jpeg";
import { SITE_EMAIL } from "../constants/contact";

export const PaymentModal = ({ isOpen, onClose, price }) => {
  const bankDetails = {
    accountTitle: "Your Account Title",
    accountNumber: "1234567890",
    iban: "PK00XXXX0000000000000000",
    bankName: "Your Bank Name",
    accountType: "Current / Savings Account",
    branchCode: "0000",
    branchName: "Your Branch Name",
  };

  const whatsappNumber = "03168969151";
  const whatsappMessage = `Hello, I have made a payment of ${price} for the course. Here are my details: [Your Name, Course Name, Transaction ID].`;

  const [copiedField, setCopiedField] = useState(null);
  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-screen-lg p-6 rounded-2xl shadow-2xl relative mx-4 max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute hover:cursor-pointer top-4 right-4 text-gray-500 hover:text-black text-xl"
          >
            <FaTimes />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6">
            Payment Instructions
          </h2>

          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Steps to start:
              </h3>
              <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                <li>
                  Pay the mentioned amount:{" "}
                  <span className="font-bold">{price}</span>
                </li>
                <li>
                  Send the payment receipt and the name of the course you're
                  enrolling in via WhatsApp.
                </li>
                <li>We'll confirm your payment and schedule your classes.</li>
                <li>
                  If you have any questions before making a payment or would
                  like to take a trial class, feel free to contact us on
                  WhatsApp.
                </li>
              </ol>
            </div>

            {/* Bank details */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Bank Transfer Details:
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  {Object.entries({
                    "Account Title": bankDetails.accountTitle,
                    "Account Number": bankDetails.accountNumber,
                    IBAN: bankDetails.iban,
                    "Bank Name": bankDetails.bankName,
                    "Account Type": bankDetails.accountType,
                    "Branch Code": bankDetails.branchCode,
                    "Branch Name": bankDetails.branchName,
                  }).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-600">{label}:</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">{value}</span>
                        <button
                          onClick={() => copyToClipboard(value, label)}
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="Copy to clipboard"
                        >
                          <FaCopy className="text-sm" />
                        </button>
                        {copiedField === label && (
                          <span className="text-xs text-green-600 ml-1">
                            Copied!
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Scan to Pay (QR Code):
              </h3>
              <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                <img
                  src={QRcode}
                  alt="QR Code for Payment"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            {/* After payment */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                After Payment:
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  Please send the payment receipt to our WhatsApp number so we
                  can confirm your payment and schedule your classes.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(
                    /\D/g,
                    ""
                  )}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  <FaWhatsapp className="mr-2" size={20} />
                  Send Receipt via WhatsApp
                </a>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>
                If you have any problem or query, feel free to contact us on
                WhatsApp or email us at{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-blue-600 hover:underline"
                >
                  {SITE_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const PaymentButtonWithModal = ({ price, className = "" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300 ${className}`}
      >
        Enroll Now
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            price={price}
          />
        )}
      </AnimatePresence>
    </>
  );
};
