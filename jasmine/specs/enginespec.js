// Test the initial variable values
describe("Intial variable values when game is started", function () {
  it("should return lives = 3, question number = 1, Round Position = 1, timer value - 60, array position select = 1", function () {
    setVars();
    expect(numberOfLives).toBe(3);
    expect(questionNumber).toBe(1);
    expect(roundPosition).toBe(1);
    expect(timerVal).toBe(60);
    expect(arrayPositionSelect).toBe(1);
  });
});

