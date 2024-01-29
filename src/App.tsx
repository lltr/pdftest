import './App.css'
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function App() {

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    EnterFullScreen: () => <></>,
    EnterFullScreenMenuItem: () => <></>,
    SwitchTheme: () => <></>,
    SwitchThemeMenuItem: () => <></>,
    ShowProperties: () => <></>,
    ShowPropertiesMenuItem: () => <></>,
  });

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [
      // Remove the attachments tab (\`defaultTabs[2]\`)
      defaultTabs[0], // Bookmarks tab
      defaultTabs[1], // Thumbnails tab
    ],
  });

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <h2>Testing PDF</h2>
      <div
        style={{
          width: "1420px",
          height: "1080px",
        }}
      >
        {/* <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>; */}
        <Viewer
          fileUrl="src/assets/test.pdf"
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
}

export default App
