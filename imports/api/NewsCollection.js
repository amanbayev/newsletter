import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('News');
import { Images } from './NewsImagesCollection.js'

if (Meteor.isServer) {
  // This code only runs on the server
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  Meteor.publish('News', function() {
    return News.find();
  });

  Meteor.methods({
    'createNews':function(newNewsItem){
      newNewsItem.active = true;
      Images.write(newNewsItem.image, {
        fileName: newNewsItem.name + getRandomInt(0,500) + '.png',
        type: 'image/png'
      }, function (error, fileRef) {
        if (error) {
          throw error;
        } else {
          newNewsItem.image = fileRef._id;
          News.insert(newNewsItem);
        }
      });
      return true;
    },
    'deleteNews':function(newsletterId) {
      News.update({_id:newsletterId}, {$set:{
        'active':false
      }});
      return true;
    }
  });

  News.allow({
    insert: function(){
      return true;
    },
    update: function(){
      return true;
    },
    remove: function(){
      return true;
    }
  });

  News.deny({
    insert: function(){
      return false;
    },
    update: function(){
      return false;
    },
    remove: function(){
      return false;
    }
  });
}
