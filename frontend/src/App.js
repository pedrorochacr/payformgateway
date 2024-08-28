import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import WaitingPayment from './components/WaitingPayment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import payformLogo from './assets/payformLogo.png';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import PaymentForm from './components/PaymentForm';
import FinishedBuy from './components/FinishedBuy';
import useApi from './services/api';
import QrCode from './components/PixArea/QrCode';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactLoading from 'react-loading';
import axios from 'axios';
import './Loading.css';

const steps = ['Dados de Pagamento', 'Compra Finalizada'];

export default function App() {
  const [paymentType, setPaymentType] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cardName, setCardName] = useState('');
  const [mode, setMode] = useState('light');
  const api = useApi();
  const { createPixTransaction } = useApi();
  const { createCreditTransaction } = useApi();
  const { createBoletoTransaction } = useApi();
  const [pix, setPix] = useState("");
  const location = useLocation();
  const [waitingPayment, setWaitingPayment] = useState(false);
  const getIdFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('id');
  };

  const id = useState(getIdFromUrl());

  const defaultTheme = createTheme({
    palette: {
      mode,
      primary: { main: "#4B2273" },
    },
    typography: {
      fontFamily: [
        'Jost',
      ].join(','),
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState(null);
  const [costumerName, setCostumerName] = useState('');
  const [orderId, setOrderId] = useState('');
  const [costumerId, setCostumerId] = useState('');
  const [installmentNumber, setInstallmentNumber] = useState(null);
  const [rememberCard, setRememberCard] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cardReturned, setCardReturned] = useState([]);
  const [transactionCardId, setTransactionCardId] = useState(null);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await api.findData(id[0]);
  
        if (response) {
          setAmount(response.amount);
          const convertToReais = (valueInCents) => {
            return (valueInCents / 100).toFixed(2).replace('.', ',');
          };
          const formattedValue = `R$ ${convertToReais(response.amount)}`;
          setValue(formattedValue);
          setOrderId(response.orderId);
          setCostumerName(response.costumer.first_name);
          setCostumerId(response.costumer.customerZoopId);
          setCardReturned(response.card);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    };
    if (!dataLoaded) {
      handleData();
    }
  }, [id, dataLoaded]);


  useEffect(() => {
    const ws = new WebSocket('wss://gatewayapi.payform.com.br');

    ws.onmessage = function(event) {
      const message = JSON.parse(event.data);
      if (message.type === 'transactionUpdate') {
        const {transactionId} = message.data;
        if(transactionId == id[0]){
            setActiveStep(1);
        }
        // Atualize a tela de acordo com os dados recebidos
        console.log('Atualização da transação recebida:', message.data);
        // Implementar lógica para atualizar a tela
      }
    };

    // Limpar conexão WebSocket ao desmontar o componente
    return () => {
      ws.close();
    };
  }, []);

  const handleNext = async () => {
    const transactionId = id[0];
    const data ={
        value:amount,
        transactionId
    }

    if (paymentType === 'bankTransfer') {
      const pixTransaction = await createPixTransaction(data);
      setPix(pixTransaction?.pixTransaction?.qrCode);
    } else if (paymentType === 'creditCard') {
      // setWaitingPayment(true);
      // console.log(cardNumber)
      const creditTransaction = await createCreditTransaction(amount, cardNumber, cvv, cardName, expirationDate, orderId, installmentNumber, rememberCard, costumerId, transactionCardId,transactionId);
      window.location.href = "https://e-birds.com.br/";
      if (creditTransaction?.creditTransaction?.status == "succeeded") {
        // setActiveStep(1);
        
      } else {
        console.error('Erro ao processar a compra:');
      }
      setWaitingPayment(false);
    } else if (paymentType === 'boletoTransfer') {
      const boletoTransaction = await createBoletoTransaction(amount, costumerId,transactionId);
      if (boletoTransaction) {
        window.open(boletoTransaction.boletoTransaction.link, '_blank');
      } else {
        console.error('Erro ao processar a compra:');
      }
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PaymentForm
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cvv={cvv}
          setCvv={setCvv}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          cardName={cardName}
          setCardName={setCardName}
          installmentNumber={installmentNumber}
          setInstallmentNumber={setInstallmentNumber}
          value={value}
          rememberCard={rememberCard}
          setRememberCard={setRememberCard}
          cardReturned={cardReturned}
          transactionCardId={transactionCardId}
          setTransactionCardId={setTransactionCardId}
        />;
      case 1:
        return <FinishedBuy />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    id ?
      <ThemeProvider theme={defaultTheme}>
        {!amount && (
          <div className="popup">
            <div className="popup-content">
              <ReactLoading type="spin" color="#008000" height={200} width={50} />
            </div>
          </div>
        )}
        <CssBaseline />
        <Grid container sx={{ height: { xs: '100%', sm: '100dvh' } }}>
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              pt: 4,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'end',
                height: 50,
              }}
            >
              <img src={payformLogo} style={{ width: '35%' }}></img>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 50,
              }}
            >
              <p>Olá <span style={{ fontWeight: '600' }}>{costumerName}</span> você está a um passo de concluir sua compra </p>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info totalPrice={value} />
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={7}
            lg={8}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'start',
              pt: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'space-between', md: 'flex-end' },
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <img src={payformLogo} style={{ width: '35%' }}></img>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                  height: 40,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{
                    width: '100%',
                    height: 50,
                  }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ':first-child': { pl: 0 },
                        ':last-child': { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ':last-child': { pb: 2 },
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Total
                  </Typography>
                  <Typography variant="body1">
                    {value}
                  </Typography>
                </div>
                <InfoMobile totalPrice={value} />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
                maxHeight: '720px',
                gap: { xs: 5, md: 'none' },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: 'flex', md: 'none' } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                      '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {pix ? (
                <QrCode codePix={pix} value={value} />
              ) : waitingPayment ? (
                <WaitingPayment requestNumber={id[0]} />
              ) :
                (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                        justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                        alignItems: 'end',
                        flexGrow: 1,
                        height: '20px',
                        gap: 1,
                        pb: { xs: 0, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: '40px',
                      }}
                    >


                      {activeStep !== steps.length - 1 && (
                        <Button
                          variant="contained"
                          endIcon={<ChevronRightRoundedIcon />}
                          onClick={handleNext}
                          sx={{
                            width: { xs: '100%', sm: 'fit-content' },
                            marginBottom: "1.5rem",
                          }}
                        >
                          Finalizar Compra
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>


                )
              }

            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      :
      null
  );
}
