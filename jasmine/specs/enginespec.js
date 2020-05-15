/* 
We want to make sure that when the game starts - The values are as expected 

We want to make sure that when Game Over is called - The user has no lifes left 

We want to make sure that when each round starts, we are on question one 

Because we can't predict the output of the API, we can't use Jasmine to test the compare function

*/



// Test the initial variable values 
 describe('Intial Variable Values when game is started', function() {
        it('should return lives = 3', function() {
            setVars();
            expect(numberOfLives).toBe(3);
            expect(questionNumber).toBe(1);
            expect(questionNumber).toBe(1);
            expect(roundPosition).toBe(1);
            expect(timerVal).toBe(60);
            expect(arrayPositionSelect).toBe(1);

        });

    });

// Test that when Game Over is called - The user doesn't have any lifes     


