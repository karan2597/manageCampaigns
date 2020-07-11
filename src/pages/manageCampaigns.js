import React from 'react';
import {
  Typography,
  makeStyles,
} from '@material-ui/core';
import CampaignList from '../components/Tabs';
import Header from '../components/Header';

const useStyles = makeStyles(() => ({
  heading: {
    color: '#2B416C',
    paddingTop: '3%',
    '@media (max-width:600px)': {
      fontSize: '15px',
    },
  },
  outerWrap: {
    paddingLeft: '12.5%',
    paddingRight: 180,
    paddingTop: 40,
  },
}));

const Managecampaigns = () => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.outerWrap}>
        <Typography variant="h3" className={classes.heading}>
          Manage Campaigns
        </Typography>
        <CampaignList />
      </div>
    </>
  );
};

export default Managecampaigns;
