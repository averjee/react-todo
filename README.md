## How long did you spend on your solution?
3 hours
<br />
<br />

## How do you build and run your solution?
Note: Please ensure you have a node version that is `16.0.0 or lower`.

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
<br />
<br />

## What technical and functional assumptions did you make when implementing your solution?
As this is a front-end task I persisted the data into the browser cache upon refresh and re-render using useMemo.
<br />
<br />

## Briefly explain your technical design and why do you think is the best approach to this problem.
I created a components folder which contains components that can be re-usable for code efficiency i.e. `TodoFooter` and `TodoItem`.<br/>
I wanted to keep the interface clean and easy to use for a better user experience by doing the following below.<br/>
I added extra functionality to increase the user experience by adding a "Clear completed" button, an edit feature where if you double-click on any list item you are able to edit. <br/> Also on the top left if you click the down button you can select all items and mark them as completed.<br/>  You can delete each item too (by hovering on the item and clicking on the "X" button) as well as filter on All, Pending and Completed tasks as per all the user stories.<br/>
The Pending and Completed filters has it's own routing page i.e. `/pending` and `/completed`.<br/>
Finally I added unit tests for each of the above scenarios - to see run `npm test`
<br />
<br />

## If you were unable to complete any user stories, outline why and how would you have liked to implement them.
All user stories were completed plus I've added several more features as explained above.