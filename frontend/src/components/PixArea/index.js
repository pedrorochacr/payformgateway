import { Alert, Box, Typography } from "@mui/material";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import QrCode from "./QrCode";





export default function PixArea() {


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Alert severity="warning" icon={<WarningRoundedIcon />}>
                Clique em finalizar compra para obter o QrCode e realizar o pagamento instantâneo
            </Alert>
         
        </Box>)
}