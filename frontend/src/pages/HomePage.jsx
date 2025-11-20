import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "../components/common/Sidebar";
import ChatContainer from "../components/common/ChatContainer";
import useSocket from "../hooks/useSocket";

export const HomePage = () => {
  useSocket();
  return (
    <div className="flex h-screen bg-background">
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <ChatContainer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
