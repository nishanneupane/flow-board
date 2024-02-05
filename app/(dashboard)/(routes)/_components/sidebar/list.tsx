"use client"
import { useOrganizationList } from '@clerk/nextjs'
import React from 'react'
import Item from './item'

const List = () => {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })
    if (!userMemberships.data?.length) return null;
    return (
        <div className='space-y-4'>
            {
                userMemberships.data?.map((membership) => (
                    <Item
                        key={membership.organization.id}
                        id={membership.organization.id}
                        name={membership.organization.name}
                        imageUrl={membership.organization.imageUrl}
                    />
                ))
            }
        </div>
    )
}

export default List