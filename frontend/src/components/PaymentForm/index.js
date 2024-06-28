import * as React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Card as MuiCard } from '@mui/material';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PixIcon from '@mui/icons-material/Pix';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import PixArea from '../PixArea';
import BilletArea from '../BilletArea';



const Card = styled(MuiCard)(({ theme, selected }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  '&:hover': {
    background:
      theme.palette.mode === 'light'
        ? 'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)'
        : 'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
    borderColor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0px 2px 8px hsla(0, 0%, 0%, 0.1)'
        : '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  [theme.breakpoints.up('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '30%',
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
    borderColor:
      theme.palette.mode === 'light'
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
  }),
}));

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  width: '100%',
  height: 340,
  padding: theme.spacing(3),
  borderRadius: '20px',
  border: '1px solid ',
  borderColor: theme.palette.divider,
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.3) 25%, hsla(210, 100%, 90%, 0.3) 100%)'
      : 'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm({
  paymentType, setPaymentType,
  cardNumber, setCardNumber,
  cvv, setCvv,
  expirationDate, setExpirationDate,
  cardName, setCardName
}) {


  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center' },
            gap: 2,
          }}
        >
          <Card selected={paymentType === 'creditCard'}>
            <CardActionArea
              onClick={() => setPaymentType('creditCard')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon
                  fontSize="small"
                  sx={(theme) => ({
                    color: theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
                    ...(paymentType === 'creditCard' && {
                      color: 'primary.main',
                    }),
                  })}
                />
                <Typography fontWeight="medium">Cartão</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === 'bankTransfer'}>
            <CardActionArea
              onClick={() => setPaymentType('bankTransfer')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PixIcon
                  fontSize="small"
                  sx={(theme) => ({
                    color: theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
                    ...(paymentType === 'bankTransfer' && {
                      color: 'primary.main',
                    }),
                  })}
                />
                <Typography fontWeight="medium">Pix</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === 'boletoTransfer'}>
            <CardActionArea
              onClick={() => setPaymentType('boletoTransfer')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon
                  fontSize="small"
                  sx={(theme) => ({
                    color: theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
                    ...(paymentType === 'bankTransfer' && {
                      color: 'primary.main',
                    }),
                  })}
                />
                <Typography fontWeight="medium">Boleto</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'boletoTransfer' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            margin: '0 auto',
          }}
        >
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Clique em finalizar compra para gerar o boleto
          </Alert>
        </Box>
      )}
      {paymentType === 'creditCard' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <PaymentContainer>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Cartão de Crédito</Typography>
              <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                  Número do Cartão
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  autoComplete="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: '20%' }}>
                <FormLabel htmlFor="cvv" required>
                  CVV
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  autoComplete="CVV"
                  placeholder="123"
                  required
                  value={cvv}
                  onChange={handleCvvChange}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                  Nome
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  autoComplete="card-name"
                  required
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                  Data de Expiração
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  autoComplete="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={expirationDate}
                  onChange={handleExpirationDateChange}
                />
              </FormGrid>
            </Box>
          </PaymentContainer>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Lembrar dados do cartão para próximas compras"
          />
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <PixArea ></PixArea>
      )}
      {/* {paymentType === 'boletoTransfer' && (
         <BilletArea />
      )} */}
    </Stack>
  );
}
