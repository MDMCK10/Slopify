import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import SlopboxPage from "./pages/Slopbox";
import ProfilePage from "./pages/ProfilePage";
import "./styles/global.css";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const update = await check();
  if (update) {
    console.log(`found udpate ${update.version} from ${update.date} with notes ${update.body}`);
    let downloaded = 0;
    let contentLength = 0;
  
    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case "Started":
          contentLength = event.data.contentLength;
          console.log(`started downloading ${event.data.contentLength} bytes`);
          break;
        case "Progress":
          downloaded += event.data.chunkLength;
          console.log(`downloaded ${downloaded} from ${contentLength}`);
          break;
        case "Finished":
          console.log("download finished");
          break;
      }
    });
  
    console.log("update installed");
    await relaunch();
  } else {
    console.log("no updates available")
  }

export default function App() {

  return (
    <div className="app" style={{ backgroundColor: "var(--bg-dark)" }}>
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/slopbox" element={<SlopboxPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}
