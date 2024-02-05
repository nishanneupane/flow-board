"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas"
import { memo, useState } from "react";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import FontSizePicker from "./font-size-picker";

interface SelectionToolsProps {
    camera: Camera;
    setLastUsedColor: (color: Color) => void;
}
export const SelectionTools = memo(({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection)
    const [font, setFont] = useState(0)

    const moveToBack = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i)
        }
    }, [selection])
    const moveToFront = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds")
        const indices: number[] = []

        const arr = liveLayerIds.toImmutable()

        for (let i = 0; i < arr.length; i++) {
            if (selection.includes(arr[i])) {
                indices.push(i)
            }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
            liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
        }
    }, [selection])
    const setFill = useMutation(({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers")
        setLastUsedColor(fill)
        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill)
        })
    }, [
        selection,
        setLastUsedColor
    ])

    // const setFontSize=useMutation(({storage},size)=>{
    //     const liveLayers = storage.get("layers")
    //     setFont(size)
    //     selection.forEach((id) => {
    //         liveLayers.get(id)?.set("value", size)
    //     })
    // },[selection,
    //     setLastUsedColor])

    const deleteLayers = useDeleteLayers()
    const selectionBounds = useSelectionBounds()
    if (!selectionBounds) {
        return null
    }
    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y


    return (
        <div
            className="absolute p-3 rounded-xl bg-white dark:bg-black shadow-sm border select-none flex"
            style={{
                transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`
            }}
        >
            <ColorPicker
                onChange={setFill}
            />

            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front">
                    <Button
                        variant="board"
                        size={"icon"}
                        onClick={moveToFront}
                    >
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="Send to back">
                    <Button
                        variant="board"
                        size={"icon"}
                        onClick={moveToBack}
                    >
                        <SendToBack />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center space-y-2 flex-col">
                {/* <FontSizePicker onChange={setFontSize} /> */}
                <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                    <Hint label="Delete">
                        <Button
                            variant={"board"}
                            size={"icon"}
                            onClick={deleteLayers}
                        >
                            <Trash2 />
                        </Button>
                    </Hint>
                </div>

            </div>
        </div>
    )
})
SelectionTools.displayName = "SelectionTools"