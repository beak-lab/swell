'use strict';
define(['app'], function(App) { // resource_entity
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {

        var initializeFakes = function() {

            Entities.fakeResources = new Entities.ActivityCollection([{
                id: 1,
                type : 'quote',
                text: 'Real gangster-ass Nerdfighters don’t run from nothing… ‘cause real gangster-ass Nerdfighters can’t run fast.',
                cite: 'John Green'
            }, {
                id: 2,
                type : 'video',
                title: 'How to ace a job interview',
                url: 'vid/howtoaceajobinterview.mp4',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus voluptatum sunt harum maiores beatae dignissimos.',
            }, {
                id: 3,
                type : 'article',
                title: 'Building a Career When Living with a Mood Disorder',
                author: 'Sabina Morris',
                data: '<p>People with mood disorders often have problems finding and keeping work. In my fifteen-year history of depression, I have found this to be personally true. I have encountered countless people with mental health problems whose careers have been interrupted or even sabotaged by their mental illness.</p><p>My own story can serve as an example of how it is possible to overcome even severe depression and become meaningfully employed. After struggling with chronic depression for many years, I was finally hospitalized for depression in 1996 and 1997. My depression was so severe that I had forgotten what year it was. I had stopped eating and lost 30 pounds, to the point that my weight had  dropped into the eighties, less than 90 pounds. My psychiatrist said that my depression was the worst case of depression he had seen in 30 years of practicing psychiatry. A judge agreed with him and had me forcibly committed to a mental hospital.</p><p>When I got out of hospital, I needed to rebuild my life. At first, that meant learning how to live on my own again, how to take care of my basic living needs, run a household, re-establish friendships and a social life. But gradually, that also meant needing to return to the workforce to earn a living.</p><p>My resume had large gaps in it, periods of mood instability when I had been unable to work over the last nine years. How would I explain that to an employer?</p><p>I began by registering in a Work Adjustment Employment Support program run by a local psychiatric hospital. It was for mental health patients who wanted to return to the workforce. I was placed in a volunteer work placement at the hospital. The volunteer job gave a structure to my day. I had a place to go to every morning. This volunteer job gave me a reason to get out of bed every morning and get dressed. It also gave me some recent work experience to put on my resume.</p><p>The volunteer job prepared me for my first paid job since hospitalization. I took on a six-month part-time contract as an office administrator. This led to another six-month full-time contract doing data entry work for the government.</p><p>While I was really glad to be working again, I was depressed about the fact that I could not find permanent work in my own field. I had two university degrees and I was working as a file clerk for just above minimum wage. When the contracts ran out, I looked for work really hard but couldn\'t find anything.</p><p>Then one day I read Mary Ellen Copeland\'s book Living Without Depression &amp; Manic Depression. There was a chapter in it devoted to "Creating a Career That Works." I found the whole book to be inspirational, and this chapter in particular helped me a great deal. It gave me hope to know that there were other people with mood disorders out there who were also struggling over the issue of employment. At the end of the chapter, Mary Ellen listed as a resource the book What Color Is Your Parachute? I went out and bought the book and read it cover to cover.</p><p>To sustain me in my job search, I started a job-finding club in my own home. This was a support group for other people who were looking for work. We met every two weeks to discuss job search techniques, job leads and to emotionally support each other in our period of unemployment.</p><p>Two things happened that finally helped me to find permanent work again in my field as a professional writer and editor. The first thing I did was to upgrade my computer and the second was to get an Internet account. I began to use the Internet to look for jobs. Through the Internet, I found out about an agency in my city that specialized in helping people with disabilities return to the workforce. I promptly went and registered with them. Although they did not find me a job, I had a one-hour session with an employment counselor who showed me how to re-write my resume to make it sparkle.</p><p>While I began getting called to a lot of job interviews, nobody was offering me a job. I obviously needed to improve my interviewing skills. Once more, I went out and bought a book. This time, it was the David Burns book, The Feeling Good Handbook. There was a chapter in it called "How to Give a Dynamic Interview When You\'re Scared Stiff." Within days of reading this chapter, I had my first successful job interview.  It had taken three years since my release from the hospital to find a meaningful career. If I could do it, others can too.</p>'
            }, {
                id: 4,
                type : 'image',
                title: 'A nice title 2',
                data: 'This is a resource 2'
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