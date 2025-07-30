"use client";

import { CodeEditor } from "@/components/editor";
import { EyeOffIcon } from "@/components/icons/eyeoff";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useInstallDependencies } from "@/hooks/use-install-dependencies";
import { useWebContainer } from "@/hooks/use-webcontainer";
import {
  AllTemplateId,
  cn,
  TemplateMode,
  type TemplateSelector,
} from "@/lib/utils";
import { initialFiles, runScript } from "@/lib/webcontainer";
import { WebContainer } from "@webcontainer/api";
import { useQuery } from "convex/react";
import {
  CheckCheck,
  ExternalLink,
  Hourglass,
  Loader,
  Play,
  WrapText,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ModeSelector } from "./components/mode-selector";
import { TemplateActions } from "./components/template-actions";
import { TemplateFileSelector } from "./components/template-file-selector";

export default function TemplateEditor() {
  const userId = "00123";
  const templates = useQuery(
    api.template.getTemplates,
    // userId ? { userId } : "skip"
    "skip"
  );
  const { installDeps, error, status } = useInstallDependencies();
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateSelector | null>(null);
  const [selectedMode, setSelectedMode] = useState<TemplateMode>("Text");
  const [editorValue, setEditorValue] = useState("");
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [isFullScreen, setisFullScreen] = useState(false);
  const handleTimeout = () => {
    console.warn("WebContainer not ready after timeout.");
  };
  const { isLoaded, webContainerRef, setWebContainerRef } = useWebContainer(
    30000,
    handleTimeout
  );

  // Create templateId state
  const handleTemplateChange = (templateId: AllTemplateId) => {
    if (!templates) {
      return;
    }

    const selectedTemplate = templates.find((t) => t.templateId === templateId);

    if (!selectedTemplate) {
      return;
    }

    setSelectedTemplate(selectedTemplate);
  };

  useEffect(() => {
    const mode = selectedMode;
    const template = selectedTemplate;
    if (!template) {
      return;
    }

    // utils is only supported in JSX mode.
    if (mode === "Text" && template.templateId === "utils") {
      return;
    }

    if (template.templateId !== "utils") {
      if (mode === "Text") {
        setEditorValue(template.text_template);
      }

      if (mode === "Jsx") {
        setEditorValue(template.raw_jsx_content);
      }
    } else {
      if ("file_content" in template) {
        setEditorValue(template.file_content);
      }
    }
  }, [selectedMode, selectedTemplate]);

  useEffect(() => {
    const initWebContainer = async () => {
      if (webContainerRef) return; // Prevent double boot

      try {
        const instance = await WebContainer.boot();
        await instance.mount(initialFiles);

        setWebContainerRef(instance);
      } catch (err) {
        console.error("WebContainer boot failed", err);
      }
    };

    // initWebContainer();
  }, []);

  useEffect(() => {
    const instance = webContainerRef;
    if (instance) {
      installDeps(instance);
    }
  }, [webContainerRef]);

  useEffect(() => {
    if (!htmlContent) return;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setSrcUrl(url);

    // Clean up the object URL
    return () => URL.revokeObjectURL(url);
  }, [htmlContent]);

  return (
    <div className="h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Playground</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          {templates && (
            <TemplateFileSelector
              templates={templates}
              handleTemplateChange={handleTemplateChange}
            />
          )}
          <Button size="sm">Save</Button>
          <TemplateActions />
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="preview" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className=" flex-col space-y-4 sm:flex md:order-2">
              <div className="grid gap-2">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Editor
                </span>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    onClick={() => setisFullScreen(!isFullScreen)}
                  >
                    <span className="">Toggle layout</span>
                    <EyeOffIcon
                      className="w-4 h-4 hover:text-black/90 text-muted-foreground "
                      size={18}
                    />
                  </Button>
                </div>
              </div>
              <ModeSelector
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                selectedTemplate={selectedTemplate}
              />
            </div>
            <div className="md:order-1">
              <TabsContent value="preview" className="mt-0 border-0 p-0">
                <div
                  className={`grid h-full gap-3 grid-rows-2 lg:grid-rows-1 ${
                    isFullScreen ? "lg:grid-cols-1" : "lg:grid-cols-2"
                  }`}
                >
                  <div className="min-h-[300px]  relative group  md:h-[500px]">
                    <div className="flex-1 overflow-auto h-full scrollbar-hide">
                      <CodeEditor
                        value={editorValue}
                        lineNumbers={selectedMode === "Text" ? false : true}
                        language={
                          selectedMode === "Text" ? "text" : "javascript"
                        }
                        onChange={(e) => setEditorValue(e)}
                        placeholder="Enter your email template content here..."
                      />
                    </div>
                    <div className="absolute right-0 top-0 p-2 hidden items-center gap-x-2 group-hover:flex">
                      <WrapText
                        className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                        size={18}
                      />
                      <Play
                        className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                        size={18}
                      />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "relative rounded-md border group bg-muted min-h-[300px] md:h-[500px] p-px",
                      isFullScreen && "hidden"
                    )}
                  >
                    {srcUrl && (
                      <iframe
                        src={srcUrl}
                        title="Email Preview"
                        className="h-full w-full"
                        sandbox="allow-same-origin"
                      ></iframe>
                    )}

                    <div className="absolute right-0 top-0 p-2 hidden items-center gap-x-2 group-hover:flex">
                      <ExternalLink
                        className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
        <WebContainerStatus isLoaded={isLoaded} status={status} error={error} />
      </Tabs>
    </div>
  );
}

type Props = {
  isLoaded: boolean;
  status: "idle" | "installing" | "success" | "error";
  error?: string | null;
};

const WebContainerStatus: React.FC<Props> = ({ isLoaded, status, error }) => {
  if (!isLoaded) {
    return (
      <p className="text-sm flex items-center pl-2 h-5 pb-2">
        <Loader className="size-4 mr-2 animate-spin" /> Loading WebContainer...
      </p>
    );
  }

  switch (status) {
    case "idle":
      return (
        <p className="text-sm flex items-center pl-2 h-5 pb-2">
          <Hourglass className="size-4 mr-2" />
          Ready. Waiting to install dependencies..
        </p>
      );

    case "installing":
      return (
        <p className="text-sm flex items-center pl-2 h-5 pb-2">
          <Loader className="size-4 mr-2 animate-spin" /> Installing
          dependencies...
        </p>
      );
    case "success":
      return (
        <p className="text-sm flex items-center pl-2 h-5 pb-2">
          <CheckCheck className="size-4 mr-2 text-green-700" /> Dependencies
          installed successfully!
        </p>
      );

    case "error":
      return (
        <p className="text-sm flex items-center pl-2 h-5 pb-2">
          <X className="size-4 mr-2 text-red-700" /> Failed to install
          dependencies:{" "}
          <span className="text-red-700 ml-2">{error ?? "Unknown error"}</span>
        </p>
      );

    default:
      return null;
  }
};
