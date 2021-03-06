## Dental Cost Comparison between San Diego, California and Tijuana, Mexico

San Diego and Tijuana are on either side of the USA/Mexico international border. Due to this proximity, I know of many people, especially 
those without insurance, who go to Tijuana for their dental work. (Years ago, I was one of those people.) I thought it would be 
interesting to compare the costs of basic services.

After researching on the Internet, I decided to start with Yelp's Top Ten Most Affordable Dentists in San Diego and in Tijuana.

I am using real data whenever possible, however, many dentists, especially those on the US affordable list, are reticent 
to share any figures on the phone. Due to this, I have had to insert fake data but I will mark it as such.

Since this is a school project, and the main purpose is to show that I can create engaging interactive websites, and after 
checking with my mentor, I am proceeding as described above.

### UX
User Stories:
* User wants to find less expensive dentists
* User wants to compare pricing between San Diego and Tijuana
* User wants to see where the various dentists are located
* User wants driving directions to a dentist
* User want information on logistics of crossing the international border (future)
* User wants to read of others experiences (future)

I created some mock-ups in Balsamiq Mockup 3 and these can be downloaded from my GitHub site at 
https://github.com/swendt57/dental_costs_project/tree/master/support/mockups

### Features

**The site includes the following:**

* An **Introduction** page that explains the purpose and thinking behind the website
* A **Top 10 Affordable Dentists** page that shows Yelp's Top 10 Affordable Dentists for both San Diego and Tijuana
  * Each dental office is hyperlinked to Google Maps and can provide driving directions 
* A **Cost Comparisons** page that has three chart sections
  * A bar chart that shows the average cost of five common procedures and overlays Tijuana data over San Diego
  * A distribution chart that shows the cost-per-procedure for each office and each procedure
  * Two pie charts that displays the amount of real data vs fake data for each city which I think is illuminating
* A **Location Maps** page that has a Google map each for San Diego and Tijuana; each showing the dental offices in relation to each other.

**Possible future work:**

* Add a Tips and Tricks section for crossing back and forth across the international border 
* A user experience section where users can provide concerns and/or helpful information
* Improve the middle chart on the Cost Comparisons page. I would like to add 
  * The dentist name to the tooltip
  * Have a different dot color for each city
  * Add a zoom function
  * Allow the user to filter the data on the dentist
  * Explore the possibility of using the dentists on the x axis with the procedure in the tool tip. Might be a better look.

### Technologies Used

* JavaScript
  * https://www.javascript.com/
  * The main scripting language that I used for navigation, charting, accessing Google API, etc
* jQuery
  * https://jquery.com/
  * JavaScript library that simplifies DOM manipulation
* Jasmine
  * https://jasmine.github.io/
  * JavaScript testing framework used for unit tests on data parsing methods
* D3, DC, Cross Filter 
  * https://d3js.org/
  * https://dc-js.github.io/dc.js/
  * https://square.github.io/crossfilter/
  * D3 is a charting framework, DC and Crossfilter used for mutli-dimensional data views
  * I mostly used D3 but one chart was built with DC and Crossfilter
* Bootstrap 4
  * https://getbootstrap.com/docs/4.0/getting-started/introduction/
  * Responsive, mobile-first, framework````
* Google Fonts
  * https://fonts.google.com/
  * Free, open-source, on-demand, fonts
* Google Maps API
  * https://cloud.google.com/maps-platform/maps/
  * Mapping API that I used for driving directions and showing office locations
* Font Awesome
  * https://fontawesome.com
  * Icons and such
* IntelliJ IDEA
  * https://www.jetbrains.com/idea/
  * Java integrated development environment
  * My preferred IDE
* GitHub
  * https://github.com/swendt57
  * Code repository
* CVS to JSON Converter
  * https://www.convertcsv.com/csv-to-json.htm
  * Used for converting Excel based data to JSON
* Stack Overflow
  * https://stackoverflow.com/
  * Community of developers that has potential solutions to almost any problem
* Microsoft Excel
  * https://products.office.com/en-us/excel-c
  * I used this for initial collecting and manipulating of the data and then converting it to CSV

### Testing

**Automated testing**
I used Jasmine to test all functions that manipulated data including:
* maps.js -- assembleCoordinates
* cost-comparison.js -- assembleOverlayDataSet, sortDataByCity, and determineMockDataTotals

Automated tests can be run by clicking this link: https://swendt57.github.io/dental_costs_project/tests/

**Manual Testing**

Top 10
1. Go to Top 10 Affordable page.
2. Verify both boxes show and have 10 dentists each.
3. Verify that the addresses appear for larger screens and only the name appears for smaller screens. 
The page must be reloaded for the addresses to appear and disappear for different screen sizes.
4. Verify each link takes the user to a Google Maps directions page with that office selected.
5. Verify that the boxes are side by side on larger screens.

Cost Comparisons
1. Go to Cost Comparisons page.
2. Verify that three chart sections display (four charts in total).
3. Verify that the charts shrink somewhat for smaller screens. The page must be reloaded for the charts to change size.
4. Verify that on small screens in portrait mode a message recommending landscape mode appears. The page must be reloaded 
for this message to appear and disappear.
5. On the top chart:
  * verify that all five procedures are displayed.
  * verify that rolling over the legend highlight the bars for that city.
  * verify that rolling over either the bar or the overlay bar highlight the other bars for that city.
  * verify that the chart 
6. On the center chart:
  * verify that all five procedures are displayed.
  * verify that all five procedures are displayed.
  * verify that the tooltips show the procedure and cost.
7. On the pie charts:
  * verify that there is one chart for each city.
  * verify that the labels are not cut off.
  * verify that when you roll over a wedge that it increases in size.

Location Maps
1. Go to Location Maps page.
2. Verify that there are two maps, one each for San Diego and Tiuana.
3. Verify that each map shows 10 locations with a legend below.
4. Verify that the maps are side by side on larger screens.

**Manual testing** was performed on: 
* Chrome version 76.0.3809.132 browser including:
  * Galaxy S5 simulator
  * iPhone 6/7/8 simulator
  * iPad simulator
  * iPad Pro simulator
* Firefox 68.0.1 browser including:
  * Galaxy S9/S9+ simulator
  * iPhone X/XS simulator
  * Kindle Fire HDX simulator
* Galaxy S7 phone with:
  * Chrome mobile version 77.0.3865.92
  * Firefox for Android version 68.1.1
  
**Display issues**
The charts turned out to be a challenge with different screen sizes, and especially the pie charts which did not want to 
stay in the DIVs to which they were assigned. I had to undertake a crash course on ViewBox and ViewPort in order to solve
the problem.

### Deployment

The website is currently deployed on GitHub Pages. 
1. If not already present, add the key file, ak.js, to assets/js. 
2. If not already done, the website base URL must be added to the Website Restrictions section of the Google Cloud Platform 
APIs and Services area. This helps to reduce non-authorized use of the API key.
3. Go to https://github.com/swendt57/dental_costs_project and click the Settings link.
4. In the GitHub pages section, verify that the code is being built from the Master Branch.
5. In the GitHub pages section, wait for the message to read: " Your site is published at https://swendt57.github.io/dental_costs_project/"
6. The site is now deployed.

### Credits

#### Content

* The top ten lists were generated on, and copied from, www.yelp.com on or about 9/9/2019

#### Media

* USA and Mexican flags courtesy of www.pixabay.com

#### Acknowledgements

* This project was inspired by my friend, Gail Dana, of San Diego, California
* Opaque div background concept from www.scotch.io
* Used the CSV to JSON converter from www.convertcsv.com/csv-to-json.htm
* Thanks to www.stackoverflow.com for keeping me sane. In particular:
  * Johannes - https://stackoverflow.com/users/5641669/johannes
  * Mark - https://stackoverflow.com/users/16363/mark - who's examples I leveraged to create the overlay bar chart
* Hannah Recht from https://bl.ocks.org/hrecht for chart legend examples
* Kiran from https://bl.ocks.org/kiranml1 for a sample D3 pie chart
* https://webdesign.tutsplus.com/tutorials/svg-viewport-and-viewbox-for-beginners--cms-30844 for ViewPort and ViewBox explanations
* Used https://www.latlong.net to look up latitude and longitudes for mapping functions
