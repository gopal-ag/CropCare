import { useEffect, useState } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import useBreakpoint from "../utils/useBreakpoint";
import { isInstalled } from "../utils/Utils";
export default function InstallPopup() {
  const [modalShown, setModalShown] = useSessionStorage("appModal", false);
  const { isMobile } = useBreakpoint();

  // const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  // const media = window.matchMedia("(display-mode: standalone)").matches;

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      // setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  useEffect(() => {
    // if (!media) {
    window.addEventListener("appinstalled", () => {
      // Hide the app-provided install promotion
      setModalShown(true);
      console.log("PWA was installed");
    });
    // }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      let element = document.getElementById("install-popup");
      element.classList.remove("hide-popup");
    }, 1000);
  }, []);

  const onClick = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <>
      {!modalShown ? (
        <>
          <div
            id="install-popup"
            className="hide-popup justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Install {isMobile ? "Application" : "Software"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalShown(true)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Install Agrotrust Farm DB on Your{" "}
                    {isMobile ? "Mobile" : "Desktop"}
                  </p>
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setModalShown(true)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={(evt) => {
                      setModalShown(true);
                      onClick(evt);
                    }}
                  >
                    Install {isMobile ? "App" : ""}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
