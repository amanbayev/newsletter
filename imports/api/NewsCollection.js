import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('News');
import { Images } from './NewsImagesCollection.js'

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('News', function() {
    return News.find();
  });

  Meteor.methods({
    'createNews':function(newNewsItem){
      newNewsItem.active = true;

      const upload = Images.insert({
        file: newNewsItem.image,
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('end', function (error, fileObj) {
        if (error) {
          console.log('Error during upload: ' + error);
          return error;
        } else {
          console.log('File "' + fileObj.name + '" successfully uploaded');
          return News.insert(newNewsItem);
        }
      });

      upload.start();
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
