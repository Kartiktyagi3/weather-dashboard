# Weather Dashboard

## Simple Weather Dashboard: [https://idyllic-alpaca-799081.netlify.app/](https://idyllic-alpaca-799081.netlify.app/)

## Steps to Use Locally
- Clone the repository.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the application.

## Major Time-Taking Points
- Deciding the UI: Search on Dribbble and Behance for UI designs that look cool but may be impractical. I had to redesign it after exporing the API.
- Exploring the API: It took some time to explore and find a useful API. I was trying to fit the planned UI and stumbled across the geolocation API. The 5-day forecast provides information for specific points in time, not the aggregate of the day (min, max). The calculations are being done on the frontend.
- Using Tailwind for the first time, so I learned as I built the project. Initially, I was just searching the documentation. I soon became comfortable with the basic and commonly used classes. I also discovered a side library called classNames ([https://www.npmjs.com/package/classnames](https://www.npmjs.com/package/classnames)) which works well with Tailwind.
- Still learning how to effectively use Jotai. I went back and forth between Redux and Jotai initially. It took a while to figure out the best way to utilize Jotai. I explored a couple of different ways to use Atoms and now I'm more proficient with it and have a bigger toolbox.

