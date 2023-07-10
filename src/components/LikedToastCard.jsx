import { Avatar, Card, CardHeader } from '@mui/material'
import React from 'react'

export default function LikedToastCard({ item, index }) {
    
    // Function returns the first letters of the firstname and lastname
    const stringAvatar = (name) => {
        return {
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Card
            key={index}
            sx={{ width: '100%', backgroundColor: "#999" }}>
            <CardHeader
                avatar={
                    <Avatar {...stringAvatar(`${item?.firstName} ${item?.lastName}`)} />
                }
                title={`${item?.firstName} ${item?.lastName}`}
                subheader={item?.email}
            />
        </Card>
    )
}
