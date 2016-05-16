var expect  = require('chai').expect;
var bluebird = require('bluebird');
var scraper = bluebird.promisifyAll(require('../scraper'));

describe('Deck Scraper', function() {
    describe('Add to deck', function() {
        it('adds a single card to the maindeck', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 1, side: 0}]);
        });
        it('adds a single card to the sideboard', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', true);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 0, side: 1}]);
        });
        it('adds a card to the maindeck and sideboard', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            scraper.addCard(deck, '1 Underground Sea', true);
            expect(deck.length).to.equal(1);
            expect(deck).to.deep.equal([{name: 'Underground Sea', main: 1, side: 1}]);
        });
        it('adds multiple cards to the deck', function() {
            var deck = [];
            scraper.addCard(deck, '4 Underground Sea', false);
            scraper.addCard(deck, '4 Polluted Delta', false);
            expect(deck.length).to.equal(2);
            expect(deck).to.contain({name: 'Underground Sea', main: 4, side: 0});
            expect(deck).to.contain({name: 'Polluted Delta', main: 4, side: 0});
        });
        it('does not create duplicate cards in the deck', function() {
            var deck = [];
            scraper.addCard(deck, '1 Underground Sea', false);
            expect(function() {
                scraper.addCard(deck, '1 Underground Sea', false);
            }).to.throw('Trying to add the same card twice: Underground Sea');
        });
    });

    describe('Scrape Hearthpwn deck', function() {
        it('scrapes a complete deck', function(done) {
            scraper.scrapeHearthpwnDeckAsync(249225)
            .then(function(deckJSON) {
                expect(deckJSON.deckName).to.equal('[S14] Combo Druid');
                expect(deckJSON.playerName).to.equal('Alphros');
                expect(deckJSON.deckClass).to.equal('Druid');
                expect(deckJSON.craftingCost).to.equal(8940);
                expect(deckJSON.cards).to.deep.equal([
                    { name: 'Innervate', quantity: 2 },
                    { name: 'Wild Growth', quantity: 2 },
                    { name: 'Wrath', quantity: 2 },
                    { name: 'Savage Roar', quantity: 2 },
                    { name: 'Keeper of the Grove', quantity: 2 },
                    { name: 'Swipe', quantity: 2 },
                    { name: 'Druid of the Claw', quantity: 2 },
                    { name: 'Force of Nature', quantity: 2 },
                    { name: 'Ancient of Lore', quantity: 2 },
                    { name: 'Shade of Naxxramas', quantity: 2 },
                    { name: 'Piloted Shredder', quantity: 2 },
                    { name: 'Azure Drake', quantity: 1 },
                    { name: 'Big Game Hunter', quantity: 1 },
                    { name: 'Harrison Jones', quantity: 1 },
                    { name: 'Sludge Belcher', quantity: 1 },
                    { name: 'Emperor Thaurissan', quantity: 1 },
                    { name: 'Sylvanas Windrunner', quantity: 1 },
                    { name: 'Dr. Boom', quantity: 1 },
                    { name: 'Ragnaros the Firelord', quantity: 1 }
                ]);
                done();
            });
        });
        it('identifies classes correctly - Druid', function(done) {
            scraper.scrapeHearthpwnDeckAsync(249225)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Druid');
                done();
            });
        });
        it('identifies classes correctly - Hunter', function(done) {
            scraper.scrapeHearthpwnDeckAsync(520585)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Hunter');
                done();
            });
        });
        it('identifies classes correctly - Mage', function(done) {
            scraper.scrapeHearthpwnDeckAsync(532040)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Mage');
                done();
            });
        });
        it('identifies classes correctly - Paladin', function(done) {
            scraper.scrapeHearthpwnDeckAsync(531690)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Paladin');
                done();
            });
        });
        it('identifies classes correctly - Priest', function(done) {
            scraper.scrapeHearthpwnDeckAsync(536503)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Priest');
                done();
            });
        });
        it('identifies classes correctly - Rogue', function(done) {
            scraper.scrapeHearthpwnDeckAsync(526029)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Rogue');
                done();
            });
        });
        it('identifies classes correctly - Shaman', function(done) {
            scraper.scrapeHearthpwnDeckAsync(535685)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Shaman');
                done();
            });
        });
        it('identifies classes correctly - Warlock', function(done) {
            scraper.scrapeHearthpwnDeckAsync(502782)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Warlock');
                done();
            });
        });
        it('identifies classes correctly - Warrior', function(done) {
            scraper.scrapeHearthpwnDeckAsync(529774)
            .then(function(deckJSON) {
                expect(deckJSON.deckClass).to.equal('Warrior');
                done();
            });
        });
    });

    describe('Scrape SCG deck', function() {
        it('scrapes a complete deck', function(done) {
            scraper.scrapeSCGDeckAsync(97366)
            .then(function(deckJSON) {
                expect(deckJSON.deckName).to.equal('U/B Tezzeret');
                expect(deckJSON.playerName).to.equal('Will Hutchins');
                expect(deckJSON.place).to.equal(6);
                expect(deckJSON.date).to.deep.equal(new Date(2015, 11, 27));
                expect(deckJSON.cards).to.deep.equal([
                    { name: 'Baleful Strix', main: 4, side: 0 },
                    { name: 'Phyrexian Revoker', main: 1, side: 0 },
                    { name: 'Trinket Mage', main: 1, side: 0 },
                    { name: 'Ashiok, Nightmare Weaver', main: 2, side: 0 },
                    { name: 'Jace, the Mind Sculptor', main: 2, side: 0 },
                    { name: 'Tezzeret, Agent of Bolas', main: 4, side: 0 },
                    { name: 'Seat of the Synod', main: 1, side: 0 },
                    { name: 'Island', main: 3, side: 0 },
                    { name: 'Swamp', main: 1, side: 0 },
                    { name: 'Ancient Tomb', main: 3, side: 0 },
                    { name: 'City of Traitors', main: 4, side: 0 },
                    { name: 'Darkslick Shores', main: 1, side: 0 },
                    { name: 'Darkwater Catacombs', main: 1, side: 0 },
                    { name: 'Polluted Delta', main: 4, side: 0 },
                    { name: 'Underground Sea', main: 2, side: 0 },
                    { name: 'Academy Ruins', main: 1, side: 0 },
                    { name: 'Urborg, Tomb of Yawgmoth', main: 1, side: 0 },
                    { name: 'Chalice of the Void', main: 4, side: 0 },
                    { name: 'Dimir Signet', main: 1, side: 0 },
                    { name: 'Engineered Explosives', main: 1, side: 2 },
                    { name: 'Ensnaring Bridge', main: 2, side: 0 },
                    { name: 'Mox Diamond', main: 2, side: 0 },
                    { name: 'Nihil Spellbomb', main: 1, side: 0 },
                    { name: 'Sword of the Meek', main: 1, side: 0 },
                    { name: 'Talisman of Dominance', main: 1, side: 0 },
                    { name: 'Thopter Foundry', main: 2, side: 0 },
                    { name: 'Force of Will', main: 3, side: 0 },
                    { name: 'Thirst For Knowledge', main: 1, side: 0 },
                    { name: 'Toxic Deluge', main: 2, side: 0 },
                    { name: 'Transmute Artifact', main: 3, side: 0 },
                    { name: 'Cursed Totem', main: 0, side: 1 },
                    { name: 'Grafdigger\'s Cage', main: 0, side: 1 },
                    { name: 'Pithing Needle', main: 0, side: 1 },
                    { name: 'Staff of Nin', main: 0, side: 1 },
                    { name: 'Trinisphere', main: 0, side: 1 },
                    { name: 'Tsabo\'s Web', main: 0, side: 1 },
                    { name: 'Guardian Beast', main: 0, side: 1 },
                    { name: 'Notion Thief', main: 0, side: 1 },
                    { name: 'Dread of Night', main: 0, side: 1 },
                    { name: 'Flusterstorm', main: 0, side: 2 },
                    { name: 'Surgical Extraction', main: 0, side: 1 },
                    { name: 'Massacre', main: 0, side: 1 }
                ]);
                done();
            });
        });

        it('throws error on invalid deck ID', function(done) {
            scraper.scrapeSCGDeckAsync(0)
            .catch(function(error) {
                expect(error.cause).to.deep.equal(new Error('Invalid DeckID'));
                done();
            });
        });
    });

    describe('Scrape SCG deck IDs', function() {
        it('scrapes deck IDs from a date range', function(done) {
            var startDate = new Date(2015, 11, 17);
            var endDate = new Date(2015, 11, 20);
            scraper.scrapeSCGDeckIDsAsync(startDate, endDate)
            .then(function(deckIDsJSON) {
                expect(deckIDsJSON.deckIDs).to.deep.equal([
                    '96440',
                    '96429',
                    '96406',
                    '96422',
                    '96434',
                    '96442',
                    '96409',
                    '96446'
                ]);
                done();
            });
        });
    });
});