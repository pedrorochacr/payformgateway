import { Stack, Typography, CircularProgress } from "@mui/material";

export default function WaitingPayment({ requestNumber }) {
    return (
        <Stack 
            justifyContent="center" 
            alignItems="center" 
            container 
            spacing={2} 
            sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
            <CircularProgress color="primary" size={80} />
            <Typography textAlign="center"  variant="h4" color="primary">
                Aguardando Confirmação de Pagamento
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
                Estamos processando seu pagamento. Isso pode levar alguns minutos.
                <br />
                Seu número de pedido é 
                <strong> {requestNumber}</strong>.
            </Typography>
        </Stack>
    );
}