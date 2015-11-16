/**
 * Created by andreaterzani on 12/11/15.
 */


Events._ensureIndex({'center':'2dsphere'});

Kadira.connect('AuWEJufZdBDMcTJ7T', '61a6cf1b-1f48-4148-99ff-8ff67fd70b64');



Meteor.publish("events", function (box,min_distance,max_distance) {

	if(!box)box=[[1,0],[0,1]];


	var JsonBox =	{
            'type': "Polygon" ,
            'coordinates': [[
            					[box[0][0],box[1][1]],
            			  		[box[1][0],box[1][1]],
            			  		[box[1][0],box[0][1]],
            			  		[box[0][0],box[0][1]],
            			  		[box[0][0],box[1][1]]
            			  ]]
         };

	    return Events.find({$and:[{'trackanalysis.distance': 
                                    { 
                                     '$gt': min_distance, 
                                      '$lt': max_distance 
                                    }
                                 },
                                {
                                    center : { '$geoWithin' :{ '$geometry' : JsonBox}}
                                }]
                            },
	    				   {'fields':{'geo':0,'geosimple':0},'limit' : 50});

});


Meteor.publish("simpleevent", function(id) {
	console.log('Publish simpleevent : '+id);
	var event= Events.find({_id:id},{'fields':{'geo':0}})

	console.log(event.count());

    return event;
});

Meteor.publish("fullevent", function(id) {
	console.log('Publish fullevent : '+id);
    return Events.find({_id:id});
});
