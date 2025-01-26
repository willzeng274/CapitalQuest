// Frog is a real estate agent

import { Html } from "@react-three/drei";
import type { Dialog } from "../utils/store";
import { useDialogStore } from "../utils/store";
import Bob from "../models/Bob";

export default function BobCharacter({
    position,
    rotation,
    dialog,
}: {
    position: [number, number, number],
    rotation: [number, number, number],
    dialog: Dialog,
}) {
    const { setDialog } = useDialogStore()
    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <group
            position={position}
            rotation={rotation}
            onClick={() => setDialog(dialog)}
        >
            <Html
                position={[0, 1.5, 0]}
                center
                scale={0.05}
            >
                <div className="relative select-none">
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-xl relative text-center border-2 border-gray-200">
                        <div className="text-2xl font-black text-red-500 animate-bounce">!</div>

                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 
                            border-l-[10px] border-l-transparent
                            border-t-[12px] border-t-white 
                            border-r-[10px] border-r-transparent
                            after:absolute after:top-[-14px] after:left-[-10px]
                            after:border-l-[10px] after:border-l-transparent
                            after:border-t-[12px] after:border-t-gray-200
                            after:border-r-[10px] after:border-r-transparent">
                        </div>
                    </div>
                </div>
            </Html>
            <Bob />
        </group>
    )
}