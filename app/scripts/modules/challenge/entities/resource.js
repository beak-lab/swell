'use strict';
define(['app'], function(App) { // resource_entity
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

        var initializeFakes = function() {

            Entities.fakeResources = new Entities.ActivityCollection([{
                id: 1,
                type : 'quote',
                text: 'People usually don’t disclose because of their fear of discrimination but more people fear discrimination than are actually discriminated against.',
                // cite: 'John Green'
            }, {
                id: 2,
                type : 'video',
                title: 'Gary\'s recovery story on disclosure',
                url: 'vid/howtoaceajobinterview.mp4',
                poster: 'images/posters/gary.jpg',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus voluptatum sunt harum maiores beatae dignissimos.',
            }, {
                id: 3,
                type : 'article',
                title: 'Guidelines on disclosure to employers',
                author: 'Mental Health Foundation of New Zealand',
                data: '<h3>Purpose and Openness</h3><p>You won\'t find these words in the Act, but they are still important.  The Act tries to instil a way of thinking about peoples personal information, and these two words sum up that approach.</p><p>Although most complaints come from other parts of the Act, the Principles relating to collection are very important, as they set up the way in which information can be used and/or disclosed.</p><h3>Principle 1</h3><p>Principle 1 addresses: </p><ul><li>What information an agency is allowed to collect.  </li></ul><p>The objective of Principle 1 is to guard against collection of excessive information.  </p><p>Principle 1 provides that agencies must not collect information unless:</p><ul><li>It is collected for a lawful purpose connected with the function or activity of the agency;<strong>and</strong></li><li>Collection is necessary for that purpose.</li></ul><p>In order to comply with Principle 1, agencies must set their own purposes with regard to the information they collect.  In doing so, the agency must ask itself the following questions:</p><ul><li>Do I have a lawful purpose for collecting the information?  In order to determine this, a subset of issues must be addressed:</li></ul><ul><li>What information do I need to collect?</li><li>Why do I need this information?</li><li>Does the law regulate or prescribe the collection process?  </li></ul><ul><li>Is the purpose connected with a function or activity of the agency?</li><li>Is the collection of this information <strong>necessary</strong>to achieve that purpose?</li></ul><p><em>Notes on Principle 1</em></p><ul><li>Principle 1 links into other Principles, so that, if an agency has made a good attempt at explaining its purpose, as required under Principle 3, people are more likely to understand why the collection of the information is necessary and how the information will be used and disclosed.</li></ul><ul type="disc"><li>Note that any collection of personal information is prohibited unless three conditions are met;</li><li>The three conditions start wide, get narrower;</li><li>&ldquo;Lawful purpose&rdquo;- wide.  A purpose that is not illegal;</li><li>&ldquo;Connected with function or activity of agency&rdquo;- narrower, but still broad. The purpose could be connected in any way.  This part of the Principle asks an agency to look at what information it needs to do its job.</li><li>&ldquo;Necessary for that purpose&rdquo;– This is arguably quite a tight restriction.  In practice, however, it is not too constricting as long as the functions and activities of the agency are understood.</li></ul><p>&nbsp;</p><h4>Principle 2</h4><p><strong>&nbsp;</strong>Principle 2 requires agencies to collect information directly from the individual concerned.  This is why you normally have to give your consent for an agency to contact a referee.</p><p><em>&nbsp;</em><em>Notes on Principle 2</em></p><ul><li>Pay attention to any &lsquo;authorisations&rsquo;contained in a job application form you are filling out – who are you authorising the prospective employer to contact?  Is there anyone you would not wish them to speak to?</li><li>There are a number of exceptions to this Principle, but they&rsquo;re normally not relevant in an employment application situation.</li></ul><p>&nbsp;</p><h4>Principle 3</h4><p>This requires agencies to let you know what they are collecting the information for, which is something they have decided back in Principle 1, and a number of other facts in relation to the collection, namely:</p><ul type="disc"><li>The fact that information is being collected, which will normally be obvious in an employment application;</li><li>The intended recipients;</li><li>Contact details for the agency holding the information;</li><li>Whether supplying that information is mandatory or voluntary;</li><li>What the consequences may be if information not supplied;</li><li>That you have rights of access and correction to the information held.</li></ul><p><em>&nbsp;</em><em>Notes on Principle 3</em></p><ul><li>There will normally be a &ldquo;Privacy Statement&rdquo;on an application form, or there might be an indication in the questions as to what the information is intended to be used for.  </li><li>In general terms, you cannot prevent an agency asking for certain information unless to collect it would be a breach of Principle 1.</li></ul><h3>Complaints</h3><p>Complaints about potential breaches of the Act are made to the Privacy Commissioner.  She will investigate them and try to settle them in a way that is acceptable to both parties.  If she can&rsquo;t, she will either close the investigation or form an opinion as to whether an interference with someone&rsquo;s privacy has occurred.  </p><p>For there to be an interference she must be satisfied both that a breach of one or more of the Principles has occurred, and that the breach has caused some kind of harm or other adverse consequence.</p>'
            }, {
                id: 4,
                type : 'event',
                title: 'Work peer discussion group',
                date: '19 September',
                time: '7pm'
            },{
                id: 5,
                type : 'quote',
                text: 'What\'s my age again?',
                cite: 'Blink-182'
            }]);
        };

        var API = {
            getEntity: function(id) {
                if (undefined === Entities.fakeResources) {
                    initializeFakes();
                }

                var model = Entities.fakeResources.findWhere({
                    id: parseInt(id, 10)
                });

                return model;
            },
            getEntities: function(array) {
                if (undefined === Entities.fakeResources) {
                    initializeFakes();
                }

                return Entities.fakeResources.filter(function(model) {
                    return _.contains(array, model.id);
                });
            }
        };

        App.reqres.setHandler('resource:entity', function(id) {
            return API.getEntity(id);
        });

        App.reqres.setHandler('resource:entities', function(array) {
            return API.getEntities(array);
        });

    });

    return;
});