/* 
What kind of tests do we need to run? 

Make sure that start game is called 

We want to make sure that when the game starts - The values are as expected 

We want to make sure that when Game Over is called - The user has no lifes left 

We want to make sure that when each round starts, we are on question one 

Because we can't predict the output of the API, we can't use Jasmine to test the compare function

*/

 describe('Intial Variable Values when game is started', function() {

        it('should return lives = 3', function() {
            setVars();
            expect(numberOfLives).toBe(3);
        });


    });