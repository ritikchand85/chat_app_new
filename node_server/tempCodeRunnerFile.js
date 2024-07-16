app.use(express.static(path.join(__dirname, 'my-react-app/public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + "."+/my-react-app/public/index.html'));
});