import { Alert, Box, Typography } from "@mui/material";
import React from 'react';

import QRCode from 'qrcode.react';


export default function QrCode() {

    const qrValue = 'https://example.com';
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <QRCode value={qrValue} size={255}></QRCode>
        </Box>
        
    )
}