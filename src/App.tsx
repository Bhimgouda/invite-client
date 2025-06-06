import { useEffect, useState } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase.tsx";

interface InviteCode {
  username: string;
  validated: boolean;
  // Add any other fields your document has
}

function App() {
  const [name, setName] = useState("");
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const getInviteCodes = async () => {
      const inviteCodesRef = collection(db, "inviteCodes");

      // Get all documents in the collection
      const querySnapshot = await getDocs(inviteCodesRef);

      // Create an array to store the results

      // Initialize the array properly
      const _inviteCodes: InviteCode[] = [];

      // Loop through the documents and add them to the array
      querySnapshot.forEach((doc) => {
        _inviteCodes.push({
          ...(doc.data() as InviteCode), // Cast the data to your interface type
        });
      });

      setInviteCodes(_inviteCodes);
    };

    getInviteCodes();
  }, []);

  // Save it DB in inviteCode {AMOG71BY: amogh}
  // And remove it once validated
  // Add it to validatedInviteCodes list as {amogh: true}
  // Later on wallet connect we would just update that once {amogh: 0x121...511}
  const generateReferralCode = async (e: any) => {
    e.preventDefault();

    if (!name) return;

    const randomString = Math.random().toString(36).substring(2, 4).toUpperCase();
    const code = `${name.substring(0, 4).toUpperCase()}${randomString}`; // To Combine first 4 letters of name with random string

    setReferralCode(code);

    try {
      await setDoc(doc(db, "inviteCodes", code), {
        username: name,
        validated: false,
      });

      // Return the generated code
      return code;
    } catch (error) {
      console.error("Error saving referral code: ", error);
      return null;
    }
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
        <div className="space-y-6 h-svh flex justify-center flex-col">
          <form className="space-y-6 ">
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
          </form>

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
