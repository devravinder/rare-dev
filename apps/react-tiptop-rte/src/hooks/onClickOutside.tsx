import { useEffect } from "react";

export const useOnClickOutside = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: () => void,
    listener: "click" | "mousedown" = "click",
) => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!ref.current?.contains(event.target as Node)) {
                handler();
            }
        }
        document.addEventListener(listener, handleClickOutside);
        return () => {
            document.removeEventListener(listener, handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);
    return ref;
};