import { Input } from '@/components/ui/input'
import React from 'react'

const FontSizePicker = ({ onChange }: { onChange: (font: any) => void }) => {
    return (
        <Input
            onChange={onChange}
            placeholder='10'
            className='w-12 h-8'
        />
    )
}

export default FontSizePicker