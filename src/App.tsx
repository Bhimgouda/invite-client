import { useState } from "react";
import { Copy, RefreshCw } from "lucide-react";

function App() {
  const [name, setName] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const generateReferralCode = () => {
    if (!name) return;

    // Generate a random string of 8 characters
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();
    // Combine first two letters of name with random string
    const code = `${name.substring(0, 4).toUpperCase()}${randomString}`;
    setReferralCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-[Outfit]"
      style={{ backgroundImage: "linear-gradient(180deg, #01152a 1.93%, #03050d 28.18%)" }}
    >
      <div
        className="w-full max-w-md  rounded-lg  p-8"
        style={{ backgroundImage: "linear-gradient(180deg, #01152a 1.93%, #03050d 28.18%)" }}
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Enter Invitee's Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-[#01152a] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(8,79,170)] text-white placeholder-gray-400"
              placeholder="John Doe"
            />
          </div>

          <button
            onClick={generateReferralCode}
            className="w-full bg-[rgb(8,79,170)] text-white py-2 px-4 rounded-md hover:bg-[rgb(8,79,170)]/90 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Generate Invite Code
          </button>

          {referralCode && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-white mb-2">Referral Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralCode}
                  className="w-full px-4 py-2 bg-[#01152a] rounded-md text-white"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-[rgb(8,79,170)] text-white rounded-md hover:bg-[rgb(8,79,170)]/90 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
