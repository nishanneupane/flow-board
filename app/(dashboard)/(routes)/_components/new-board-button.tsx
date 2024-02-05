"use client"
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const NewBoardButton = ({ orgId, disabled }: { orgId: string, disabled?: boolean }) => {
    const { mutate, pending } = useApiMutation(api.board.create)
    const router = useRouter()
    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        }).then((id) => {
            toast.success("FBoard Created")
            router.push(`/board/${id}`)
        }).catch(() => toast.error("Failed to create FBoard"))
    }
    return (
        <button
            disabled={disabled || pending}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (disabled || pending) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
            )}
        >
            <div />
            <Plus className='h-12 w-12 text-white stroke-1 ' />
            <p className="text-sm text-white font-light">
                New FBoard
            </p>
        </button>
    )
}

export default NewBoardButton