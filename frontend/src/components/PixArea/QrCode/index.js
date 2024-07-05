import React from 'react';
import { Box, Typography, Button, Divider, Grid, Tooltip  } from '@mui/material';
import QRCode from 'qrcode-generator';

export default function QrCode({codePix, value}) {
    const pixCode = codePix;
    const qrValue = generatePixQRCode(pixCode);

    const handleCopyCode = () => {
        navigator.clipboard.writeText(pixCode);
        alert('Código copiado!');
    };

    function generatePixQRCode(pixText) {
        const qr = QRCode(0, 'M');
        qr.addData(pixText);
        qr.make();
    

        return qr.createDataURL();
    }


    return (
        <Box sx={{ bgcolor: 'white', maxWidth: '600px', margin: 'auto', padding: 2, marginTop: -6,  borderRadius: 2 }}>
            <Grid container spacing={2} sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Grid item xs={12} >
                    <Typography variant="h4" gutterBottom sx={{ color: '#333', fontWeight: 'bold' }}>
                        Pague via Pix para concluir sua compra
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
                        Para pagar no seu banco pela internet, escaneie o QR Code ou copie o código numérico no aplicativo do banco.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, backgroundColor: '#fff', borderRadius: '8px', p: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Box>
                            <Typography variant="body1" sx={{ color: '#555' }}>Valor</Typography>
                            <Typography variant="body1" sx={{ color: '#000', fontWeight: 'bold' }}>{value}</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: '450' }}>
                        Escaneie este código QR para pagar
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: -4 }}>
                    <ul style={{ listStyleType: 'numeric', paddingLeft: 16 }}>
                        <li>Acesse o seu banco ou aplicativo de pagamentos</li>
                        <li>Escolha pagar via Pix</li>
                        <li>Escaneie o seguinte código de pagamento:</li>
                    </ul>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <img src={qrValue} alt="QR Code do Pix"/>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: '450' }}>
                        Ou pague com Pix Copia e Cola
                    </Typography>
                    <Typography variant="body1">
                        Acesse o seu banco ou aplicativo de pagamento e escolha pagar via Pix. Em seguida, cole o seguinte código de pagamento:
                    </Typography>
                    <Box sx={{ marginTop: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, backgroundColor: '#fff', borderRadius: '8px', p: 2, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                            <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                                {pixCode}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="contained" id="mp-copy-code-button" onClick={handleCopyCode}>
                            Copiar código
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
