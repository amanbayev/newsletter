import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('News');

if (Meteor.isServer) {

  Meteor.publish('News', function() {
    return News.find();
  });

  Meteor.methods({
    'createNews':function(newNewsItem){
      newNewsItem.active = true;
      News.insert(newNewsItem);
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
