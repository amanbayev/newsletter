import { Mongo } from 'meteor/mongo';

export const News = new Mongo.Collection('News');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('News', function() {
    return News.find();
  });

  Meteor.methods({
    'createNews':function(newsletterNew){
      newsletterNew.active = true;
      return News.insert(newsletterNew);
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
