import { Loader } from 'lucide-react'
import { ParticipantsSkeleton } from './participants'
import { ToolbarSkeleton } from './toolbar'
import { InfoSkeleton } from './info'


const Loading = () => {
    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
            <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
            <InfoSkeleton />
            <ParticipantsSkeleton />
            <ToolbarSkeleton />
        </main>
    )
}

export default Loading