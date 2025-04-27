
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { makeStyles } from "@mui/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from "@mui/material";

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
     title: {
          flex: 1,
          color: "gold",
          fontFamily: "Montserrat",
          fontWeight: "bold",
          cursor: "pointer",
     },
}));

const darkTheme = createTheme({
     palette: {
          mode: "dark",
          primary: {
               main: "#fff",
          },

     },
});

function Header() {
     const classes = useStyles();
     const { currency, setCurrency } = CryptoState();

     const navigate = useNavigate();

     return (
          <ThemeProvider theme={darkTheme}>
               <AppBar color="transparent" position="static">
                    <Container>
                         <Toolbar>
                              <Typography
                                   onClick={() => navigate(`/`)}
                                   variant="h6"
                                   className={classes.title}
                              >
                                   Crypto Hunter
                              </Typography>
                              {/* <Button color="inherit">Login</Button> */}
                              <Select
                                   variant="outlined"
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   value={currency}
                                   style={{ width: 100, height: 40, marginLeft: 15 }}
                                   onChange={(e) => setCurrency(e.target.value)}
                              >

                                   <MenuItem value={"INR"}>INR</MenuItem>
                                   <MenuItem value={"USD"}>USD</MenuItem>
                                   <MenuItem value={"RUB"}>RUB</MenuItem>
                                   <MenuItem value={"EUR"}>EUR</MenuItem>
                              </Select>
                         </Toolbar>
                    </Container>
               </AppBar>
          </ThemeProvider>
     );
}

export default Header;