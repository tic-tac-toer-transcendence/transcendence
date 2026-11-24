import {
  ReactNode,
  useEffect
} from "react";
import { connect, disconnect } from "./gameStore";

interface GameSocketProviderProps {
  url: string;
  children: ReactNode;
}

export default function GameSocketProvider({ url, children }: GameSocketProviderProps) {

  useEffect(() => {
    connect(url);

    return (() => {
      disconnect()
    })

  }, [url])

  return (
    <>
      {children}
    </>
  );
}
