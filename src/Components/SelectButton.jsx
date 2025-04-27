/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
     selectbutton: {
          border: "1px solid gold",
          borderRadius: 5,
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontFamily: "Montserrat",
          cursor: "pointer",
          backgroundColor: (props) => (props.selected ? "gold" : ""),
          color: (props) => (props.selected ? "black" : ""),
          fontWeight: (props) => (props.selected ? 700 : 500),
          "&:hover": {
               backgroundColor: "gold",
               color: "black",
          },
          width: "22%",
          //   margin: 5,
     },
});

const SelectButton = ({ children, selected, onClick }) => {
     const classes = useStyles({ selected });

     return (
          <span onClick={onClick} className={classes.selectbutton}>
               {children}
          </span>
     );
};

SelectButton.propTypes = {
     children: PropTypes.node.isRequired,
     selected: PropTypes.bool.isRequired,
     onClick: PropTypes.func.isRequired,
};

export default SelectButton;
