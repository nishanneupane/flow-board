"use client"
import { useRenameModal } from '@/store/use-rename-modal'
import React, { FormEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { toast } from 'sonner'

const RenameModal = () => {
    const { mutate, pending } = useApiMutation(api.board.update)
    const { initialValues, isOpen, onClose } = useRenameModal()
    const [title, setTitle] = useState(initialValues.title)

    useEffect(() => {
        setTitle(initialValues.title)
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutate({
            id: initialValues.id,
            title
        }).then(() => {
            toast.success("FBoard renamed")
            onClose()
        })
            .catch(() => toast.error("Failed to rename FBoard"))
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit FBoard title
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter a new title for this FBoard
                </DialogDescription>

                <form onSubmit={onSubmit} className='space-y-4'>
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Board title'
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant={"outline"}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default RenameModal