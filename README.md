app folder contains the front end code, features are:\
	1. Two sections on the UI, one is the inventories list and search, another one is aggregation tree view aggregated by term\
     2. can use vin or empty string to search in inventories section, the according result will be shown in search result area\
     3. click hide or show button to toggle search result area\
     4. in the seearch result list, click the details button on the right, a details view of the item will be shown, and it is available to click hide detials button to switch back to the summary mode.\
	5. if input a wrong vin number in the search, it will show error message in the search result area.\
	6. can aggreagte different results by selecting terms such as year, model or make.\
	7. the aggregation tree view show purchase price and count in right side

	
	tech stack: react 16, redux, react-redux, react-thunk, bootstrap, jest, enzyme



```

Thinkings and things needs improvement: 
  1. the treebeard component is very difficult to customize, tried couple of hours to adjust css, but it loooks like an heavy css overwriting is needed. probably an alternative should be introduced
  2. It is incentive to treat 'lookup by' vin as keyword searching and treat loading inventory list as seraching without keyword, so these two are combined into the same inventories section.
  3. It is possible to make aggregation results in the left nav of the search section, it will be very useful for user to categorize and navigate the search result
  4. can use redux-saga to replace redux-thunk to make code more readable
  5. need more unit tests of the components
```


api folder contains the backend code, the implementation details are:
   1. api.js is route controller to handle http request
   2. use array to implement the underlying database, inspired by elastic search
   3. inventory records are auto generated 
   
   ```
   tech stack: node.js, express.js, jest
   ```
	
	
