
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from './switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {  otherMailFolderListItems, NestedList } from './tileData';
import withRoot from "../withRoot";
import { Verse } from "./verse";
import Tab from "./tabs";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
});


class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    selectedVerse: '10.8',
    selectedHeading: 0,
    audioLoop: true,
    checkedA: true,
    checkedB: true,
    drawerHeading: ["BG - 4","BG - 30","BG - 108","BG - 700","SB - 4", "ISO","NOI"],
    heading: ["Bhagavad Gita 4 verses","Bhagavad Gita 30 verses","Bhagavad Gita 108 verses","Bhagavad Gita 700 verses","Srimad Bhagavatam 4 verses","Isopanishad Verses", "Nectar of Instruction"],
    chapters: {
      0: [{'chapter': 'Chapter 10', 'verses': ['10.8', '10.9', '10.10', '10.11']},],
      1: [
        {'chapter': 'Chapter 2', 'verses': ['2.12', '2.13', '2.14']},
        {'chapter': 'Chapter 3', 'verses': ['3.13', '3.19', '3.27', '3.37']},
        {'chapter': 'Chapter 4', 'verses': ['4.2', '4.7', '4.9', '4.34']},
        {'chapter': 'Chapter 5', 'verses': ['5.18']},
        {'chapter': 'Chapter 7', 'verses': ['7.1', '7.8', '7.14', '7.19', '7.23']},
        {'chapter': 'Chapter 9', 'verses': ['9.10', '9.11', '9.13', '9.14', '9.22']},
        {'chapter': 'Chapter 10', 'verses': ['10.8', '10.9', '10.10', '10.11']},
        {'chapter': 'Chapter 12', 'verses': ['12.5']},
        {'chapter': 'Chapter 15', 'verses': ['15.6']},
        {'chapter': 'Chapter 18', 'verses': ['18.55', '18.56']}, ]
    }
    ,
    verse_list: {
      0: ['10.8', '10.9', '10.10', '10.11',],
      1:['2.12', '2.13', '2.14', '3.13', '3.19', '3.27', '3.37',
      '4.2', '4.7', '4.9', '4.34', '5.18', '7.1', '7.8', '7.14', '7.19', '7.23',
      '9.10', '9.11', '9.13', '9.14', '9.22', '10.8', '10.9', '10.10', '10.11',
      '12.5', '15.6', '18.55', '18.56',],
}
};
  handleAudioComplete = () => {
    this.getVerse("next");
  };
  getVerse = (action) => {
    var verse_index = this.state.verse_list[this.state.selectedHeading].indexOf(this.state.selectedVerse);
    console.log(verse_index);

    if (action==="prev") {
      let intended_index = verse_index - 1;
      if (intended_index < 0) intended_index = this.state.verse_list[this.state.selectedHeading].length -1 ;
      this.setState(state => ({
        selectedVerse: this.state.verse_list[this.state.selectedHeading][intended_index]
      }));
    } else {
      this.setState(state => ({
        selectedVerse: this.state.verse_list[this.state.selectedHeading][(verse_index+1)%this.state.verse_list[this.state.selectedHeading].length]
      }));
    }
  };

  handleDrawerToggle = () => {
    this.setState(state => ({
      mobileOpen: !state.mobileOpen,
      // selectedVerse: this.selectedVerse
    }));
  };
  handleVerseSelect = (newVerse) => {
    if(newVerse!==undefined) {
      this.setState(state => ({
        selectedVerse: newVerse
      }));
    }
  };
  handleHeading = (tabno) => {
    this.setState(state => ({
      selectedHeading: tabno,
      selectedVerse: this.state.verse_list[tabno][0],
    }));
  };
  handleLoop = (loop) => {
      this.setState(state => ({
        audioLoop: loop
      }));
  };

  // verseSelection(newVerse) {
  //     alert(this.state);
  //     // this.setState({
  //     //     mobileOpen: this.state.mobileOpen,
  //     //     selectedVerse: newVerse
  //     // });
  //     // this.setState(state => ({
  //     //     mobileOpen: state.mobileOpen,
  //     //     selectedVerse: this.selectedVerse
  //     // }));
  // }

  render() {
    const { classes, theme } = this.props;



    const drawer = (
      <div>
        <div className={classes.content} ><b>{this.state.drawerHeading[this.state.selectedHeading]}</b></div>
        <Divider />
        <List><NestedList classes={{styles}} chapters={this.state.chapters[this.state.selectedHeading]} onClick={this.handleVerseSelect}/></List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        {/*<Grid container>*/}
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              {this.state.heading[this.state.selectedHeading]}
            </Typography>
            <div style={{position:"absolute", right:"1%"}}>
              <FormControlLabel
                control={
                  <Switch onChange={this.handleLoop} />}
                  label="Loop current verse"
                labelPlacement="start"
              />
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>

          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Tab onClick={this.handleHeading} />
            <Grid item xs={12}>
                <Verse verse={this.state.selectedVerse} audioLoop={this.state.audioLoop} onClick={this.getVerse} audioComplete={this.handleAudioComplete}/>
            </Grid>

</Grid>
{/*<div >*/}
{/*style={{'position':'relative', display:'inline-block', width:"1500px", height:"1000px",background:"#424242", margin:"10px", overflow:"hidden", textAlign:"center"}}*/}
{/*</div>*/}
</main>
</div>
);
}
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
export default withRoot(withStyles(styles, { withTheme: true })(ResponsiveDrawer));
