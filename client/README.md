#InTime Wireless UI.

You can check daily updates on [http://10.65.2.117:6000](http://10.65.2.117:6000)

### User Types:
* View user - multiple per application
    + Can log in - Back-end provides a token which will be send with each request (ajax **Authorization** header)
    + Can log out - Will remove the token from the front-end and eventually send a request to the back-end
    + After login won't have expiring authentication. (until manually logs out)
    + Can change the password
    + Can create Travel Time reporting
        + Travel time will be shown in **SECONDS**
        + Filters:
            + Date Range picker
            + Time Range picker
            + Option for recurring date (example 2)
            + Eventually Realtime picker (last 1/8/24 hours)
            + Example: from 8:15 to 10:45 from 01.08.2018 to 05.08.2018
            + Example2: from 8:15 to 10:45 from Monday to Friday from 07.2018 to 08.2018
            + Example3: Last 2 hours
        + Can select multiple ITW devices
            * Selection is done in **OPEN STREET MAPS**. If there is no internet connection the markers will be shown above blank container
        + Will Create a matrix (table) for current ITW selections
            + We can reorder them by dragging the rows  
            + rows are **ORIGIN** and columns are **DESTINATION**
                + If we choose for example nodes **A, B, C, D** we will visualize direct data from **A to B** from **A to C** and so on. **A to C** will **NOT** be result from **A to B + B to C**
        + If we click the **SHOW ON MAP* button from a matrix the data will be visualized in predefined containers from the admin.
            + If you choose **A, B, C, D**, in this view you will be able to see only **A to B**, **B to C**, **C to D**
    + Can delete Travel Time reporting

* Admin - one per application. Superset of the view user
    + Can create and remove viewer users (Username and Password fields)
    + Can create, remove and update ITW devices. (Name, Location, Configurator Link)
    + Able to add travel time data container between two devices (container shows TT in seconds and direction) **Version 2**
    + Able to add polygons between two ITW devices **Version2**
