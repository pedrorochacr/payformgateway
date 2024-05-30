import { Button, Stack, Typography } from "@mui/material";

export default function FinishedBuy() {




    return (
        <Stack spacing={2} useFlexGap>
            <Typography variant="h1">📦</Typography>
            <Typography variant="h5">Obrigado pela sua compra!</Typography>
            <Typography variant="body1" color="text.secondary">
                Seu número de compra é 
                <strong>&nbsp;#140396</strong>. Você será redirecionado para o website do produto
                em instantes.
            </Typography>
        
        </Stack>
    );
}