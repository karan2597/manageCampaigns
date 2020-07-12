import React from 'react';
// Highly customisable and generic component if header, which accepts tile value as props

import {
  AppBar, Toolbar, Typography, makeStyles,
} from '@material-ui/core';

import logo from '../../public/Images/logo.png';

const useStyles = makeStyles(() => ({
  appbarWrapperStyle: {
    height: 55,
  },
  appbarStyle: {
    '&.MuiAppBar-root': {
      justifyContent: 'space-between',
      backgroundColor: '#1F2640',
    },
  },
  imgContainer: {
    width: '10.2%',
    paddingLeft: '12.5%',
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  titleStyle: {
    marginLeft: 16,
    '&.MuiTypography-root': {
      borderLeft: 'solid 1px #979797',
      paddingLeft: 15,
      fontSize: 16,
      color: '#383838',
    },
  },
}));

const Header = ({ title = '' }) => {
  const classes = useStyles();
  return (
    <div className={classes.appbarWrapperStyle}>
      <AppBar className={classes.appbarStyle}>
        <Toolbar>
          <div className={classes.imgContainer}>
            <img src={logo} alt="Logo" />
          </div>
          <Typography variant="h6" className={classes.titleStyle}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
