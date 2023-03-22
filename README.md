ChaiTrade
    Easy as a cup of tea.

Project Description:
    ChaiTrade is a Website which helps user learn Stock Market and the Trading world.
    It consists of different types of users and various features, all explained in detail later.
    The main idea of the project is to build a virtual trading simulator which helps people invest virtual money in the real market,
    so as to reducing risking money with little knowledge.


    Different Types of Users:
        1. Admin: the one who manages the project. The admin:
            i. looks after all the functionalities.
            ii. corrects all the errors
            iii. takes care of malpracticies 
            iv. looks after authentication and verification

        2. User: the user is the main client. The user:
            i. can read the latest news
            ii. can interact with the mentor
            iii. can read analyst reports
            iv. can ask questions
            v. can provide feedback
            vi. can get virtual money and trade it
            -> To be a user one needs to sign up

        3. Mentor: the mentor has it's own panel. The mentor:
            i. can interact with the user
            ii. can reply to user queries
            iii. can read updated charts and news
            iv. can write blogs based upon the latest trends
            v. can also participate in user activities, i.e. can virtually trade as well
            vi. can not influence the users in any way (restricted activity, can be removed from the platform)
            -> One can only become a mentor once verified by the certification they provide.
            -> Also before posting anything the mentor has to enter their password.

        4. Analyst: the analyst has it's own panel. The analyst:
            i. can read the latest charts and news
            ii. can study the stock market and write reports on the statistics
            iii. can upload their reports in the site, accessible by the users
            iv. can perform the tasks of a user as well, i.e. can trade through the virtual simulator
            -> To be an analyst one needs to be verified.


        Various Featues the site offers:
        1. News Section: 
            provides with the latest updates present in the media.
            updated by apis. Available to all types of users as well as all people visiting the site.
            The news section can be accessed from the navigation bar present as a permanent feature on each web page.
            Can only be altered by the admin, just a read me page for user, metor and analysts.

        2. Charts Section: 
            has the updated values of different stocks and their types, such as companies, commodities, forex and crpto.
            Is regularly updated with the help of api as well as the admin.
            Major contributors also include the analyst, who can make charts based on the statistical data provided to them.
            The data representation can be in the form of line charts, pie graphs, histograms or tables.

        3. Featured Section: 
            This section is under the total control of analysts. The analyst can publish/ post their reports here.
            They can write full reports or some smaller briefs to post in this section.
            It helps user to better understand the stock market in terms of actual data and it's analysis.
        
        4. Blog Section:
            This section belongs to the mentor. The mentor can post blogs here giving information about how trends work,
            and how one can begin with investments. It gives an overview of how the market works and deals with general as well as specific queries. Can be accessed by all but can only be altered by mentor or the admin.

        5. Trading Simulator:
            This is the main part of the project. When a user logs-in they can access the simulator.

            Steps:
            i. request money from the simulator.
            ii. you will be provided with some amount of virtual money for free.
            iii. look at the charts and trends.
            iv. ask doubts if any.
            v. choose the stocks you want to invest in.
            vi. once you select the stocks, enter the amount of money you would like to invest.
            vii. your virtual money will gain profit or face loss based on the real market trends, but the market will not be affected by   your virtual money in anyway.
            viii. study the patterns, you can re-invest the money, invest more money or even withdraw money based on the plan you chose.
            ix. you can request for more money if you has like.


Working with the project (get started): 
    To run the project first install the node modules by typing the command "npm i" in the terminal.
    This will set you up. Now, all you got to do is give the command "npm start" in the terminal.
    The project will now be set and running. Go to the browser enter the local host number mentioned and start surfing through the site.

    You will start from the home page, from here you can access other pages from the nav bar about or even the additional features present on the footer of the page, such as:
    -> about us page: contains the information about the website and it's authors, and developers
    -> faq section: contains the frequently asked questions from the users
    -> contact us: contains all contact information via which the user can contact the site owners
    -> pricing: contains the information regarding the pricing of the webite, how the money will be charged for different users opting various plans on the webpage

    also mentioning the featues present on the navigation bar:
    -> Authentication page: logs user in and out of the webpage, also lets people signUp
    -> Profile: takes the user to visit their profile, update their information
    -> News Section: one of the feature pages
    -> Charts Section: one of the feautre pages
    -> Simulator: one of the featured pages
    -> Featured Section: one of the featured pages
    -> Blog Posts: one of the featured pages

    Additionals which can be accessed by different users are:
    -> Mentor Panel: for verified mentors only, their own side of the website where they can work, write blogs 
    -> Analyst Panel: for verified analysts only, their side of the website where they can work, upload reports

    NOTE: to access the mentor and analyst panel you have to verify as a mentor or an analyst, then only you will be provided with th functionalities mentioned under them.

    The Admin Panel is being Developed currently so a basic layout of the Admin Panel has been fixed on the route "/admin"

    Top right corner of the nav bar contains the login/ signup link, where you can signup or login to your account. 
    After, which you can eaither explore the site further, ask questions or experience the virtual trading simulator.

Credits:
    The project was made by a team of 5 members, who out their efforts on various aspects to make the site function.

    Our project members are:
    1. Darshan Bennur: 
        Profile Page: frontend and backend
            designed the user profile page as well as built the backend for the same
        Authentication: frontend and backend
            designed the UI for signIn / signUp page as well as dealt with the backend, keepin the records of the users and JS validation of forms
        NavBar: frontend
            designed the NavBar (header) present on everypage of the website
        github: Darshanbennur

    2. Subhangi: 
        Home Page: frontend
            designed the UI of the homepage, also the landing page (the first page of the site) 
        Charts Section: frontend 
            designed the UI of the charts section, visitable by an option on the navbar
        FAQ: frontend and backend
            designed the UI of the FAQ section as well as the backend, which deals with updating the FAQ's (frequently asked questions) by adding them to the database.

    3. Abraham V Jose:
        Pricing: frontend
            designed the UI of the pricing page, link available on the fotter of the site
        Blog Section: frontend and backend
            designed the UI of the blogs section along with the backend, keeping the record of all the new blogs written in the databse with the profiles
        Mentor Section: frontend and backend
            designed the UI of the mentor section as well as the backend of the section, it consists of a completely different panel only available to verified mentors

    4. Hridayesh Nadella:
        Contact Page: frontend and backend
            designed the UI of the contact us page as well as did the  backend, which includes updating of all the contact information from the database
        News Section: frontend and backend
            designed the UI of the news section as well as the backend, uploading the latest news by the backend database,
            it will further be connected to api

    5. Vamsidhar: 
        About Us: frontend
            designed the UI of the about us page, displaying information about the website, it's authors and developers
        Featured Section: frontend and backend
            designed the UI of the featured section as well as developed the backend, which will jelp in uploading reports by the analysts to the page
        Fotter: frontend
            designed the UI of the fotter present at the end of every page of the website, guiding the user to different sections of the site


Languages we learned and used:
    1. HTML: the basic format of the pages was initially written in HTML which we learned in classromm as well as from w3schools (recommended by our teachers).

    2. CSS: css is a styling language which helps us in styling the html page and makes it appear readable, more used friendly, clear and attractive.

    3. JS: JavaScript was used for validation and making the web-pages interacive, where html&css gave structure and style JS helped the site to interact with the users.

    4. Node JS: allowed us to create all kinds of server-side tools and applications in JavaScript. Maintaing the backend of the project.

    5. EJS: Embeded JavaScript lets us embed JavaScript code in a template language that is then used to generate HTML. All the pages are of the extension '.ejs'.
    

