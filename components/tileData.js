// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import Info from '@material-ui/icons/InfoOutlined';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';
import TreeIcon from "./SVGIcons/tree";
import HomeIcon from "./SVGIcons/SvgIcons";
import LogoIcon from "./SVGIcons/LogoIcons";
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import gita from "./images/gita.jpg";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import verse_text from '../verses/verses';

export default { gita }

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});


export const otherMailFolderListItems = (
    <div>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon className={styles.icon} color="primary" />

          </ListItemIcon>
            <ListItemText primary="Report Issues" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
              <LogoIcon className={styles.icon} color="primary" />

            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItem>
    </div>
);

class DropDown extends React.Component {
    state = {open: false};

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    selectVerse = (verse) => {
        this.props.onClick(verse);
    };

    render() {
        // const { classes } = this.props;
        return (
            <div>

                <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                      <img src={gita} height="35" width="35"></img>
                      {/*<TreeIcon className={styles.icon} color="primary" />*/}
                    </ListItemIcon>
                    <ListItemText inset primary={this.props.display.chapter} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.props.display.verses.map((verse, index) => (
                            <ListItem button className={this.props.nested}>
                                <ListItemIcon>
                                    <p />
                                </ListItemIcon>
                                <ListItemText inset primary={verse} onClick={() => this.props.onClick(verse)} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

            </div>
        );
    }
}

export class NestedList extends React.Component {
    state = { open: false };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes, onClick } = this.props;


        return (
            <div className={classes.root}>
                <List
                    component="nav"
                >

                    {this.props.chapters.map((chapter, index) => (
                        <DropDown display={chapter}  onClick={this.props.onClick} />
                    ))}

                </List>
            </div>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired
};

// export default withStyles(styles)(NestedList);