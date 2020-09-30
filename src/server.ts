import app from './shared/infra/http/app';

app.listen(process.env.PORT || 3333, () => {
  console.log('✨ Server iniciou na porta 3333!');
});
