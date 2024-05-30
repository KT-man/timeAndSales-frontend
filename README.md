# Time and Sales data on Frontend

![image](https://github.com/KT-man/timeAndSales-frontend/assets/89538905/99bb0b83-e99e-4cb4-904d-652be4045051)

- Hosted on AWS amplify at: https://staging.d25dhwi4hyt16u.amplifyapp.com/
- Built on React + Vite
  - Recoil for internal state management
  - TanStack Table for displaying of data table 
- Kinda only built for desktop...
- POC project to replay level 2(?) sales data for users to test out their strategies
- Project is frontend only; no backend capabilities
- 'Upload' your csv file and hit submit to begin

  - Upload will only load the csv file into your browser, it does not make any network calls

- Sample data and csv found in public/timeAndSales.csv
- This will work for csv files in the same format

## TODOs:

- Add filter and sorting capabilities to React Table
- Visualize data in a graph as well
- Additional styles to show increase/ decrease, new entries
