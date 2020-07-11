/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Button,
  Modal,
  Card,
  CardContent,
  CardMedia,
  TextField,
} from '@material-ui/core';
import constants from '../utils/constants/constants';
import data from '../utils/constants/data';

const {
  pricingIconPath, csvIconPath, reportIconPath, months,
} = constants;

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

// using material ui styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 40,
    '@media (max-width:600px)': {
      width: 'fit-content',
    },
  },
  indicator: {
    backgroundColor: '#83A515;',
  },
  selected: {
    color: '#83A515;',
  },
  outerRootClass: {
    paddingBottom: 40,
    width: 'fit-content',
  },
  modalStyle: {
    minHeight: 100,
    width: '30%',
    border: '2 solid #f19533',
    padding: 20,
  },
  cardRoot: {
    maxWidth: 400,
    marginLeft: '35%',
    marginTop: '10%',
    height: 'auto',
    '@media (max-width:650px)': {
      maxWidth: '50%',
      marginLeft: '3%',
      marginTop: '15%',
      marginBottom: '7%',
    },
  },
  media: {
    width: 137,
    height: 137,
    marginLeft: 17,
    marginTop: 13,
    boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.151415)',
  },
  imgWrapper: {
    paddingTop: 5,
    paddingRight: 10,
  },
  outerPricingStyle: {
    paddingBottom: 20,
  },
  pricingStyle: {
    color: '#2B416C',
    fontWeight: 'bold',
    fontSize: 24,
    paddingTop: '3%',
    marginBottom: 20,
  },
  pricingValueStyle: {
    float: 'right',
    color: '#556789',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outerImgWrap: {
    display: 'flex',
  },
  outerTextWrap: {
    marginLeft: '3%',
  },
  gameName: {
    fontSize: 16,
    color: '#556789',
  },
  closeButtonStyle: {
    marginLeft: '38%',
    marginTop: '10%',
    border: '2px solid #181B34',
    boxSizing: 'border-box',
  },
  details: {
    display: 'flex',
  },
  calender: {
    paddingLeft: 10,
  },
  content: {
    flex: '1 0 auto',
    paddingTop: '21%',
    paddingBottom: '0 !important',
  },
  name: {
    paddingBottom: '8%',
    color: '#2B416C',
    fontSize: 16,
    fontWeight: 500,
  },
  dateStyle: {
    fontSize: 16,
    color: '#2B416C',
  },
  tableHeadStyle: {
    color: '#556789',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  lang: {
    fontSize: 14,
    color: '#9CA2B7',
  },
  subTextStyle: {
    fontSize: 14,
    color: '#9CA2B7',
    fontStyle: 'italic',
  },
  table: {
    '@media (max-width:600px)': {
      width: '100vw',
    },
  },
}));

const getMonthFromString = (mon) => new Date(Date.parse(`${mon} 1, 2012`)).getMonth() + 1;

function convertDate(date) {
  // Converting date into required format of month, year , date
  const date1 = date.split(' ');
  const day = date1[2];
  const month = getMonthFromString(date1[0]);
  const year = date1[1].split(',')[0];
  return `${year}-${month.length === 2 ? month : `0${month}`}-${day.length === 2 ? day : `0${day}`}`;
}

function convertOriginalFormat(date) {
  const date1 = date.split('-');
  return `${months[parseInt(date1[1], 10) - 1]} ${date1[0]}, ${date1[2]}`;
}

export default function CampaignList() {
  const [myData, setMyData] = useState(data);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [currentInfo, setCurrentInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const daysDifference = (date) => {
    // computing difference between selected and current date
    const dt2 = new Date(date);
    const dt1 = new Date();
    return (
      Math.floor((
        Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24))
    );
  };

  const handleDateChange = (evt, ind) => {
    const md1 = { ...myData };
    const date = (evt.target.value);
    const days = daysDifference(date);
    md1.campaignData[ind].date = convertOriginalFormat(date);
    if (days < 0) {
      md1.campaignData[ind].status = constants.pastStatus;
    } else if (days > 0) {
      md1.campaignData[ind].status = constants.upcomingStatus;
    } else {
      md1.campaignData[ind].status = constants.liveStatus;
    }
    // setting the change in date directly into state
    setMyData(md1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchCampaignsList = ({ status }) => (
    // Rendering info for each of campaigns, after computation with date difference
    myData.campaignData.map((campaignInfo, index) => {
      if (campaignInfo.status === status) {
        const defValue = convertDate(campaignInfo.date);
        const daysGap = daysDifference(defValue);
        return (
          <TableRow>
            <TableCell>
              <div className={classes.dateStyle}>
                {campaignInfo.date}
              </div>
              <div className={classes.subTextStyle}>
                {daysGap > 0 ? `${daysGap} Days Ahead` : daysGap < 0 ? `${Math.abs(daysGap)} Days Ago` : null}
              </div>
            </TableCell>
            <TableCell>
              <div className={classes.outerImgWrap}>
                <img
                  src={`${constants.topGamesPath}/Row Copy ${index + 1}-Row/Thumb/Bitmap.png`}
                  height="auto"
                  width={40}
                  alt="Icon"
                />
                <div className={classes.outerTextWrap}>
                  <div className={classes.gameName}>{campaignInfo.name}</div>
                  <div className={classes.subTextStyle}>{campaignInfo.lang}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                  setCurrentInfo({
                    ...campaignInfo,
                    src: `${constants.topGamesPath}/Row Copy ${index + 1}-Row/Thumb/Bitmap.png`,
                  });
                }}
              >
                <span className={classes.imgWrapper}>
                  <img
                    src={`${pricingIconPath}`}
                    width={24}
                    height={24}
                    alt="Icon"
                  />
                </span>
                View Pricing
              </Button>
            </TableCell>
            <TableCell>
              <Button>
                <span className={classes.imgWrapper}>
                  <img
                    src={`${csvIconPath}`}
                    width="auto"
                    height={24}
                    alt="Icon"
                  />
                </span>
                CSV
              </Button>

              <Button>
                <span className={classes.imgWrapper}>
                  <img
                    src={`${reportIconPath}`}
                    width={24}
                    height={24}
                    alt="Icon"
                  />
                </span>
                Report
              </Button>
              <span className={classes.calender}>
                <TextField
                  id="date"
                  label="Schedule Again"
                  type="date"
                  defaultValue={defValue}
                  onChange={(evt) => { handleDateChange(evt, index); }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </span>
            </TableCell>
          </TableRow>
        );
      }
    })
  );

  const renderTableHeaders = () => (
    // Fetching table headers from constant file
    <TableHead style={{ backgroundColor: '#F1F1F4' }}>
      <TableRow>
        {constants.tableHeadings.map((colName) => (
          <TableCell classes={{ head: classes.tableHeadStyle }}>{colName}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderTabs = () => {
    // Rendering all the campaigns info
    const { upcomingStatus, liveStatus, pastStatus } = constants;
    return [upcomingStatus, liveStatus, pastStatus].map((status, index) => (
      <div className={classes.tabRoot}>
        <TabPanel value={value} index={index} dir={theme.direction}>
          <TableContainer component={Paper}>
            <Table className={{ root: classes.table }} aria-label="simple table">
              {renderTableHeaders()}
              <TableBody>
                {fetchCampaignsList({ status })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </div>
    ));
  };

  const renderPricingSlabs = () => {
    // Fetching price slabs from constants file
    const { pricing: { week, month, year } } = currentInfo;
    return [week, month, year].map((pricingValue, index) => (
      <div className={classes.outerPricingStyle}>
        <span>{constants.timeDurations[index]}</span>
        <span className={classes.pricingValueStyle}>
          {pricingValue}
        </span>
      </div>
    ));
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        classes={{ indicator: classes.indicator, root: classes.outerRootClass }}
        variant="centered"
        aria-label="full width tabs example"
      >
        <Tab classes={{ selected: classes.selected }} label="Upcoming" {...a11yProps(0)} />
        <Tab classes={{ selected: classes.selected }} label="Live" {...a11yProps(1)} />
        <Tab classes={{ selected: classes.selected }} label="Past" {...a11yProps(2)} />
      </Tabs>
      {renderTabs()}
      <Modal
        id="on-delete"
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        {/* Rendering pricing card */}
        <Card className={classes.cardRoot}>
          <div className={classes.details}>
            <CardMedia
              className={classes.media}
              image={currentInfo.src}
            />
            <CardContent className={classes.content}>
              <Typography className={classes.name} component="h5" variant="h5">
                {currentInfo.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {currentInfo.lang}
              </Typography>
            </CardContent>
          </div>
          <CardContent>
            <Typography classes={{ root: classes.pricingStyle }} gutterBottom variant="h5" component="h2">
              Pricing
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {Object.keys(currentInfo).length !== 0 && renderPricingSlabs()}
            </Typography>
            <Button
              onClick={() => {
                setIsModalOpen(false);
              }}
              variant="outlined"
              classes={{ outlined: classes.closeButtonStyle }}
            >
              Close
            </Button>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
