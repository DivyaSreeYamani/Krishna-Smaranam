import React from 'react';
import verse_text from '../verses/verses';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {

    marginRight: -8,
  },
};

export class Verse extends React.Component {
    // state = { currentVerse: "2.13" };

    render() {
        const { verse, onClick } = this.props;

        // const verse_text = require('../verses/'+this.state.currentVerse+'.json');
        // var verseJson = verse_text[this.state.currentVerse];
      //
        // const mp3 = require('../audio/'+this.state.currentVerse+'.mp3');
        var verseJson = verse_text[verse];
        const mp3 = require('../audio/'+verse+'.mp3');
        return (
        <div >



          <div >
            <Card className={styles.card} style={{alignContent:"right"}}>


                <Button  style={{float:'left'}} onClick={() => onClick("prev")} color="primary">

                  <NavigateBefore />
                  Prev
                </Button>


                  <Button style={{float:'right'}} onClick={() => onClick("next")} color="primary">
                  Next
                  <NavigateNext />
                </Button>
              <CardContent>
                 <Typography gutterBottom variant="headline" component="h1">
                   {verseJson.chapter} </Typography>
                 <Typography gutterBottom variant="headline" component="h2">
                   {verseJson.verse_no} </Typography>
                 <Typography component="p">
                   <i>{verseJson.verse.split('\n').map(function(item) {
                     return (<span>
                            {item}
                       <br/>
                        </span>)
                   })}</i>
                 </Typography>
                <Typography component="p">
                  {verseJson.synonyms} </Typography>
                <Typography component="h4">
                  {verseJson.translation} </Typography>
                 </CardContent>
              <CardMedia
                className={styles.media}

                title="Sloka Recitation"
              />
              <audio onEnded={() => this.props.audioComplete()} loop={this.props.audioLoop} controls autoPlay src={mp3} type="audio/mpeg" ></audio>
                 </Card>
             </div>
        </div>);
    }
}
