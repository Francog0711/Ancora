const express = require('express');
const app = express();
const fs = require('fs'); // Módulo para manejar archivos

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

app.use('/resource', express.static('public'));
app.use('/resource', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const bcryptjs = require('bcryptjs');

const session = require('express-session');
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

const connection = require('./database/db');

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  connection.query(
    'INSERT INTO users SET ?',
    { user: user, name: name, rol: rol, pass: passwordHaash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render('register', {
          alert: true,
          alertTitle: 'Registration',
          alertMessage: '¡Successful Registration!',
          alertIcon: 'success',
          showConfirmButton: false,
          timer: 1500,
          ruta: '',
        });
      }
    }
  );
});

app.post('/auth', async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  let passwordHaash = await bcryptjs.hash(pass, 8);
  if (user && pass) {
    connection.query(
      'SELECT * FROM users WHERE user = ?',
      [user],
      async (error, results) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].pass))
        ) {
          res.render('login', {
            alert: true,
            alertTitle: 'Error',
            alertMessage: 'Usuario y/o password incorrectas',
            alertIcon: 'error',
            showConfirmButton: true,
            timer: false,
            ruta: 'login',
          });
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].name;
          res.render('login', {
            alert: true,
            alertTitle: 'Conexión Exitosa',
            alertMessage: '¡LOGIN CORRECTO!',
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 1500,
            ruta: '',
          });
        }
      }
    );
  } else {
    res.render('login', {
      alert: true,
      alertTitle: 'Advertencia',
      alertMessage: '¡Por favor ingrese un usuario y/o password!',
      alertIcon: 'warning',
      showConfirmButton: true,
      timer: false,
      ruta: 'login',
    });
  }
});

app.patch('/actualizar-precio', (req, res) => {
	const precioNuevo = req.body.precioNuevo;
	console.log('Nuevo precio recibido:', precioNuevo); // depura
	try {
	  // Lee el archivo JSON, actualiza el precio y escribe en el archivo nuevamente
	  const data = JSON.parse(fs.readFileSync('calcular.json', 'utf8'));
	  data[0].precio = precioNuevo;
	  fs.writeFileSync('calcular.json', JSON.stringify(data));
	  console.log('Precio actualizado en el archivo calcular.json:', precioNuevo); // depura
	} catch (error) {
	  console.error('Error al actualizar el precio en el archivo JSON:', error);
	  res.status(500).send('Error al actualizar el precio');
	}
  });

app.get('/mensaje', (req, res) => {
  res.render('mensaje');
});

app.get('/', async (req, res) => {
  if (req.session.loggedin) {
    res.render('index', {
      login: true,
      name: req.session.name,
    });
  } else {
    res.render('index', {
      login: false,
      name: 'Debe iniciar sesión',
    });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// Ruta para obtener el precio del archivo JSON
app.get('/precio', (req, res) => {
  try {
    // Lee el .JSON
    const data = fs.readFileSync('calcular.json', 'utf8');
    const json = JSON.parse(data);
    const precio = json[0].precio;

    // precio como respuesta
    res.json({ precio: precio });
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).json({ error: 'Error al obtener el precio del archivo JSON' });
  }
});

app.listen(3000, (req, res) => {
  console.log('SERVER RUNNING IN http://localhost:3000');
});
