import { Mongo } from 'meteor/mongo';

export const Newsletters = new Mongo.Collection('Newsletters');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('Newsletters', function() {
    return Newsletters.find();
  });

  Meteor.methods({
    'createNewsletter':function(newsletterNew){
      newsletterNew.active = true;
      return Newsletters.insert(newsletterNew);
    },
    'deleteNewsletter':function(newsletterId) {
      Newsletters.update({_id:newsletterId}, {$set:{
        'active':false
      }});
      return true;
    }
  });

  Newsletters.allow({
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

  Newsletters.deny({
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
