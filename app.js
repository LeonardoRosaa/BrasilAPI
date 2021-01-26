import cors from 'cors';
import nc from 'next-connect';

const corsDefaultConfiguration = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const onError = (err, req, res) => {
  console.log(`[OnError] ${err}`);

  res.status(400).json({
    message: err.message,
    type: err.type,
  });
};

const onNoMatch = (req, res) => {
  console.log(`[onNoMatch]`);

  res.status(404).json({
    message: 'Route not found',
  });
};

export default (options) => {
  const corsConfiguration = {
    ...corsDefaultConfiguration,
    ...options,
  };

  return nc({
    onError,
    onNoMatch,
  }).use(cors(corsConfiguration));
};
