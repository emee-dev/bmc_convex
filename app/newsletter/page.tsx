"use client";

import { CodeEditor } from "@/components/editor";
import { SendNewsletterDialog } from "@/components/send-newsletter-dialog";
import { TooltipMsg } from "@/components/tooltip-msg";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useClipboard } from "@/hooks/use-clipboard";
import { useDebouncedFileUpdate } from "@/hooks/use-debounced-file-update";
import { useInstallDependencies } from "@/hooks/use-install-dependencies";
import { useRenderScript } from "@/hooks/use-render-script";
import { useVariableActions } from "@/hooks/use-vars";
import { useWebContainer } from "@/hooks/use-webcontainer";
import { cn } from "@/lib/utils";
import { initialFiles } from "@/lib/webcontainer";
import { EditorView } from "@codemirror/view";
import { WebContainer } from "@webcontainer/api";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useAction,
} from "convex/react";
import {
  CheckCheck,
  Copy,
  Expand,
  Hourglass,
  Loader,
  Loader2,
  Minimize,
  Play,
  User,
  WrapText,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { pandaChangelog } from "./data";

export default function TemplateEditor() {
  const sendNewsletter = useAction(api.node_email.sendNewsletterEmail);

  const [editorValue, setEditorValue] = useState(pandaChangelog);
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [lineWrap, setLineWrap] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const editor = useRef<EditorView | null>(null);
  const {
    data,
    error: scriptError,
    isPending,
    runNewsletter,
  } = useRenderScript("newsletter.tsx");
  const { installDeps, error, status } = useInstallDependencies();
  const { init } = useVariableActions();
  const { updateNewsletterFile } = useDebouncedFileUpdate();
  const { copy } = useClipboard();

  const handleTimeout = () => {
    console.warn("WebContainer not ready after timeout.");
  };

  const { isLoaded, webContainerRef, setWebContainerRef } = useWebContainer(
    30000,
    handleTimeout
  );

  const onNewsletterSend = async () => {
    sendNewsletter({
      description: "",
      html: "",
      jsx: "",
      subject: "",
      title: "",
    });
  };

  // Initalize webcontainer & variables
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

  // Install dependencies
  useEffect(() => {
    if (webContainerRef) {
      installDeps(webContainerRef);
    }
  }, [webContainerRef]);

  // Update filesystem when editorValue changes
  useEffect(() => {
    const instance = webContainerRef;

    if (!instance || !editorValue) return;

    updateNewsletterFile("newsletter.tsx", editorValue, instance);
  }, [editorValue, webContainerRef]);

  // Render the HTML to iframe
  useEffect(() => {
    if (!data || !data.html_content) return;

    const blob = new Blob([data.html_content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setSrcUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [data]);

  return (
    <div className="h-full flex-col md:flex">
      <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Editor</h2>
        <Authenticated>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            {data && data.html_content && editorValue && (
              <SendNewsletterDialog
                html={data?.html_content}
                jsx={editorValue}
              />
            )}
          </div>
        </Authenticated>
      </div>
      <Separator />
      <Tabs defaultValue="source" className="flex-1">
        <div className="container h-full py-6">
          <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
            <div className=" flex-col space-y-4 sm:flex md:order-2"></div>
            <div className="md:order-1">
              <Authenticated>
                <TabsContent value="source" className="mt-0 border-0 p-0">
                  <div
                    className={`grid h-full gap-3 grid-rows-2 lg:grid-rows-1 ${
                      isFullScreen ? "lg:grid-cols-1" : "lg:grid-cols-2"
                    }`}
                  >
                    <div
                      className="min-h-[300px] rounded-md border relative group  md:h-[500px]"
                      onClick={() => editor.current?.focus()}
                    >
                      <div className="flex-1 overflow-auto h-full scrollbar-hide pt-3">
                        <CodeEditor
                          ref={editor}
                          value={editorValue}
                          lineNumbers={true}
                          language="javascript"
                          lineWrap={lineWrap}
                          vars={[]}
                          onChange={(e) => setEditorValue(e)}
                          placeholder="Compose your newsletter JSX content here."
                        />
                      </div>

                      {isPending && (
                        <div className="absolute right-0 top-0 p-2 items-center gap-x-2 flex">
                          <Loader
                            className="w-4 h-4 animate-spin text-black/90 "
                            size={18}
                          />
                        </div>
                      )}

                      {!isPending && (
                        <div className="absolute right-0 top-0 p-2 hidden items-center gap-x-2 group-hover:flex">
                          {!isFullScreen && (
                            <TooltipMsg message="Expand editor">
                              <Expand
                                className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                                size={18}
                                onClick={() => setIsFullScreen(!isFullScreen)}
                              />
                            </TooltipMsg>
                          )}

                          {isFullScreen && (
                            <TooltipMsg message="Minimize editor">
                              <Minimize
                                className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                                size={18}
                                onClick={() => setIsFullScreen(!isFullScreen)}
                              />
                            </TooltipMsg>
                          )}

                          <TooltipMsg message="Wrap text">
                            <WrapText
                              className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                              size={18}
                              onClick={() => setLineWrap(!lineWrap)}
                            />
                          </TooltipMsg>

                          <TooltipMsg message="Compile email">
                            <Play
                              className={cn(
                                "w-4 h-4 text-muted-foreground hover:text-black/90"
                              )}
                              size={18}
                              onClick={async () => {
                                const instance = webContainerRef;
                                const template = editorValue;

                                if (!instance) return;
                                if (!template) return;

                                runNewsletter(instance);
                              }}
                            />
                          </TooltipMsg>
                        </div>
                      )}
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
                          title="Email source"
                          className="h-full w-full"
                          sandbox="allow-same-origin"
                        ></iframe>
                      )}

                      <div className="absolute right-0 top-0 p-2 hidden items-center gap-x-2 group-hover:flex">
                        {data && (
                          <TooltipMsg message="Copy source">
                            <Copy
                              className="w-4 h-4 hover:text-black/90 text-muted-foreground"
                              size={18}
                              onClick={() => {
                                if (!data || !data.preview_content) return;
                                copy(data.preview_content);
                              }}
                            />
                          </TooltipMsg>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Authenticated>

              <Unauthenticated>
                <div className="mt-0 border-0 p-0">
                  <div className="grid h-full gap-3 grid-rows-2 lg:grid-rows-1">
                    <div className="flex flex-col min-h-[500px] items-center justify-center text-center text-muted-foreground space-y-2 py-10">
                      <User className="h-6 w-6 text-gray-400" />
                      <p>Please signin to continue.</p>
                      <Link href="/dashboard">
                        <Button>Dashboard</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Unauthenticated>
              <AuthLoading>
                <div className="mt-0 border-0 p-0">
                  <div className="grid h-full gap-3 grid-rows-2 lg:grid-rows-1">
                    <div className="flex flex-col items-center min-h-[500px] justify-center py-10 text-muted-foreground">
                      <Loader2 className="h-6 w-6 animate-spin mb-2" />
                      <p>Loading editor...</p>
                    </div>
                  </div>
                </div>
              </AuthLoading>
            </div>
          </div>
        </div>
        <Authenticated>
          <WebContainerStatus
            isLoaded={isLoaded}
            status={status}
            error={error}
          />
        </Authenticated>
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
