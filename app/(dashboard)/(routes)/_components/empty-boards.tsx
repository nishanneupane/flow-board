"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const EmptyBoards = () => {
    const { organization } = useOrganization()
    const { mutate, pending } = useApiMutation(api.board.create)
    const router = useRouter()
    const onClick = () => {
        if (!organization) return;
        mutate({
            orgId: organization?.id,
            title: "Untitled"
        }).then((id) => {
            toast.success("FBoard Created")
            router.push(`/board/${id}`)
        }).catch(() => toast.error("Failed to create the FBoard."))
    }
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <Image
                src={"/note.svg"}
                height={110}
                width={110}
                alt='Empty'
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create your first board
            </h2>
            <p className='text-muted-foreground text-sm mt-2'>Start by creating a FBoard for your organization</p>
            <div className="mt-6">
                <Button onClick={onClick} disabled={pending} size={"lg"}>
                    Create FBoard
                </Button>
            </div>
        </div>
    )
}

export default EmptyBoards