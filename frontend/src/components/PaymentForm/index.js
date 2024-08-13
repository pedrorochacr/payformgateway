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
import InputMask from 'react-input-mask';
import PixArea from '../PixArea';
import BilletArea from '../BilletArea';
import { Autocomplete, TextField } from '@mui/material';
import useApi from '../../services/api';
import { useState } from 'react';
import { InputAdornment, Button, SimCardRoundedIcon } from '@mui/material';

<link rel="stylesheet" href="https://path-to-cera-pro-font" />


const logos = {
  visa: require('../../image/visa.png'),
  mastercard: require('../../image/mastercard.png'),
  amex: require('../../image/amex.png'),
  discover: require('../../image/discover.png'),
  elo: require('../../image/elo.png'),
  hipercard: require('../../image/hipercard.png'),
  card: require('../../image/card.png')
};

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
//console.log()

export default function PaymentForm({
  paymentType, setPaymentType,
  cardNumber, setCardNumber,
  cvv, setCvv,
  expirationDate, setExpirationDate,
  cardName, setCardName,
  installmentNumber, setInstallmentNumber,
  value,
  rememberCard,
  setRememberCard,
  cardReturned,
  transactionCardId,
  setTransactionCardId
}) {
  const api = useApi();
  const [cpf, setCpf] = useState(null);
  const [cep, setCep] = useState(null);
  const [cellNumber, setCellNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [cardBrand, setCardBrand] = useState('');
  const [inputCard, setInputCard] = useState(false);
  const iconCVV = require('../../image/cvv.png');
  value = value ? parseFloat(value.replace("R$ ", "").replace(",", ".")) : 0;
  const parcelas = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleCellNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d{1,2})/, '$1$2');

    if (value.length <= 11) {
      setCellNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      setEmail(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  const handleInstallmentNumberChange = (value) => {
    setInstallmentNumber(value);
  };

  const handleCardNumberChangeFlag = (event) => {
    const number = event.target.value.replace(/\s+/g, '').trim();
    console.log(number)
    setCardNumber(number);

    if (number.length >= 6) {
      const brand = getCardBrand(number);
      setCardBrand(brand);
    } else {
      setCardBrand('');
    }
  };

  const getCardBrand = (number) => {
    const regexes = {
      visa: /^4[0-9]{15}$/,
      mastercard: /^5[1-5][0-9]{14}$|^2[2-7][0-9]{14}$/, amex: /^3[47][0-9]{13}$/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      amex: /^3[47][0-9]{13}$/,
      elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
      hipercard: /^606282|^3841(?:[0|4|6]{1})0/,
    };

    for (let brand in regexes) {
      if (regexes[brand].test(number)) {
        return brand;
      }
    }

    return 'unknown';
  };

  const handleCEPChange = (event) => {
    let cep = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (cep.length > 5) {
      cep = cep.replace(/^(\d{5})(\d{1,3}).*/, '$1-$2');
    }
    setCep(cep);
  };

  const handleCPFChange = (event) => {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (cpf.length > 9) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{1,2}).*/, '$1.$2.$3-$4');
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/^(\d{3})(\d{3})(\d{1,3}).*/, '$1.$2.$3');
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/^(\d{3})(\d{1,3}).*/, '$1.$2');
    }
    setCpf(cpf);
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Dados do titular do cartão</Typography>
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
              <FormLabel required sx={{ color: "#2E2E2E", fontFamily: 'CeraPro' }}>
                Confirme o CPF/CNPJ
              </FormLabel>
              <OutlinedInput
                id="cpf"
                autoComplete="cpf"
                placeholder="Digite seu CPF/CNPJ aqui"
                required
                value={cpf}
                onChange={handleCPFChange}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="cep" required sx={{ color: "#2E2E2E", fontFamily: 'CeraPro' }}>
                CEP
              </FormLabel>
              <OutlinedInput
                id="CEP"
                autoComplete="CEP"
                placeholder="00000-00"
                required
                value={cep}
                onChange={handleCEPChange}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </FormGrid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }} >
              <FormLabel htmlFor="cell-number" required sx={{ color: "#2E2E2E", fontFamily: 'CeraPro' }}>
                Celular
              </FormLabel>
              <OutlinedInput
                id="cell-number"
                autoComplete="cell-number"
                placeholder="(00) 00000-0000"
                required
                value={cellNumber}
                onChange={handleCellNumberChange}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="email" required sx={{ color: "#2E2E2E", fontFamily: 'CeraPro' }}>
                E-mail
              </FormLabel>
              <OutlinedInput
                id="email"
                autoComplete="email"
                placeholder="usuario@teste.com"
                required
                value={email}
                onChange={handleEmailChange}
                sx={{ backgroundColor: '#f5f5f5' }}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Cartão de Crédito</Typography>
            <CreditCardRoundedIcon sx={{ fontSize: '2rem', color: 'text.secondary' }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 1 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel required sx={{ color: '#2E2E2E', fontFamily: 'CeraPro' }}>
                  Número de Parcelas
                </FormLabel>
                <Autocomplete
                  options={parcelas}
                  getOptionLabel={(option) => `${option}x sem juros R$${(value / option).toFixed(2)}`}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option}x sem juros R${(value / option).toFixed(2)}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder={`10x sem juros R$${(value / 10).toFixed(2)}`}
                      required
                      fullWidth
                    />
                  )}
                  value={installmentNumber}
                  onChange={(event, value) => handleInstallmentNumberChange(value)}
                  sx={{ backgroundColor: '#e8f0fe' }}
                />
              </FormGrid>
            </Box>
            {cardReturned && (
              <Button
                variant="outlined"
                onClick={() => {
                  setTransactionCardId(cardReturned.id);
                  setInputCard(false);
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  margin: '1rem 0',
                  padding: '1rem',
                  width: '100%',
                  backgroundColor: transactionCardId ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <span>{`${cardReturned.card_brand} **** ${cardReturned.last4_digits}`}</span>
                <img src={logos[cardReturned?.card_brand?.toLowerCase()]} alt={`${cardReturned.card_brand} icon`} style={{ width: '3rem' }} />
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                setTransactionCardId(null);
                setInputCard(true);
              }}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '1rem 0',
                padding: '1rem',
                width: '100%',
                backgroundColor: inputCard ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <span>Novo cartão de crédito</span>
              <img src={logos["card"]} alt="New card icon" style={{ width: '2.0rem' }} />
            </Button>
            {inputCard && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                  <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="card-number" required sx={{ color: '#2E2E2E', fontFamily: 'CeraPro' }}>
                      Número do Cartão
                    </FormLabel>
                    <InputMask
            mask="9999 9999 9999 9999"
            value={cardNumber}
            onChange={handleCardNumberChangeFlag}
        >
            {(inputProps) => (
                     <OutlinedInput
                     id="card-number"
                     autoComplete="card-number"
                     placeholder="0000 0000 0000 0000"
                     required

                     sx={{ backgroundColor: '#f5f5f5' }}
                     endAdornment={
                       cardBrand && cardBrand !== 'unknown' && (
                         <InputAdornment position="end">
                           <img src={logos[cardBrand]} alt={`${cardBrand} logo`} style={{ width: '3rem' }} />
                         </InputAdornment>
                       )
                     }
                   />
            )}
        </InputMask>

                  </FormGrid>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormGrid sx={{ maxWidth: '40%' }}>
                    <FormLabel htmlFor="cvv" required sx={{ color: '#2E2E2E', fontFamily: 'CeraPro' }}>
                      CVV
                    </FormLabel>
                    <OutlinedInput
                      id="cvv"
                      autoComplete="CVV"
                      placeholder="123"
                      required
                      value={cvv}
                      onChange={handleCvvChange}
                      sx={{ backgroundColor: '#f5f5f5' }}
                      endAdornment={
                        <InputAdornment position="end">
                          <img src={iconCVV} alt="CVV icon" style={{ width: '2rem' }} />
                        </InputAdornment>
                      }
                    />
                  </FormGrid>
                  <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="card-expiration" required sx={{ color: '#2E2E2E', fontFamily: 'CeraPro' }}>
                      Data de Expiração
                    </FormLabel>
                    <OutlinedInput
                      id="card-expiration"
                      autoComplete="card-expiration"
                      placeholder="MM/YY"
                      required
                      value={expirationDate}
                      sx={{ backgroundColor: '#f5f5f5' }}
                      onChange={handleExpirationDateChange}
                    />
                  </FormGrid>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormGrid sx={{ flexGrow: 1 }}>
                    <FormLabel htmlFor="card-name" required sx={{ color: '#2E2E2E', fontFamily: 'CeraPro' }}>
                      Nome impresso no cartão
                    </FormLabel>
                    <OutlinedInput
                      id="card-name"
                      autoComplete="card-name"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      sx={{ backgroundColor: '#f5f5f5' }}
                    />
                  </FormGrid>
                </Box>
                <FormControlLabel
                  control={<Checkbox name="saveCard" />}
                  label="Lembrar dados do cartão para próximas compras"
                  onClick={() => setRememberCard(true)}
                />
              </>
            )}
          </Box>
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <PixArea ></PixArea>
      )}
    </Stack>
  );
}
