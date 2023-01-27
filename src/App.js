import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./App.css";
import abi from "./contracts/Guestbook.json";

// Steph's guestCount contract on Polygon Mumbai -- update to yours!
const contractAddress = "0xA676f2cC7D400D1DE8b20bbd8007ca0E7A4AF5e6";
const scannerAddress = `https://mumbai.polygonscan.com/address/${contractAddress}`;

export function App() {
  const { chains, provider } = configureChains(
    [polygonMumbai, polygon],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Guestbook",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [guestCount, setGuestCount] = useState("");
  const [guests, setGuests] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentName, setCurrentName] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  function awaitAll(count, asyncFn) {
    const promises = [];

    for (let i = 0; i < count; ++i) {
      promises.push(asyncFn(i));
    }

    return Promise.all(promises);
  }

  useEffect(() => {
    fetchGuestCount().then(async (gc) => {
      awaitAll(gc, fetchGuest).then((allGuests) => setGuests(allGuests));
    });
  }, []);

  async function fetchGuestCount() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const bigGuestCount = await contract.guestCount();
        const guestCount = bigGuestCount.toNumber();
        setGuestCount(guestCount.toString());
        return guestCount;
      } catch (err) {
        console.log("Error: ", err);
      }
      setIsUpdating(false);
    }
  }

  function timeStringToInt(date) {
    return date.getTime();
  }

  function timeIntToString(date) {
    return new Date(date).toTimeString();
  }

  function formatGuest(guest) {
    const [name, message, date] = guest;
    const dateString = timeIntToString(date.toNumber());
    return { name, message, dateString };
  }

  async function fetchGuest(id = 0) {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const guest = await contract.getGuestById(id);
        const formattedGuest = formatGuest(guest);
        return formattedGuest;
      } catch (err) {
        console.log("Error: ", err);
      }
      setIsUpdating(false);
    }
  }

  async function addNewGuest(newNum) {
    if (!guestCount) return;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const date = timeStringToInt(new Date());
      const transaction = await contract.addGuest(
        currentName,
        currentMessage,
        date
      );
      setIsUpdating(true);
      await transaction.wait();
      setIsUpdating(false);
      setCurrentName("");
      setCurrentMessage("");
      fetchGuest(guestCount).then((g) => {
        setGuests([...guests, g]);
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addNewGuest();
  }

  console.log(wagmiClient, chains);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <Box component="nav">
            <AppBar component="nav">
              <Container
                maxWidth="lg"
                sx={{
                  padding: "15px 0",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <p style={{ margin: "10px 0 0", fontSize: "30px" }}>
                  GuestBook
                </p>
                <ConnectButton />
              </Container>
            </AppBar>
          </Box>
          <Box component="main" sx={{ marginTop: "100px" }}>
            <Container>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", padding: "20px 0" }}
              >
                <div style={{ width: "100%" }}>
                  <div style={{ width: "100%" }}>
                    <TextField
                      id="name"
                      type="string"
                      onChange={(e) => setCurrentName(e.target.value)}
                      value={currentName}
                      label="Name"
                      disabled={isUpdating}
                      fullWidth
                    />
                  </div>
                  <br />
                  <div style={{ width: "100%" }}>
                    <TextField
                      id="message"
                      label="Message"
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      value={currentMessage}
                      multiline
                      rows={4}
                      fullWidth
                      disabled={isUpdating}
                    />
                  </div>
                </div>
                <Button variant="outlined" type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Submit"}
                </Button>
              </form>
              {Object.values(guests) &&
                Object.values(guests)
                  .reverse()
                  .map((g) => (
                    <div key={g.dateString}>
                      {g.dateString} <strong>{g.name}</strong>: {g.message}{" "}
                    </div>
                  ))}
              <br />
              <a target="_blank" rel="noreferrer" href={scannerAddress}>
                View smart contract on polyscan
              </a>
            </Container>
          </Box>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
